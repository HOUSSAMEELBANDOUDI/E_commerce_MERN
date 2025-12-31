import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

function Navbar() {
  const { username, token, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const isLoggedIn = !!token;

  const goHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* ✅ Logo clickable */}
          <Button
            onClick={goHome}
            color="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "none", // يمنع الحروف الكابيتال
              fontSize: "1.25rem",
            }}
          >
            <LaptopMacIcon />
            <Typography variant="h6">Laptop Store</Typography>
          </Button>

          {/* Right side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isLoggedIn && (
              <IconButton color="inherit" onClick={() => navigate("/cart")}>
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}

            {isLoggedIn ? (
              <>
                <Typography>{username}</Typography>
                <Avatar>
                  {username ? username[0].toUpperCase() : "U"}
                </Avatar>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;




