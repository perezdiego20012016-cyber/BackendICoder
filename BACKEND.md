# Backend del ecommerce

El frontend React/Firebase original se conserva. El backend agregado usa Node.js,
Express, MongoDB, Mongoose, Handlebars y Socket.IO.

## Ejecución

1. Copiar `.env.example` como `.env`.
2. Tener MongoDB disponible o configurar `MONGODB_URI`.
3. Ejecutar `npm run server`.
4. Abrir `http://localhost:8080/products`.

Para cargar el catálogo inicial de 30 productos (10 por categoría), ejecutar:

```bash
npm run seed
```

La carga usa el campo `code` para actualizar productos existentes sin duplicarlos.

Por defecto se usa la base `ecommerce`, con las colecciones `products` y `carts`.
Para probar sin MongoDB se puede usar `PERSISTENCE=FILESYSTEM`. Ese DAO se encuentra
en `server/dao/filesystem` y escribe sus archivos en `server/data`.

## Endpoints

- `GET /api/products?limit=10&page=1&query=Chocolates&sort=asc`
- `GET /api/products/:pid`
- `POST /api/products`
- `PUT /api/products/:pid`
- `DELETE /api/products/:pid`
- `POST /api/carts`
- `GET /api/carts/:cid`
- `POST /api/carts/:cid/products/:pid`
- `DELETE /api/carts/:cid/products/:pid`
- `PUT /api/carts/:cid`
- `PUT /api/carts/:cid/products/:pid` con `{ "quantity": 2 }`
- `DELETE /api/carts/:cid`

`query` acepta una categoría, `available`/`disponible` o
`unavailable`/`nodisponible`.

## Producto de ejemplo

```json
{
  "title": "Chocolate",
  "description": "Chocolate con leche",
  "code": "CHO-001",
  "price": 1500,
  "status": true,
  "stock": 20,
  "category": "Chocolates",
  "thumbnails": ["/images/milka.png"]
}
```

Las vistas están en `/products`, `/products/:pid` y `/carts/:cid`. Las altas,
modificaciones y bajas notifican a Socket.IO y refrescan las vistas abiertas.
