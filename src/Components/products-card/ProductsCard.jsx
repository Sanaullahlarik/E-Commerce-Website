import { Box, Button, Card, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const ProductsCard = (props) => {
  const { productsData } = props;

  const [products, setProducts] = useState([]);

  console.log(products, `products`);

  useEffect(() => {
    const productsData = axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((data) => setProducts(data.data));

    console.log(productsData, `products`);
  }, []);
  return (
    <Box
      className="d-flex flex-wrap justify-content-center gap-2"
      sx={{ maxWidth: "100%", margin: "0 auto" }}
    >
      {products?.map((product, index) => (
        <Card
          key={index}
          className="p-3 card"
          style={{ width: "250px", margin: "10px" }}
        >
          <img
            className="card-image"
            src={product?.images[0]}
            alt="Product img"
          />
          <Typography variant="body2" className="mt-3">
            {product?.Category}
          </Typography>
          <Typography variant="body1">{product.title}</Typography>
          <Rating name="read-only" value={product.Rating} readOnly />
          <Box className="d-flex justify-content-between align-items-center">
            <Typography>${product?.price}</Typography>
            <Button size="small" variant="contained">
              <AddIcon /> ADD
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};
export default ProductsCard;
