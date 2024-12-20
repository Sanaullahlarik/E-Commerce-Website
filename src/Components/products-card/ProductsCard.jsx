import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cart/cartSlice";

const ProductsCard = (props) => {
  // const { productsData } = props;
  const [updatedProductsArr, setUpdatedProductsArr] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categoryArr, setCategoryArr] = useState([]);

  const dispatch = useDispatch();

  console.log(updatedProductsArr, "updatedProductsArr");

  const filterProducts = (categoryProduct) => {
    const filterByCategory = products.filter(
      (item) => item.category === categoryProduct.value
    );

    setUpdatedProductsArr(filterByCategory);
    console.log(filterByCategory, "filterByCategory");
  };
  useEffect(() => {
    const productsData = axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        console.log(data, "apiData");
        const categoryArr = data?.data?.map((item) => {
          return {
            label: item.category,
            value: item.category,
          };
        });

        const uniqueData = categoryArr.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.value === item.value)
        );
        setCategoryArr(uniqueData);
        setProducts(data?.data);
        setUpdatedProductsArr(data?.data);
        setIsLoadingData(false);
      });
  }, []);

  return (
    <>
      <Autocomplete
        disablePortal
        options={categoryArr}
        sx={{ width: 300 }}
        onChange={(e, newValue) => {
          filterProducts(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <Grid container spacing={3}>
        {isLoadingData ? (
          <Box className="text-center w-100 mt-4">
            <CircularProgress size={40} />
          </Box>
        ) : (
          updatedProductsArr?.map((product, index) => (
            <Grid container item xs={12} sm={6} md={4} lg={3}>
              <Card
                key={index}
                className="p-3 rounded-3 w-100 mt-5 shadow p-3 mb-5 bg-body rounded text-center"
              >
                <Swiper
                  spaceBetween={20}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={false}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      className="card-image img-fluid"
                      src={product?.image}
                      alt="Product img"
                      style={{
                        maxHeight: "210px",
                        minHeight: "210px",
                        marginTop: "20px",
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className="card-image img-fluid"
                      src={product?.image}
                      alt="Product img"
                      style={{
                        maxHeight: "210px",
                        minHeight: "210px",
                        marginTop: "20px",
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className="card-image img-fluid"
                      src={product?.image}
                      alt="Product img"
                      style={{
                        maxHeight: "210px",
                        minHeight: "210px",
                        marginTop: "20px",
                      }}
                    />
                  </SwiperSlide>
                </Swiper>
                <Box className="mt-3" sx={{ textAlign: "center" }}>
                  <Typography
                    className="text-primary"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {product?.category}
                  </Typography>
                  <Tooltip title={product?.title} placement="top">
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        cursor: "pointer",
                      }}
                    >
                      {product?.title?.length >= 30
                        ? `${product?.title.slice(0, 30)}...`
                        : product?.title}
                    </Typography>
                  </Tooltip>
                  <Rating
                    name="read-only"
                    value={Math.round(product?.rating?.rate)}
                    readOnly
                  />
                </Box>
                <Box className="mt-2 d-flex justify-content-between align-items-center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    ${product?.price}
                  </Typography>
                  <Box className="d-flex">
                    <Box>
                      <Tooltip title="View Product" placement="top">
                        <Link to={`/product-details/${product?.id}`}>
                          <Button size="small">
                            <VisibilityIcon />
                          </Button>
                        </Link>
                      </Tooltip>
                    </Box>
                    <Box>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        <AddIcon /> ADD
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};
export default ProductsCard;
