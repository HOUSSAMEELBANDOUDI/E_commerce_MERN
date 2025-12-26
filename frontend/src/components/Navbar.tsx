import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";

function Navbar() {
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
            <Typography variant="h6">
              Laptop Store
            </Typography>
          </Box>

          {/* Right side (User) */}
          <Box>
            <Avatar>U</Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

