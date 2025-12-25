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



