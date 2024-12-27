import { Box, Button, Grid, Rating, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SkeltonProductDetail from "./SkeltonProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cart/cartSlice";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { product_id } = useParams();

  const [ProductDetails, setProductDetail] = useState({});

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  console.log(cartItems, "cartItems");

  useEffect(() => {
    const productData = axios
      .get(`https://fakestoreapi.com/products/${product_id}`)
      .then((data) => {
        setProduct(data.data);
        setIsLoadingData(false);
      });
  }, []);

  useEffect(() => {
    const renderProduct = cartItems?.filter(
      (item) => item?.id == product_id
    )[0];
    setProductDetail(renderProduct);
    console.log(renderProduct, "renderProduct");
  }, [cartItems]);

  console.log(product, "productData");

  const isExist = cartItems?.find(item => item?.id == product_id);

  return (
    <>
      {isLoadingData ? (
        <SkeltonProductDetail />
      ) : (
        <Box
          className="mt-5"
          sx={{ padding: 3, maxWidth: "1200px", margin: "0 auto" }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} lg={4}>
              <img
                src={product?.image}
                alt="Product"
                style={{
                  maxWidth: "100%",
                  height: "auto",
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
                sx={{ marginTop: 1 }}
              >
                {product?.title}
              </Typography>
              <Typography className="mb-3" variant="body1" sx={{ marginY: 2 }}>
                {product?.description}
              </Typography>
              <Rating
                name="read-only"
                value={Math.round(product?.rating?.rate)}
                readOnly
                sx={{ marginBottom: 2 }}
              />
              <Box
                className="d-flex align-items-center"
                sx={{
                  maxWidth: "300px",
                  marginY: 2,
                  display: "flex",
                  gap: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ${product?.price}
                </Typography>
                {isExist && (
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Qty:{ProductDetails?.quantity}
                  </Typography>
                )}
                <Button onClick={()=>dispatch(addToCart(product))} size="small" variant="contained">
                  <AddIcon /> ADD
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
