import CartModel, { CartStatus } from "../models/cartModel";
import { AuthRequest } from "../middlewares/validateJWT";
import ProductModel from "../models/productModel";

interface CreateCartForUserParams {
  user: string;
}

interface GetActiveCartForUserParams {
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

const createCartForUser = async ({ user,}: CreateCartForUserParams) => {
  const cart = await CartModel.create({ user});

  await cart.save();
  return cart;
};

export const getActiveCartForUser = async ({ user,}: GetActiveCartForUserParams) => {
  // دور على active cart
  let cart = await CartModel.findOne({user, status: CartStatus.ACTIVE, });

  // لو مش موجودة → اعمل واحدة جديدة
  if (!cart) {
    cart = await createCartForUser({ user, });
  }
  return cart;
};

export const addItemToCart = async ({
  user,
  product,
  quantity,
}: AddItemToCartParams) => {
  const cart = await getActiveCartForUser({ user });

  const itemExists = cart.items.find(
    (item: any) => item.product.toString() === product
  );

  if (itemExists) {
    return {
      statusCode: 400,
      data: "Item already exists in cart",
    };
  }

  const productData = await ProductModel.findById(product);

  if (!productData) {
    return {
      statusCode: 400,
      data: "Product not found",
    };
  }

  if (productData.stock < quantity) {
    return {
      statusCode: 400,
      data: "Not enough stock",
    };
  }

  cart.items.push({
    product: productData._id,
    unitPrice: productData.price,
    quantity,
  });

  cart.total += productData.price * quantity;

  await cart.save();

  return {
    statusCode: 200,
    data: cart,
  };
};

export const updateItemInCart = async ({
  user,
  product,
  quantity,
}: IUpdateItemInCart) => {
  const cart = await getActiveCartForUser({ user });


  if (!cart) {
    return {
      statusCode: 404,
      data: { message: "Cart not found" },
    };
  }

  const item = cart.items.find(
    (item : any) => item.product._id.toString() === product
  );

  if (!item) {
    return {
      statusCode: 400,
      data: { message: "Item not found in cart" },
    };
  }

  const foundProduct = await ProductModel.findById(product);

  if (!foundProduct) {
    return {
      statusCode: 404,
      data: { message: "Product not found" },
    };
  }

  if (quantity > foundProduct.stock) {
    return {
      statusCode: 400,
      data: { message: "Not enough stock" },
    };
  }

  // update quantity
  item.quantity = quantity;

  // get other cart items (exclude current product)
  const cartItems = cart.items.filter(
    (item) => item.product._id.toString() !== product
  );

  // calculate total for other items
  let total = cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);

  // add updated item total
  total += quantity * foundProduct.price;

  // ❗️الغلطة اللي كانت ناقصة
  cart.total = total;

  const updatedCart = await cart.save();

  return {
    statusCode: 200,
    data: updatedCart,
  };
};



