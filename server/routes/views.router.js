import { Router } from "express";
import { productDAO, cartDAO } from "../dao/index.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { parseOptions } from "../controllers/product.controller.js";
export const viewsRouter = Router();
viewsRouter.get("/", (req, res) => res.redirect("/products"));
viewsRouter.get("/products", asyncHandler(async (req, res) => {
  const viewQuery = { ...req.query, limit: req.query.limit || 30 };
  const result = await productDAO.paginate(parseOptions(viewQuery));
  const groups = Object.values(result.docs.reduce((accumulator, product) => {
    const key = product.category || "Otros";
    if (!accumulator[key]) accumulator[key] = { name: key, products: [] };
    accumulator[key].products.push(product);
    return accumulator;
  }, {}));
  const paramsFor = (page) => {
    const params = new URLSearchParams(req.query);
    params.set("page", page);
    params.set("limit", viewQuery.limit);
    return `/products?${params.toString()}`;
  };
  res.render("products", { ...result, groups,
    prevLink: result.prevPage ? paramsFor(result.prevPage) : null,
    nextLink: result.nextPage ? paramsFor(result.nextPage) : null });
}));
viewsRouter.get("/products/:pid", asyncHandler(async (req, res) =>
  res.render("productDetail", { product: await productDAO.getById(req.params.pid) })));
viewsRouter.get("/carts/:cid", asyncHandler(async (req, res) => {
  const cart = await cartDAO.getById(req.params.cid);
  res.render("cart", { cart, products: cart.products });
}));
