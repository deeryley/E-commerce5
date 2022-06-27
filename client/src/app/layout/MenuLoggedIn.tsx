import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { User } from "../models/user";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { signOut } from "../../features/account/AccountSlice";

export default function MenuLoggedIn() {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        {user?.email}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem onClick={() => dispatch(signOut())}>Logout</MenuItem>
      </Menu>
    </>
  );
}
