import { Box, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";

const CartList = (props) => {
  const {openCartList, toggleCartList} = props;
  return (
    <>
      <Drawer open={openCartList} onClose={toggleCartList(false)}>
        <Box sx={{width:"350px"}}>
        <Typography>
          Cart Items
        </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default CartList;
