import mongoose from "mongoose";
import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";
import { HttpError } from "../../utils/httpError.js";
const validId = (id, entity) => {
  if (!mongoose.isValidObjectId(id)) throw new HttpError(400, `ID de ${entity} inválido`);
};
export class MongoCartDAO {
  async create() { return (await Cart.create({ products: [] })).toObject(); }
  async getById(id) {
    validId(id, "carrito");
    const cart = await Cart.findById(id).populate("products.product").lean();
    if (!cart) throw new HttpError(404, "Carrito no encontrado");
    return cart;
  }
  async addProduct(cid, pid) {
    validId(cid, "carrito"); validId(pid, "producto");
    if (!(await Product.exists({ _id: pid }))) throw new HttpError(404, "Producto no encontrado");
    const cart = await Cart.findById(cid);
    if (!cart) throw new HttpError(404, "Carrito no encontrado");
    const item = cart.products.find(({ product }) => product.toString() === pid);
    if (item) item.quantity += 1; else cart.products.push({ product: pid, quantity: 1 });
    await cart.save(); return this.getById(cid);
  }
  async replaceProducts(cid, products) {
    validId(cid, "carrito");
    if (!Array.isArray(products)) throw new HttpError(400, "products debe ser un arreglo");
    const normalized = products.map((item) => ({ product: item.product?._id || item.product, quantity: Number(item.quantity) }));
    if (normalized.some((item) => !mongoose.isValidObjectId(item.product) || !Number.isInteger(item.quantity) || item.quantity < 1))
      throw new HttpError(400, "Productos o cantidades inválidos");
    const ids = [...new Set(normalized.map((item) => String(item.product)))];
    if (await Product.countDocuments({ _id: { $in: ids } }) !== ids.length) throw new HttpError(404, "Uno o más productos no existen");
    const cart = await Cart.findByIdAndUpdate(cid, { products: normalized }, { new: true, runValidators: true });
    if (!cart) throw new HttpError(404, "Carrito no encontrado");
    return this.getById(cid);
  }
  async updateQuantity(cid, pid, quantity) {
    validId(cid, "carrito"); validId(pid, "producto");
    if (!Number.isInteger(quantity) || quantity < 1) throw new HttpError(400, "quantity debe ser un entero mayor a 0");
    const cart = await Cart.findOneAndUpdate({ _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": quantity } }, { new: true, runValidators: true });
    if (!cart) throw new HttpError(404, "Carrito o producto en carrito no encontrado");
    return this.getById(cid);
  }
  async removeProduct(cid, pid) {
    validId(cid, "carrito"); validId(pid, "producto");
    const cart = await Cart.findByIdAndUpdate(cid, { $pull: { products: { product: pid } } }, { new: true });
    if (!cart) throw new HttpError(404, "Carrito no encontrado");
    return this.getById(cid);
  }
  async clear(cid) {
    validId(cid, "carrito");
    const cart = await Cart.findByIdAndUpdate(cid, { products: [] }, { new: true });
    if (!cart) throw new HttpError(404, "Carrito no encontrado");
    return this.getById(cid);
  }
}
