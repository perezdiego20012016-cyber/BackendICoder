import { randomUUID } from "node:crypto";
import { FileDAO } from "./base.dao.js";
import { HttpError } from "../../utils/httpError.js";
export class FileProductDAO extends FileDAO {
  constructor() { super("products.json"); }
  async paginate({ limit = 10, page = 1, query, sort }) {
    let docs = await this.read();
    if (query) {
      const q = query.toLowerCase();
      if (["available", "disponible", "true"].includes(q)) docs = docs.filter((p) => p.status && p.stock > 0);
      else if (["unavailable", "nodisponible", "false"].includes(q)) docs = docs.filter((p) => !p.status || p.stock === 0);
      else docs = docs.filter((p) => p.category.toLowerCase() === q);
    }
    if (sort) docs.sort((a, b) => sort === "desc" ? b.price - a.price : a.price - b.price);
    const totalPages = Math.ceil(docs.length / limit);
    const payload = docs.slice((page - 1) * limit, page * limit);
    return { docs: payload, totalPages, page, prevPage: page > 1 && page <= totalPages ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null, hasPrevPage: page > 1 && page <= totalPages,
      hasNextPage: page < totalPages };
  }
  async getById(id) {
    const product = (await this.read()).find((item) => item._id === id);
    if (!product) throw new HttpError(404, "Producto no encontrado");
    return product;
  }
  async create(data) {
    const products = await this.read();
    if (products.some((item) => item.code === data.code)) throw new HttpError(409, "El código ya existe");
    const product = { _id: randomUUID(), ...data };
    products.push(product); await this.write(products); return product;
  }
  async update(id, data) {
    const products = await this.read(); const index = products.findIndex((item) => item._id === id);
    if (index < 0) throw new HttpError(404, "Producto no encontrado");
    delete data._id; delete data.id;
    products[index] = { ...products[index], ...data }; await this.write(products); return products[index];
  }
  async delete(id) {
    const products = await this.read(); const index = products.findIndex((item) => item._id === id);
    if (index < 0) throw new HttpError(404, "Producto no encontrado");
    const [deleted] = products.splice(index, 1); await this.write(products); return deleted;
  }
}
