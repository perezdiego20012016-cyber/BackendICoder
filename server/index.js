import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { env } from "./config/env.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRouter } from "./routes/views.router.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.set("io", io);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve("server/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("server/public")));
app.use(express.static(path.resolve("public")));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use(notFound);
app.use(errorHandler);
async function start() {
  if (env.persistence === "MONGO") {
    await mongoose.connect(env.mongoUri, { dbName: "ecommerce" });
    console.log("MongoDB conectado: ecommerce");
  } else console.log("Persistencia FileSystem activa");
  httpServer.listen(env.port, () => console.log(`Servidor en http://localhost:${env.port}`));
}
start().catch((error) => {
  console.error("No se pudo iniciar el servidor:", error.message);
  process.exit(1);
});
export { app, httpServer };
