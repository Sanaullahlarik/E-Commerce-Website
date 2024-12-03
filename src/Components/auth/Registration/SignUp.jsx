import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ShoppingIllustration from "../../../Assets/signup-g.svg";
import { Link } from "react-router-dom";

const signupSchema = yup.object({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  email: yup.string().required("Email is required!"),
  password: yup.string().min(5).max(10).required("Password is required!"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      Email: "",
      Password: "",
    },
    resolver: yupResolver(signupSchema),
  });

  console.log(errors, `errors`);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
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
              <Typography className="pt-3 text-dark fw-bold" variant="h4">
                Get Start Shopping
              </Typography>
              <Typography variant="body1" className="mb-3">
                Welcome to FreshCart! Enter your email to get started.
              </Typography>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <TextField
                    error={errors?.firstName ? true : false}
                    size="small"
                    fullWidth
                    className="me-3 mt-3"
                    label="First Name"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
              <Typography className="text-danger">
                {errors?.firstName?.message}
              </Typography>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    error={errors?.email ? true : false}
                    size="small"
                    fullWidth
                    className="mt-3"
                    type="email"
                    label="Email"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
              <Typography className="text-danger">
                {errors?.email?.message}
              </Typography>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField
                    error={errors?.password ? true : false}
                    size="small"
                    fullWidth
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
                {errors?.password?.message}
              </Typography>
              <Button
                type="submit"
                className="mt-3 bg-color"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#28a745", color: "#fff" }}
              >
                Register
              </Button>
              <Typography variant="body2" className="mt-3 text-center">
                Go to sign In?
                <Link
                  to="/sign-in"
                  className="text-decoration-none"
                  style={{ color: "#28a745" }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SignUp;
