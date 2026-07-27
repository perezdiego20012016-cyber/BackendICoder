export function notFound(req, res) {
  res.status(404).json({ status: "error", error: "Ruta no encontrada" });
}
export function errorHandler(error, req, res, _next) {
  void _next;
  console.error(error);
  const status = error.status || (error.name === "ValidationError" ? 400 : error.code === 11000 ? 409 : 500);
  const message = error.code === 11000 ? "El código del producto ya existe" : error.message || "Error interno del servidor";
  res.status(status).json({ status: "error", error: message });
}
