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
import { Badge, Menu, MenuItem, Tooltip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, NavLink, Outlet } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartList from "../../Components/cart-list/CartList";
import { useSelector } from "react-redux";
const productsData = [];

const drawerWidth = 240;
const navItems = [ 
  { id: 1, navItem: "Home", navLink: "/" },
  { id: 2, navItem: "About", navLink: "/about" },
  { id: 3, navItem: "Contact", navLink: "/contact" },
];

function AppLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [openCartList, setOpenCartList] = React.useState(false);
  const toggleCartList = (newOpen) => () => {
    setOpenCartList(newOpen);
  };

  const { cartItems } = useSelector((state) => state.cart);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        E-Store
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item?.id} to={item?.navLink}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item?.navItem} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Tooltip title="Add to Cart">
            <Badge badgeContent={cartItems?.length} color="secondary">
              <ShoppingCartIcon
                sx={{ cursor: "pointer" }}
                onClick={toggleCartList(true)}
                className="text-primary"
              />
            </Badge>
          </Tooltip>
          <Button>
            <AccountCircleIcon />
          </Button>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>
            <Link className="text-decoration-none text-dark" to="/sign-up">
              My Account
            </Link>
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
            E-Store
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link key={item?.id} to={item?.navLink}>
              <Button sx={{ color: "#fff" }}>
                {item?.navItem}
              </Button>
              </Link>
            ))}

            <Tooltip title="Add to Cart">
              <Badge badgeContent={cartItems?.length} color="secondary">
                <ShoppingCartIcon
                  sx={{ cursor: "pointer" }}
                  onClick={toggleCartList(true)}
                  className="text-white"
                />
              </Badge>
            </Tooltip>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Button className="text-white">
                <AccountCircleIcon />
              </Button>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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
            keepMounted: true,
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
        <Outlet />
      </Box>
      <CartList openCartList={openCartList} toggleCartList={toggleCartList} />
    </Box>
  );
}

export default AppLayout;
