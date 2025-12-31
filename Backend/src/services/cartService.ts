import CartModel, { CartStatus } from "../models/cartModel";
import ProductModel from "../models/productModel";
import { OrderModel, IOrderItem } from "../models/orderModel";

/* =======================
   Interfaces
======================= */

interface CreateCartForUserParams {
  user: string;
}

interface GetActiveCartForUserParams {
  user: string;
  populateProduct?: boolean;
}

interface ClearCartItem {
  user: string;
}

interface AddItemToCartParams {
  user: string;
  product: string;
  quantity: number;
}

interface IUpdateItemInCart {
  user: string;
  product: string;
  quantity: number;
}

interface IDeleteItemFromCart {
  user: string;
  product: string;
}

interface CheckoutParams {
  user: string;
  address: string;
}

/* =======================
   Helpers
======================= */

const createCartForUser = async ({ user }: CreateCartForUserParams) => {
  const cart = await CartModel.create({ user });
  await cart.save();
  return cart;
};

export const getActiveCartForUser = async ({
  user,
  populateProduct = false,
}: GetActiveCartForUserParams) => {

  let query = CartModel.findOne({
    user,
    status: CartStatus.ACTIVE,
  });

  if (populateProduct) {
    query = query.populate("items.product");
  }

  let cart = await query;

  if (!cart) {
    cart = await createCartForUser({ user });
  }

  return cart;
};

/* =======================
   Cart Actions
======================= */

export const addItemToCart = async ({
  user,
  product,
  quantity,
}: AddItemToCartParams) => {

  const cart = await getActiveCartForUser({ user });

  const exists = cart.items.find(
    (item: any) => item.product.toString() === product
  );

  if (exists) {
    return { statusCode: 400, data: "Item already exists in cart" };
  }

  const productData = await ProductModel.findById(product);
  if (!productData) {
    return { statusCode: 404, data: "Product not found" };
  }

  if (productData.stock < quantity) {
    return { statusCode: 400, data: "Not enough stock" };
  }

  cart.items.push({
    product: productData._id,
    unitPrice: productData.price,
    quantity,
  });

  cart.total += productData.price * quantity;
  await cart.save();

  const updatedCart = await getActiveCartForUser({
    user,
    populateProduct: true,
  });

  return { statusCode: 200, data: updatedCart };
};

export const updateItemInCart = async ({
  user,
  product,
  quantity,
}: IUpdateItemInCart) => {

  const cart = await getActiveCartForUser({ user });

  const item = cart.items.find(
    (i: any) => i.product.toString() === product
  );

  if (!item) {
    return { statusCode: 400, data: "Item not found in cart" };
  }

  const foundProduct = await ProductModel.findById(product);
  if (!foundProduct) {
    return { statusCode: 404, data: "Product not found" };
  }

  if (quantity > foundProduct.stock) {
    return { statusCode: 400, data: "Not enough stock" };
  }

  item.quantity = quantity;

  cart.total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.unitPrice,
    0
  );

  await cart.save();

  const updatedCart = await getActiveCartForUser({
    user,
    populateProduct: true,
  });

  return { statusCode: 200, data: updatedCart };
};

export const deleteItemFromCart = async ({
  user,
  product,
}: IDeleteItemFromCart) => {

  const cart = await getActiveCartForUser({ user });

  cart.items = cart.items.filter(
    (i: any) => i.product.toString() !== product
  );

  cart.total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.unitPrice,
    0
  );

  await cart.save();

  const updatedCart = await getActiveCartForUser({
    user,
    populateProduct: true,
  });

  return { statusCode: 200, data: updatedCart };
};

export const ClearCart = async ({ user }: ClearCartItem) => {

  const cart = await getActiveCartForUser({ user });

  cart.items = [];
  cart.total = 0;

  await cart.save();

  const updatedCart = await getActiveCartForUser({
    user,
    populateProduct: true,
  });

  return { statusCode: 200, data: updatedCart };
};

/* =======================
   Checkout
======================= */

export const checkout = async ({ user, address }: CheckoutParams) => {

  if (!address) {
    return { statusCode: 400, data: "Please provide address" };
  }

  const cart = await getActiveCartForUser({ user });

  if (!cart || cart.items.length === 0) {
    return { statusCode: 400, data: "Cart is empty" };
  }

  const orderItems: IOrderItem[] = [];

  for (const item of cart.items) {
    const product = await ProductModel.findById(item.product);

    if (!product) {
      return { statusCode: 400, data: "Product not found" };
    }

    orderItems.push({
      productTitle: product.title,
      productImage: product.image,
      unitPrice: product.price,
      quantity: item.quantity,
    });
  }

  const order = await OrderModel.create({
    orderItems,
    total: cart.total,
    address,
    user,
  });

  await order.save();

  cart.status = CartStatus.COMPLETED;
  await cart.save();

  return { statusCode: 201, data: order };
};

