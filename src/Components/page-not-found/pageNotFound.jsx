import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Box>
        <Typography variant="h3">Something's wrong here...</Typography>
        <Typography variant="body1">
          We can't find the page you're looking for.Check out help center or <br />
          head back to home
        </Typography>
      </Box>
    </div>
  )
}

export default PageNotFound;
