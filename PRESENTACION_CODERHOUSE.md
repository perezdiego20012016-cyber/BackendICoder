# Presentación pública — Entrega final Backend I

**Alumno:** Diego Pérez  
**Curso:** Backend I — Coderhouse  
**Repositorio:** https://github.com/perezdiego20012016-cyber/BackendICoder

> Usar cada sección `Diapositiva` como una diapositiva en Google Slides. Este archivo también deja documentada la evidencia técnica solicitada.

---

## Diapositiva 1 — Proyecto

Ecommerce de golosinas con una API REST para productos y carritos. El backend se desarrolló con Node.js y Express, persiste la información en MongoDB mediante Mongoose, muestra vistas con Handlebars y actualiza el catálogo en tiempo real con Socket.IO.

**Acceso local:** `http://localhost:8080/products`  
**Puerto del servidor:** `8080`

Tecnologías principales:

- Node.js, Express y Express Router.
- MongoDB, Mongoose y persistencia alternativa FileSystem.
- Handlebars para las vistas.
- Socket.IO para cambios de productos en tiempo real.

---

## Diapositiva 2 — Estructura y persistencia

La aplicación usa la base de datos **`ecommerce`** y las colecciones **`products`** y **`carts`**.

```text
server/
├── dao/
│   ├── mongo/
│   │   ├── product.dao.js
│   │   └── cart.dao.js
│   ├── filesystem/
│   │   ├── base.dao.js
│   │   ├── product.dao.js
│   │   └── cart.dao.js
│   └── index.js
├── models/
│   ├── product.model.js
│   └── cart.model.js
├── routes/
├── controllers/
├── views/
└── scripts/seedProducts.js
```

La carpeta `dao/filesystem/` se conserva como persistencia alternativa. Para activarla se configura `PERSISTENCE=FILESYSTEM`; por defecto se usa MongoDB (`PERSISTENCE=MONGO`).

---

## Diapositiva 3 — Schemas Mongoose

**Producto — colección `products`:**

```js
{
  title: String,          // requerido
  description: String,    // requerido
  code: String,           // requerido y único
  price: Number,          // requerido, mínimo 0
  status: Boolean,        // true por defecto
  stock: Number,          // requerido, mínimo 0
  category: String,       // requerido
  thumbnails: [String]
}
```

**Carrito — colección `carts`:**

```js
{
  products: [{
    product: ObjectId,    // ref: "Product"
    quantity: Number      // mínimo 1
  }]
}
```

El `GET /api/carts/:cid` utiliza `populate("products.product")`, por lo que devuelve los datos completos de cada producto del carrito.

---

## Diapositiva 4 — API de productos

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/products` | Lista productos paginados, filtrados u ordenados. |
| GET | `/api/products/:pid` | Obtiene un producto por su ID. |
| POST | `/api/products` | Crea un producto. |
| PUT | `/api/products/:pid` | Actualiza un producto sin modificar el ID. |
| DELETE | `/api/products/:pid` | Elimina un producto. |

**Parámetros de `GET /api/products`:**

| Parámetro | Valor por defecto | Uso |
| --- | --- | --- |
| `limit` | `10` | Cantidad de resultados. |
| `page` | `1` | Página solicitada. |
| `query` | — | Categoría o disponibilidad: `available`, `unavailable`, `disponible`, `nodisponible`. |
| `sort` | — | `asc` o `desc`, por precio. |

Ejemplo de consulta:

```http
GET /api/products?limit=2&page=1&query=Chocolates&sort=asc
```

Ejemplo de respuesta:

```json
{
  "status": "success",
  "payload": [{ "title": "Bon o Bon", "price": 500, "category": "Chocolates" }],
  "totalPages": 10,
  "prevPage": null,
  "nextPage": 2,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevLink": null,
  "nextLink": "/api/products/?limit=2&page=2&query=Chocolates&sort=asc"
}
```

---

## Diapositiva 5 — Requests de productos

Crear producto:

```http
POST /api/products
Content-Type: application/json

{
  "title": "Chocolate de prueba",
  "description": "Chocolate con leche",
  "code": "CHO-021",
  "price": 1900,
  "status": true,
  "stock": 20,
  "category": "Chocolates",
  "thumbnails": ["/images/milka.png"]
}
```

Respuesta de alta:

```json
{
  "status": "success",
  "payload": { "_id": "<id-generado-automaticamente>", "code": "CHO-021" }
}
```

Actualizar producto:

```http
PUT /api/products/:pid
Content-Type: application/json

