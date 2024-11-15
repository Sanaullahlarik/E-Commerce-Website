import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import productImage1 from "./../../Assets/product-img-1.jpg";
import productImage2 from "./../../Assets/product-img-2.jpg";
import productImage3 from "./../../Assets/product-img-3.jpg";
import productImage4 from "./../../Assets/product-img-4.jpg";
import productImage5 from "./../../Assets/product-img-5.jpg";
import productImage6 from "./../../Assets/product-img-6.jpg";
import { Card, Menu, MenuItem, Rating } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const productsData = [
  {
    id: 1,
    image: productImage1,
    Name: "Haldiram's Sev Bhujia",
    Category: "Snack & Munchies",
    Price: "18",
    rating: "3",
  },
  {
    id: 2,
    image: productImage2,
    Name: "NutriChoice Digestive",
    Category: "Bakery & Biscuits",
    Price: "24",
    rating: "4",
  },
  {
    id: 3,
    image: productImage3,
    Name: "Cadbury 5 Star Chocolate",
    Category: "Bakery & Biscuits",
    Price: "32",
    rating: "4",
  },
  {
    id: 4,
    image: productImage4,
    Name: "Onion Flavour Potato",
    Category: "Snack & Munchies",
    Price: "3",
    rating: "5",
  },
  {
    id: 5,
    image: productImage5,
    Name: "Salted Instant Popcorn",
    Category: "Instant Food",
    Price: "13",
    rating: "5",
  },
  {
    id: 6,
    image: productImage6,
    Name: "Blueberry Greek Yogurt",
    Category: "Dairy, Bread & Eggs",
    Price: "18",
    rating: "5",
  },
];

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function AppLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        E-store
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (

          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Button><AccountCircleIcon /></Button>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>
        <Link className="text-decoration-none text-dark" to="/sign-up">My Account</Link>
        </MenuItem>
      </Menu>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            E-store
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Button className="text-white"><AccountCircleIcon /></Button>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" className="mt-3 px-3 w-100">
        <Toolbar />
        <Box
          className="d-flex flex-wrap justify-content-center gap-2"
          sx={{ maxWidth: "100%", margin: "0 auto",}}
        >
          {productsData.map((product, index) => (
            <Card
              key={index}
              className="p-3 card"
              style={{ width: "250px", margin: "10px" }}
            >
              <img
                className="card-image"
                src={product.image}
                alt="Product img"
              />
              <Typography variant="body2" className="mt-3">{product.Category}</Typography>
              <Typography variant="body1">{product.Name}</Typography>
              <Rating name="read-only" value={product.rating} readOnly />
              <Box className="d-flex justify-content-between align-items-center">
                <Typography>${product.Price}</Typography>
                <Button size="small" variant="contained">
                  <AddIcon /> ADD
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
