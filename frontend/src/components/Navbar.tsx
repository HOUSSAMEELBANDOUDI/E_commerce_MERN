import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

function Navbar() {
  const { username, token } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = !!token;

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Wrapper */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side (Logo) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LaptopMacIcon />
            <Typography variant="h6">Laptop Store</Typography>
          </Box>

          {/* Right side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isLoggedIn ? (
              <>
                <Typography variant="body1">
                  {username || ""}
                </Typography>
                <Avatar>
                  {username ? username[0].toUpperCase() : "U"}
                </Avatar>
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


