import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signupSchema = yup.object({
  email: yup.string().required("Email is required!"),
  password: yup.string().min(5).max(10).required("Password is required!"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                error={errors?.email ? true : false}
                size="small"
                fullWidth
                className="me-3 mt-3"
                id="outlined-basic"
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
                className="me-3 mt-3"
                size="small"
                {...field}
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
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
                label="Password"
                variant="outlined"
              />
            )}
          />
          <Typography className="text-danger">
            {errors?.password?.message}
          </Typography>

          <Button
            type="submit"
            className="mt-3 bg-success"
            size="medium"
            fullWidth
            variant="contained"
          >
            Sign In
          </Button>
          <Typography className="mt-2" variant="body2">
            Don’t have an account?
            <Link className="text-decoration-none" to="/sign-up">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </form>
  );
};

export default SignIn;
