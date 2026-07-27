import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box, CardActions, CardMedia } from "@mui/material";
import { getProducts } from "../firebase/db";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import CandyLoader from "../components/CandyLoader"; 

function ItemCount({ stock = 10, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => { if (count < stock) setCount(count + 1); };
  const handleDecrement = () => { if (count > 1) setCount(count - 1); };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
      <Button variant="outlined" onClick={handleDecrement}>-</Button>
      <Typography>{count}</Typography>
      <Button variant="outlined" onClick={handleIncrement}>+</Button>
      <Button variant="contained" onClick={() => onAdd(count)}>Agregar</Button>
    </Box>
  );
}

function ItemDetailContainer() {
  const { itemId } = useParams();
  const { addItem } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((products) => {
        const productoEncontrado = products.find(p => p.id === itemId);
        setItem(productoEncontrado);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando producto:", err);
        setItem(null);
        setLoading(false);
      });

  }, [itemId]);

  const handleAddToCart = (quantity) => {
    if (!item) return;
    addItem(item, quantity);

    toast.success(`${item.Name} agregado al carrito 🛒`);
  };

  if (loading) return <CandyLoader />;

  if (!item) return <h2>Producto no encontrado</h2>;

  return (
    <Card sx={{ maxWidth: 400, margin: "0 auto", mt: 4 }}>

      <CardMedia
        component="img"
        image={item.Image || "/images/placeholder.png"}
        alt={item.Name}
        sx={{ height: 250, objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="h5">{item.Name}</Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          Categoría: {item.Category}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {item.Description}
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          ${item.Price}
        </Typography>

        <ItemCount onAdd={handleAddToCart} />
      </CardContent>

      <CardActions>
        <Button variant="contained" component={Link} to="/" fullWidth>
          Volver al listado
        </Button>
      </CardActions>
    </Card>
  );
}

export default ItemDetailContainer;
