import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import ShoppingIllustration from "../../../Assets/signin-g.svg";

const signupSchema = yup.object({
  email: yup.string().required("Email is required!"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters!")
    .max(10, "Password cannot exceed 10 characters!")
    .required("Password is required!"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signupSchema),
  });

  const signInHandler = async (data) => {
    try {
      const resp = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      );

      if (resp?.data?.access_token) {
        localStorage.setItem("token", resp.data.access_token);
        navigate("/");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(signInHandler)}>
      <Box className="container" sx={{ height: "100vh" }}>
        <Box className="row h-100 align-items-center">
          <Box className="col-md-6">
            <img
              src={ShoppingIllustration}
              alt="Shopping Illustration"
              className="img-fluid"
            />
          </Box>
          <Box className="col-md-6">
            <Typography variant="h4" className="fw-bold text-dark">
              Sign in to E-store
            </Typography>
            <Typography variant="body1" className="mb-3">
              Welcome to FreshCart! Enter your email to get started.
            </Typography>

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.email}
                  fullWidth
                  size="small"
                  className="mt-3"
                  label="Email"
                  variant="outlined"
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.password}
                  fullWidth
                  size="small"
                  className="mt-3"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              className="mt-3"
              variant="contained"
              style={{ backgroundColor: "#28a745", color: "#fff" }}
            >
              Sign In
            </Button>

            <Typography variant="body2" className="mt-3 text-center">
              Don’t have an account?{" "}
              <Link to="/sign-up" style={{ color: "#28a745" }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SignIn;
