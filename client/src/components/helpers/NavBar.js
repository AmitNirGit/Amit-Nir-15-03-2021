import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
// import HomeIcon from "@material-ui/icons/Home";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateRates, changePickedCurrency } from "../../actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 30,
    color: "white",
  },
  selectEmpty: {
    color: "white",
    marginTop: theme.spacing(2),
  },
}));

export default function NavBar() {
  //todo make it redux
  const [pickedCurrency, setPickedCurrency] = useState(1);
  //the rate of ils agains usd
  const [currencyRates, setCurrencyRates] = useState();

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setPickedCurrency(event.target.value);
    dispatch(changePickedCurrency(event.target.value));
  };

  //fetching currency rates every 10 minutes
  const fetchCurrencyRates = async () => {
    const { data } = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=USD `
    );
    setCurrencyRates((Math.round(data.rates.ILS * 100) / 100).toFixed(2));
  };

  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  clearInterval();
  setInterval(() => {
    fetchCurrencyRates();
  }, 600000);

  const classes = useStyles();

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' style={{ marginRight: "10px" }}>
            Shopping App
          </Typography>
          <StyledLink to='/Amit-Nir-15-03-2021/'>
            <DrawerItem>Home</DrawerItem>
          </StyledLink>
          <StyledLink to='/Amit-Nir-15-03-2021/stores'>
            <DrawerItem>Stores</DrawerItem>
          </StyledLink>

          <div style={{ marginLeft: "auto", color: "white !important" }}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id='demo-simple-select-helper-label'
                style={{ color: "white" }}>
                Currency
              </InputLabel>
              <Select
                style={{ color: "white" }}
                color={"secondary"}
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={pickedCurrency}
                onChange={handleChange}>
                <MenuItem value={currencyRates}>ILS ₪</MenuItem>
                <MenuItem value={1}>USD $</MenuItem>
              </Select>
            </FormControl>
          </div>
          <FormHelperText style={{ color: "whitesmoke" }}>
            *ILS Rate {currencyRates}
          </FormHelperText>
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
