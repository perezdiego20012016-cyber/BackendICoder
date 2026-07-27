import mongoose from "mongoose";
import { Product } from "../../models/product.model.js";
import { HttpError } from "../../utils/httpError.js";
import { escapeRegex } from "../../utils/query.js";

export class MongoProductDAO {
  async paginate({ limit = 10, page = 1, query, sort }) {
    const filter = {};
    if (query) {
      const normalized = query.toLowerCase();
      if (["available", "disponible", "true"].includes(normalized)) {
        filter.status = true; filter.stock = { $gt: 0 };
      } else if (["unavailable", "nodisponible", "false"].includes(normalized)) {
        filter.$or = [{ status: false }, { stock: 0 }];
      } else filter.category = { $regex: `^${escapeRegex(query)}$`, $options: "i" };
    }
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const docs = await Product.find(filter).sort(sort ? { price: sort === "desc" ? -1 : 1 } : {})
      .skip((page - 1) * limit).limit(limit).lean();
    return { docs, totalPages, page, prevPage: page > 1 && page <= totalPages ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null, hasPrevPage: page > 1 && page <= totalPages,
      hasNextPage: page < totalPages };
  }
  async getById(id) {
    if (!mongoose.isValidObjectId(id)) throw new HttpError(400, "ID de producto inválido");
    const product = await Product.findById(id).lean();
    if (!product) throw new HttpError(404, "Producto no encontrado");
    return product;
  }
  async create(data) { return (await Product.create(data)).toObject(); }
  async update(id, data) {
    if (!mongoose.isValidObjectId(id)) throw new HttpError(400, "ID de producto inválido");
    delete data._id; delete data.id;
    const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!product) throw new HttpError(404, "Producto no encontrado");
    return product;
  }
  async delete(id) {
    if (!mongoose.isValidObjectId(id)) throw new HttpError(400, "ID de producto inválido");
    const product = await Product.findByIdAndDelete(id).lean();
    if (!product) throw new HttpError(404, "Producto no encontrado");
    return product;
  }
}
