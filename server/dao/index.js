import { env } from "../config/env.js";
import { MongoProductDAO } from "./mongo/product.dao.js";
import { MongoCartDAO } from "./mongo/cart.dao.js";
import { FileProductDAO } from "./filesystem/product.dao.js";
import { FileCartDAO } from "./filesystem/cart.dao.js";
const useFiles = env.persistence === "FILESYSTEM";
export const productDAO = useFiles ? new FileProductDAO() : new MongoProductDAO();
export const cartDAO = useFiles ? new FileCartDAO() : new MongoCartDAO();
