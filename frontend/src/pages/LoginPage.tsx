import { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../context/auth/AuthContext";
import { BASE_URL } from "../constants/api";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  // refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();


  // error state
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        setError("Invalid email or password");
        return;
      }

      const token = await response.json();
      if (!token) return;

      login(email, token);
      navigate("/");


    } catch {
      setError("Something went wrong, try again");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" mb={2}>
          Login to your account
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: "1px solid #ccc",
            padding: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <TextField
            label="Email"
            inputRef={emailRef}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            inputRef={passwordRef}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>

          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
