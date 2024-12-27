import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const SkeltonProductDetail = () => {
  return (
    <Box className="d-flex justify-content-center align-items-center">
      <Box className="mx-3 mt-5">
        <Skeleton variant="rounded" width={400} height={450} />
      </Box>
      <Box className="mt-5">
        <Skeleton variant="text" width={230} height={60} />
        <Skeleton variant="text" width={710} height={100} />
        <Skeleton variant="text" width={710} height={200} />
        <Skeleton variant="text" width={170} height={60} />
        <Skeleton variant="text" width={300} height={60} />
      </Box>
    </Box>
  );
};

export default SkeltonProductDetail;
