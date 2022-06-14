import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const LinksMid = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const LinksRight = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const NavbarStyle = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "black",
  },
};

export default function Header() {
  return (
    <AppBar position="sticky" sx={{}}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography component={NavLink} to="/" sx={NavbarStyle}>
            Sports Store
          </Typography>
        </Box>

        <List sx={{ display: "flex" }}>
          {LinksMid.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={NavbarStyle}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box display="flex" alignItems="center">
          <IconButton>
            <Badge badgeContent={1} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {LinksRight.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={NavbarStyle}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
