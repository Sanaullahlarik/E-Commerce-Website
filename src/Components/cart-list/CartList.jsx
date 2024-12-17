import {
  Box,
  Button,
  Drawer,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import {decreaseQuantity, deleteProduct, increaseQuantity } from "../../store/slices/cart/cartSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import PlusOneIcon from '@mui/icons-material/PlusOne';

const CartList = (props) => {
  const { openCartList, toggleCartList } = props;

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  console.log(cartItems, "cartItems");

  return (
    <>
      <Drawer anchor="right" open={openCartList} onClose={toggleCartList(false)}>
        <Box sx={{ width: "500px" }}>
          <Typography className="m-2">Cart Items</Typography>
          {cartItems?.map((item) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  marginTop: 3,
                  padding: 3,
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <img
                    className="img-fluid"
                    width={70}
                    src={item?.image}
                    alt={item?.title}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    className="text-primary"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {item?.category}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Tooltip title={item?.title} placement="top">
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#333",
                          cursor: "pointer",
                        }}
                      >
                        {item?.title?.length >= 20
                          ? `${item?.title.slice(0, 20)}...`
                          : item?.title}
                      </Typography>
                    </Tooltip>
                    <Box sx={{ display: "flex", gap: 1}}>
                      <Button onClick={()=>dispatch(increaseQuantity(item))} size="small" variant="outlined" color="primary">
                      <PlusOneIcon/>
                      </Button>
                      <Button className="fw-bold" onClick={()=>dispatch(decreaseQuantity(item))} size="small" variant="outlined" color="error">
                        -1
                      </Button>
                    </Box>
                  </Box>
                  <Rating
                    name="read-only"
                    value={Math.round(item?.rating?.rate)}
                    readOnly
                  />
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ${item?.price}{" "}
                      <span style={{ fontSize: "16px" }}>
                        Qty: {item.quantity}
                      </span>
                    </Typography>
                      <Button onClick={()=>dispatch(deleteProduct(item))} size="small" variant="text" color="error">
                      <DeleteIcon/>
                      </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </>
  );
};

export default CartList;
