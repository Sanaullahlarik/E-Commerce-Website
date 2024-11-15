import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      sx={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Box>
        <Typography className="pt-3 text-dark fw-bold" variant="h4">
          Get Start Shopping
        </Typography>
        <Typography variant="body1">
          Welcome to FreshCart! Enter your email to get started.
        </Typography>
        <TextField
          size="small"
          className="me-3 mt-3"
          id="outlined-basic"
          label="First Name"
          variant="outlined"
        />
        <TextField
          size="small"
          className="mt-3"
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
        />
        <Box className="mt-3">
          <TextField
            size="small"
            fullWidth
            className="me-3"
            type="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </Box>
        <Box className="mt-3">
          <TextField
            className="me-3"
            size="small"
            fullWidth
            type={showPassword ? "text" : "password"}
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
          Register
        </Button>
        <Typography className="mt-2" variant="body2">If you already register than goto?<Link className="text-decoration-none" to="/sign-In">Sign In</Link></Typography>
        <Typography className="mt-2" variant="body2">If you already register than goto?<Link className="text-decoration-none" to="/">Home page</Link></Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
