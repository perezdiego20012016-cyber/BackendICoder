import { productDAO } from "../dao/index.js";
import { HttpError } from "../utils/httpError.js";
import { paginationLinks } from "../utils/query.js";
export const parseOptions = (query) => {
  const limit = Number(query.limit ?? 10); const page = Number(query.page ?? 1);
  if (!Number.isInteger(limit) || limit < 1 || !Number.isInteger(page) || page < 1)
    throw new HttpError(400, "limit y page deben ser enteros mayores a 0");
  if (query.sort && !["asc", "desc"].includes(query.sort)) throw new HttpError(400, "sort debe ser asc o desc");
  return { limit, page, query: query.query, sort: query.sort };
};
export async function listProducts(req, res) {
  const result = await productDAO.paginate(parseOptions(req.query));
  res.json({ status: "success", payload: result.docs, totalPages: result.totalPages,
    prevPage: result.prevPage, nextPage: result.nextPage, page: result.page,
    hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, ...paginationLinks(req, result) });
}
export async function getProduct(req, res) { res.json({ status: "success", payload: await productDAO.getById(req.params.pid) }); }
export async function createProduct(req, res) {
  const product = await productDAO.create(req.body); req.app.get("io").emit("products:changed");
  res.status(201).json({ status: "success", payload: product });
}
export async function updateProduct(req, res) {
  const product = await productDAO.update(req.params.pid, req.body); req.app.get("io").emit("products:changed");
  res.json({ status: "success", payload: product });
}
export async function deleteProduct(req, res) {
  const product = await productDAO.delete(req.params.pid); req.app.get("io").emit("products:changed");
  res.json({ status: "success", payload: product });
}
