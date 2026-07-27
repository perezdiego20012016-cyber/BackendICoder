import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import CartWidget from "./CartWidget";
import "./NavBar.css";

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">golosineria</Link>

      <div>
        <Button
          id="categories-button"
          aria-controls={open ? "categories-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
          sx={{ backgroundColor: "#c024c0", color: "#fff", "&:hover": { backgroundColor: "#f512a2" } }}
        >
          Categorías
        </Button>

        <Menu
          id="categories-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem component={Link} to="/category/acidos" onClick={handleClose}>
            Acidos
          </MenuItem>
          <MenuItem component={Link} to="/category/chocolates" onClick={handleClose}>
            Chocolates
          </MenuItem>
          <MenuItem component={Link} to="/category/paletas" onClick={handleClose}>
            Paletas
          </MenuItem>
        </Menu>
      </div>

      <CartWidget />
    </nav>
  );
}

export default NavBar;