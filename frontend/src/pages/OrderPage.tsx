import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

function OrderPage() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
      }}
    >
      <CheckCircleOutlineIcon
        sx={{ fontSize: 80, color: "green" }}
      />

      <Typography variant="h4">
        Order Successful
      </Typography>

      <Typography>
        Thanks for your order.  
        We’ll start processing it shortly.
      </Typography>

      <Button
        variant="contained"
        onClick={handleHome}
      >
        Go to Home
      </Button>
    </Container>
  );
}

export default OrderPage;
