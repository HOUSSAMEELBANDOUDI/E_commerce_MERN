import CartModel, { CartStatus } from "../models/cartModel";

interface CreateCartForUserParams {
  user: string;
}

interface GetActiveCartForUserParams {
  user: string;
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

