import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  Grid2,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CircularProgress from "@mui/material/CircularProgress";

const ProductsCard = (props) => {
  const { productsData } = props;
  const [updatedProductsArr, setUpdatedProductsArr] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categoryArr, setCategoryArr] = useState([]);

  const filterProducts = (categoryProduct) => {
    const filterByCategory = products.filter(
      (item) => item.category.name === categoryProduct.value
    );

    setUpdatedProductsArr(filterByCategory);
    console.log(filterByCategory, "filterByCategory");
  };
  useEffect(() => {
    const productsData = axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((data) => {
        const filterData = data?.data?.filter(
          (products) =>
            products?.title !== "New Product" &&
            products.title !== "Giày" &&
            products.title !== "Coat" &&
            products.title !== "Itachi" &&
            products.title !== "JOSE LUIS" &&
            products.title !== "JOSE LUIS" &&
            products.title !== "sdfsd" &&
            products.title !== "New Product AIT" &&
            products.title !== "Strapi External APIs Integration Plugin" &&
            products.title !== "product" &&
            products.title !== "Updated Product" &&
            products.title !== "Miscellaneous"
        );
        const categoryArr = filterData.map((item) => {
          return {
            label: item.category.name,
            value: item.category.name,
          };
        });

        const uniqueData = categoryArr.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.value === item.value)
        );
        setCategoryArr(uniqueData);
        setProducts(filterData);
        setUpdatedProductsArr(filterData);
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card
                key={index}
                className="p-3 rounded-3"
                sx={{
                  background: "#fff",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                }}
              >
                <Swiper
                  spaceBetween={20}
                  centeredSlides={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={false}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {product?.images?.map((img, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <img
                        className="card-image img-fluid"
                        src={img}
                        alt="Product img"
                        style={{
                          borderRadius: "10px",
                          objectFit: "cover",
                          width: "100%",
                          height: "300px",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Box className="mt-3" sx={{ textAlign: "center" }}>
                  <Typography
                  className="text-primary"
                    variant="body2"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {product?.category.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {product.title}
                  </Typography>
                </Box>
                <Box
                  className="mt-3"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold"}}
                  >
                    ${product?.price}
                  </Typography>
                  <Button size="small" variant="contained">
                    <AddIcon /> ADD
                  </Button>
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
