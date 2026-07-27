import { cartDAO } from "../dao/index.js";
export async function createCart(req, res) { res.status(201).json({ status: "success", payload: await cartDAO.create() }); }
export async function getCart(req, res) { res.json({ status: "success", payload: await cartDAO.getById(req.params.cid) }); }
export async function addProduct(req, res) { res.json({ status: "success", payload: await cartDAO.addProduct(req.params.cid, req.params.pid) }); }
export async function replaceProducts(req, res) { res.json({ status: "success", payload: await cartDAO.replaceProducts(req.params.cid, req.body.products ?? req.body) }); }
export async function updateQuantity(req, res) { res.json({ status: "success", payload: await cartDAO.updateQuantity(req.params.cid, req.params.pid, Number(req.body.quantity)) }); }
export async function removeProduct(req, res) { res.json({ status: "success", payload: await cartDAO.removeProduct(req.params.cid, req.params.pid) }); }
export async function clearCart(req, res) { res.json({ status: "success", payload: await cartDAO.clear(req.params.cid) }); }
