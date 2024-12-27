import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ShoppingIllustration from "../../../Assets/signup-g.svg";

const signupSchema = yup.object({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  email: yup.string().required("Email is required!").email("Invalid email!"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters!")
    .max(10, "Password cannot exceed 10 characters!")
    .required("Password is required!"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signupSchema),
  });

  const registerHandler = async (data) => {
    try {
      const resp = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        data
      );

      if (resp?.status === 201) {
        alert("Registration successful!");
        navigate("/sign-in");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(registerHandler)}>
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
              Create Your Account
            </Typography>
            <Typography variant="body1" className="mb-3">
              Welcome to FreshCart! Enter your details to get started.
            </Typography>
            
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.firstName}
                  fullWidth
                  size="small"
                  className="mt-3"
                  label="First Name"
                  variant="outlined"
                  helperText={errors.firstName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.lastName}
                  fullWidth
                  size="small"
                  className="mt-3"
                  label="Last Name"
                  variant="outlined"
                  helperText={errors.lastName?.message}
                />
              )}
            />

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
              Register
            </Button>
            <Typography variant="body2" className="mt-3 text-center">
              Already have an account?{" "}
              <Link to="/sign-in" style={{ color: "#28a745" }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SignUp;
