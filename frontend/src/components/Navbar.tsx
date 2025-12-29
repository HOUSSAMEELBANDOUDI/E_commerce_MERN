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

function Navbar() {
  const { username, token, logout } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = !!token;

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
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
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LaptopMacIcon />
            <Typography variant="h6">Laptop Store</Typography>
          </Box>

          {/* Right side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={4} color="error">
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
                onClick={handleLoginClick}
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




