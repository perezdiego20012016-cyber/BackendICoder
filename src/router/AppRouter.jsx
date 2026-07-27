import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavBar from "../components/NavBar";
import { CartProvider } from "../context/CartContext";
import CandyLoader from "../components/CandyLoader"; 

// 👇 Lazy loading
const ItemListContainer = lazy(() => import("../components/ItemListContainer"));
const ItemDetailContainer = lazy(() => import("../components/ItemDetailContainer"));
const CartContainer = lazy(() => import("../components/CartContainer"));
const Checkout = lazy(() => import("../components/Checkout"));
function AppRouter() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />

        {/* 👇 ENVUELVE TODAS LAS RUTAS */}
        <Suspense fallback={<CandyLoader />}>
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartContainer />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </Suspense>

      </BrowserRouter>
    </CartProvider>
  );
}

export default AppRouter;