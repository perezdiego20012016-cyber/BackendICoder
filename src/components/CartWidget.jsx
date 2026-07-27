import "./CartWidget.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartWidget() {
  const { getTotalQuantity } = useCart();

  return (
    <Link to="/cart" className="cart">
      🛒
      {getTotalQuantity() > 0 && (
        <span className="badge">{getTotalQuantity()}</span>
      )}
    </Link>
  );
}

export default CartWidget;