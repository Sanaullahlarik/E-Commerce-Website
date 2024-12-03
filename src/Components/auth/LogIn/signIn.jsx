import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="container" sx={{ height: "100vh" }}>
        <Box className="row h-100 align-items-center">
          <Box className="col-md-6 d-none d-md-block">
            <img
              src={ShoppingIllustration}
              alt="Shopping Illustration"
              className="img-fluid"
            />
          </Box>

          <Box className="col-md-6">
            <Box className="mx-auto" style={{ maxWidth: "400px" }}>
              <Typography className="fw-bold text-dark" variant="h4">
                Sign in to FreshCart
              </Typography>
              <Typography variant="body1" className="mb-3">
                Welcome to FreshCart! Enter your email to get started.
              </Typography>

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    error={!!errors.email}
                    fullWidth
                    size="small"
                    className="mt-3"
                    label="Email"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
              <Typography className="text-danger">
                {errors.email?.message}
              </Typography>

              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField
                    error={!!errors.password}
                    fullWidth
                    size="small"
                    className="mt-3"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    {...field}
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
              <Typography className="text-danger">
                {errors.password?.message}
              </Typography>

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
                <Link
                  to="/sign-up"
                  className="text-decoration-none"
                  style={{ color: "#28a745" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SignIn;
