import { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../context/auth/AuthContext";


import { BASE_URL } from "../constants/api";



function RegisterPage() {
  // refs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

  // error state
  const [error, setError] = useState("");

  const handleRegister = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email ) return ;

    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        setError("User already exists, try another email");
        return;
      }

      const token = await response.json();

      if (!token) return;

        login(email, token);
      //console.log("Register success:", data);

      // هنا بعدين تقدر:
      // - تخزن التوكن
      // - تعمل redirect للـ homepage

    } catch  {
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
          Register New Account
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
            label="First Name"
            inputRef={firstNameRef}
            fullWidth
          />

          <TextField
            label="Last Name"
            inputRef={lastNameRef}
            fullWidth
          />

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
            onClick={handleRegister}
          >
            Register
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

export default RegisterPage;
