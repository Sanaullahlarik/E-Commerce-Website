import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      sx={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Box>
        <Typography className="text-dark fw-bold" variant="h4">
        Sign in to FreshCart
        </Typography>
        <Typography variant="body1">
          Welcome to FreshCart! Enter your email to get started.
        </Typography>
        <TextField
        className="mt-1"
          size="small"
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <Box className="mt-3">
          <TextField
            size="small"
            fullWidth
            type={showPassword ? "text" : "password"}
            className="me-3"
            id="outlined-basic"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    className="eye"
                    position="start"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                   {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputAdornment>
                ),
              },
            }}
            label="Password"
            variant="outlined"
          />
        </Box>
        <Button className="mt-3 bg-success" size="medium" fullWidth variant="contained">
          Sign In
        </Button>
        <Typography className="mt-2" variant="body2">Don’t have an account?<Link className="text-decoration-none" to="/sign-up">Sign Up</Link></Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
