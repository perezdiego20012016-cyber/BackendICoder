const socket = io();
socket.on("products:changed", () => {
  if (location.pathname === "/products" || location.pathname.startsWith("/products/")) location.reload();
});
