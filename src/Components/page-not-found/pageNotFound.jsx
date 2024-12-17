import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ErrorImg from "../../Assets/error (1).svg"

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Box>
        <Typography variant="h3">Something's wrong here...</Typography>
        <img className=' img-fluid' src={ErrorImg} alt='Error' />
      </Box>
    </div>
  )
}

export default PageNotFound;
