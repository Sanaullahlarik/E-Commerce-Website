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

          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextField
                error={errors?.firstName ? true : false}
                size="small"
                fullWidth
                className="me-3 mt-3"
                id="outlined-basic"
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
            name="lastName"
            render={({ field }) => (
              <TextField
                error={errors?.lastName ? true : false}
                size="small"
                fullWidth
                className="me-3 mt-3"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Typography className="text-danger">
            {errors?.lastName?.message}
          </Typography>

          <Box className="mt-3 me-3">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  error={errors?.email ? true : false}
                  size="small"
                  fullWidth
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
          </Box>
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
            Register
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default SignUp;
