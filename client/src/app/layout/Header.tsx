import { AppBar, List, ListItem, Toolbar, Typography } from "@mui/material";
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

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h5">Sports Store</Typography>
        <List sx={{ display: "flex" }}>
          {LinksMid.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{ color: "inherit", typography: "h6" }}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <List sx={{ display: "flex" }}>
          {LinksRight.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{ color: "inherit", typography: "h6" }}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
}
