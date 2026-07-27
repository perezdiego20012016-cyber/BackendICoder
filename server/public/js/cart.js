document.querySelector(".add-cart")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector(".message");
  const cartId = new FormData(form).get("cartId");
  const response = await fetch(`/api/carts/${cartId}/products/${form.dataset.productId}`, { method: "POST" });
  const result = await response.json();
  message.textContent = response.ok ? "Producto agregado correctamente." : result.error;
});