{ "price": 2000, "stock": 25 }
```

Eliminar producto:

```http
DELETE /api/products/:pid
```

Las altas, actualizaciones y eliminaciones emiten el evento Socket.IO `products:changed`, que recarga automáticamente las vistas de productos abiertas.

---

## Diapositiva 6 — API de carritos

| Método | Ruta | Request / comportamiento |
| --- | --- | --- |
| POST | `/api/carts` | Crea un carrito con ID autogenerado. |
| GET | `/api/carts/:cid` | Devuelve el carrito y sus productos poblados. |
| POST | `/api/carts/:cid/products/:pid` | Agrega el producto; si existe, incrementa `quantity`. |
| DELETE | `/api/carts/:cid/products/:pid` | Elimina un producto del carrito. |
| PUT | `/api/carts/:cid` | Reemplaza todos los productos del carrito. |
| PUT | `/api/carts/:cid/products/:pid` | Actualiza únicamente la cantidad. |
| DELETE | `/api/carts/:cid` | Vacía el carrito completo. |

Ejemplos de bodies:

```http
PUT /api/carts/:cid
Content-Type: application/json

{
  "products": [
    { "product": "<productId>", "quantity": 2 }
  ]
}
```

```http
PUT /api/carts/:cid/products/:pid
Content-Type: application/json

{ "quantity": 3 }
```

Ejemplo de respuesta de `POST /api/carts/:cid/products/:pid`:

```json
{
  "status": "success",
  "payload": {
    "_id": "<cartId>",
    "products": [
      {
        "product": { "_id": "<productId>", "title": "Bon o Bon", "price": 500 },
        "quantity": 1
      }
    ]
  }
}
```

---

## Diapositiva 7 — Vistas, CRUD y tiempo real

| Vista | Función |
| --- | --- |
| `/products` | Catálogo con paginación y filtros. |
| `/products/:pid` | Detalle de producto y formulario para agregarlo a un carrito. |
| `/carts/:cid` | Visualización de un carrito específico. |

El CRUD de productos está separado en rutas, controladores y DAO. Los routers se montan en `/api/products` y `/api/carts`; los errores asincrónicos pasan por `asyncHandler` y por un middleware central de errores.

Socket.IO se carga en las vistas. Al recibir `products:changed`, el navegador actualiza la página de listado o detalle para reflejar los cambios en tiempo real.

---

## Diapositiva 8 — Evidencia de ejecución real

**Carga del catálogo en MongoDB:**

```text
> npm.cmd run seed

Carga completa: 0 creados, 60 actualizados.
Acidos: 20
Chocolates: 20
Paletas: 20
```

**Consulta HTTP real ejecutada contra MongoDB:**

```text
GET http://localhost:8080/api/products?limit=2&page=1&query=Chocolates&sort=asc
status: success
products devueltos: Bon o Bon, Bon o Bon Chocolate Blanco
totalPages: 10
nextPage: 2
```

**Flujo de carrito comprobado:**

```text
POST /api/carts                         -> carrito creado
POST /api/carts/:cid/products/:pid      -> Bon o Bon agregado, quantity: 1
GET /api/carts/:cid                     -> producto completo disponible por populate
```

Para repetir la demostración:

```bash
npm install
npm run seed
npm run server
```

Abrir `http://localhost:8080/products`.

---

## Diapositiva 9 — Dificultades, soluciones y mejoras

1. **Conexión inicial a MongoDB.** El seed devolvía `ECONNREFUSED 127.0.0.1:27017` porque el servicio no estaba activo. Se instaló e inició MongoDB; luego el seed confirmó la carga de los 60 productos.

2. **Evitar duplicados al poblar la base.** Ejecutar el seed varias veces podía duplicar datos. Se resolvió usando `bulkWrite` con `updateOne`, filtro por `code` y `upsert: true`; por eso se puede ejecutar nuevamente sin crear productos repetidos.

3. **Mantener dos persistencias sin duplicar la lógica de rutas.** Se implementó una capa DAO. Los controladores usan `productDAO` y `cartDAO`, que seleccionan MongoDB o FileSystem según la variable `PERSISTENCE`.

4. **Mostrar información completa en carritos.** Los carritos almacenan ObjectId de producto, pero la vista necesita título y precio. Se resolvió con `populate("products.product")` en el DAO Mongo.

5. **Actualizar las vistas sin recarga manual.** Se integró Socket.IO: cada cambio de producto emite `products:changed` y el cliente escucha ese evento para refrescar el listado o el detalle.

Mejoras futuras: autenticación de usuarios, control de stock al agregar al carrito, pruebas automatizadas, órdenes de compra y despliegue en la nube.

---

## Diapositiva 10 — Repositorio y demostración

Repositorio público:

https://github.com/perezdiego20012016-cyber/BackendICoder

Flujo sugerido para la demostración en video o GIF:

1. Ejecutar `npm run seed` y mostrar la salida de las 3 categorías.
2. Ejecutar `npm run server` y mostrar `http://localhost:8080/products`.
3. Navegar al detalle de un producto.
4. Crear un carrito por API y agregar el producto.
5. Abrir `/carts/:cid` para mostrar el producto poblado.
6. Crear, actualizar o eliminar un producto mediante Postman/Thunder Client y mostrar la actualización de la vista en tiempo real.
