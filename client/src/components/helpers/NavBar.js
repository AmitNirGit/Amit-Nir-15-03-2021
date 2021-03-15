import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
} from "@material-ui/core";
// import HomeIcon from "@material-ui/icons/Home";
import styled from "styled-components";

export default function NavBar() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' style={{ marginRight: "10px" }}>
            Shopping App
          </Typography>
          <StyledLink to='/'>
            <DrawerItem>Home</DrawerItem>
          </StyledLink>
          <StyledLink to='/stores'>
            <DrawerItem>Stores</DrawerItem>
          </StyledLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const DrawerItem = styled.div`
  padding: 25px;
  color: white;
  height: 100%;
  transition: 200ms;
  text-align: center;
  line-height: 100%;

  &:hover {
    color: #3f51b5;
    background-color: white;
    cursor: pointer;
  }
`;

const StyledDrawer = styled.div`
  background-color: #3f51b5;
  height: 100%;
  width: 220px;
  overflow: hidden;
`;
