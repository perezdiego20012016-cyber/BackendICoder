import { randomUUID } from "node:crypto";
import { FileDAO } from "./base.dao.js";
import { FileProductDAO } from "./product.dao.js";
import { HttpError } from "../../utils/httpError.js";
export class FileCartDAO extends FileDAO {
  constructor() { super("carts.json"); this.productDAO = new FileProductDAO(); }
  async create() {
    const carts = await this.read(); const cart = { _id: randomUUID(), products: [] };
    carts.push(cart); await this.write(carts); return cart;
  }
  async getById(id) {
    const cart = (await this.read()).find((item) => item._id === id);
    if (!cart) throw new HttpError(404, "Carrito no encontrado");
    const catalog = await this.productDAO.read();
    return { ...cart, products: cart.products.map((item) => ({ ...item, product: catalog.find((p) => p._id === item.product) || null })) };
  }
  async mutate(id, action) {
    const carts = await this.read(); const index = carts.findIndex((item) => item._id === id);
    if (index < 0) throw new HttpError(404, "Carrito no encontrado");
    await action(carts[index]); await this.write(carts); return this.getById(id);
  }
  async addProduct(cid, pid) {
    await this.productDAO.getById(pid);
    return this.mutate(cid, (cart) => {
      const item = cart.products.find((p) => p.product === pid);
      if (item) item.quantity++; else cart.products.push({ product: pid, quantity: 1 });
    });
  }
  async replaceProducts(cid, products) {
    if (!Array.isArray(products)) throw new HttpError(400, "products debe ser un arreglo");
    const normalized = products.map((p) => ({ product: p.product?._id || p.product, quantity: Number(p.quantity) }));
    if (normalized.some((p) => !p.product || !Number.isInteger(p.quantity) || p.quantity < 1))
      throw new HttpError(400, "Productos o cantidades inválidos");
    await Promise.all(normalized.map((p) => this.productDAO.getById(p.product)));
    return this.mutate(cid, (cart) => { cart.products = normalized; });
  }
  async updateQuantity(cid, pid, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1) throw new HttpError(400, "quantity debe ser un entero mayor a 0");
    return this.mutate(cid, (cart) => {
      const item = cart.products.find((p) => p.product === pid);
      if (!item) throw new HttpError(404, "Producto no encontrado en carrito");
      item.quantity = quantity;
    });
  }
  async removeProduct(cid, pid) { return this.mutate(cid, (cart) => { cart.products = cart.products.filter((p) => p.product !== pid); }); }
  async clear(cid) { return this.mutate(cid, (cart) => { cart.products = []; }); }
}
