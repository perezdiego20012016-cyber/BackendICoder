import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardMedia,
  Box
} from "@mui/material";

function CartContainer() {
  const { cart, getTotalPrice, removeItem, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 5 }}>
        Carrito vacío
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        🛒 Tu carrito
      </Typography>

      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              
              <CardMedia
                component="img"
                image={item.Image || "/images/placeholder.png"}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 2
                }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.Name}</Typography>

                <Typography variant="body2">
                  Cantidad: {item.quantity}
                </Typography>

                <Typography variant="body2">
                  Precio: ${item.Price}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                  Subtotal: ${item.Price * item.quantity}
                </Typography>
              </CardContent>

              <Button
                variant="contained"
                color="error"
                onClick={() => removeItem(item.id)}
              >
                Eliminar
              </Button>

            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5">
          Total: ${getTotalPrice()}
        </Typography>

        <Button
          variant="outlined"
          color="error"
          onClick={clearCart}
          sx={{ mt: 2, mr: 2 }}
        >
          Vaciar carrito
        </Button>

        <Button
          variant="contained"
          component={Link}
          to="/checkout"
          sx={{ mt: 2 }}
        >
          Finalizar compra
        </Button>
      </Box>
    </Box>
  );
}

export default CartContainer;