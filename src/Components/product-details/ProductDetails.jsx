import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { product_id } = useParams();
  useEffect(() => {
    const productsData = axios
      .get(`https://fakestoreapi.com/products/${product_id}`)
      .then((data) => {
        setProduct(data?.data);
      });
  }, []);
  console.log(product, "productData");

  return (
    <Box className="mt-5" sx={{ padding: 3 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} lg={4}>
          <img
            width="100%"
            src={product?.image}
            alt="Product"
            style={{
              maxWidth: "300px",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Typography
            className="text-primary"
            variant="body2"
            sx={{ textTransform: "uppercase", fontWeight: 600 }}
          >
            {product?.category}
          </Typography>
          <Typography
          className="fw-bold mt-2"
            variant="h3"
          >
            {product?.title}
          </Typography>
          <Typography
          className="mb-3"
            variant="body1"
          >
            {product?.description}
          </Typography>
          <Rating name="read-only" value={Math.round(product?.rating?.rate)} readOnly />
          <Box
          className="d-flex align-items-center justify-content-between"
            style={{
              maxWidth: "300px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ${product?.price}
            </Typography>
            <Button size="small" variant="contained">
              <AddIcon /> ADD
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
