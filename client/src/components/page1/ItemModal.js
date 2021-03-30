import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import CreatableSelect from "react-select/creatable";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useSelector, useDispatch } from "react-redux";
import { addNewItem } from "../../actions";
import styled from "styled-components";

export default function ItemModal({ closeModal }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const currenctyRate = useSelector((state) => state.pickedCurrency);
  const dispatch = useDispatch();

  //fetching fixed products from store
  const getProducts = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products")
        .then;
      const labeledProducts = data.map((prod) => {
        return { value: prod, label: prod.title };
      });
      setProducts(labeledProducts);
    } catch (error) {
      Swal.fire(
        "Error Occurred",
        "seems we are having a problem with our shop, sorry for the inconvenience",
        "error"
      );
      return;
    }
  };

  //on mount fetch
  useEffect(() => {
    getProducts();
  }, []);

  //change handler of item picker
  const onChange = (product) => {
    //self added items
    if (product && product.__isNew__) {
      setTitle(product.value);
      //fixed items
    } else if (product) {
      setSelectedProduct(product.value);
      setTitle(product.value.title);
      setPrice(
        (Math.round(product.value.price * currenctyRate * 100) / 100).toFixed(2)
      );
      //clear
    } else {
      setSelectedProduct("");
      setPrice("");
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //adding a new item to the list
  const addProduct = async () => {
    if (!title || !price || !store || !selectedDate) {
      Swal.fire("Error Occurred", "one or more field is missing!", "error");
      return;
    }
    try {
      const newItem = {
        title,
        priceUSD: parseInt(price),
        store,
        deliveryDate: selectedDate,
      };
      dispatch(addNewItem(newItem));
      Swal.fire("Success", "Item Added :)", "success");
      closeModal();
    } catch (error) {
      Swal.fire("Error Occurred", error.message, "error");
      closeModal();
    }
  };

  return (
    <div
      id='add-item'
      style={{
        display: "flex",
        flexDirection: "column",
        // overflow: "auto",
        minHeight: "300px",
      }}>
      <Typography variant='h5' style={{ margin: "0 auto 1em auto" }}>
        New Item
      </Typography>
      <div style={{ marginBottom: "10px" }}>
        <CreatableSelect
          // value={selectedProduct.title}
          isClearable={true}
          onChange={onChange}
          placeholder={"select or type"}
          options={products}
        />
      </div>

      <TextField
        required='true'
        style={{ padding: "5px", marginBottom: "10px" }}
        onChange={(e) => {
          setStore(e.target.value);
        }}
        id='outlined-multiline-static'
        label='store'
        multiline
        rows={1}
        // variant='outlined'
      />
      <TextField
        required='true'
        style={{ padding: "5px", marginBottom: "auto" }}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        id='outlined-multiline-static'
        label={currenctyRate > 1 ? "price in ILS ₪" : "price in USD $"}
        multiline
        rows={1}
        // variant='outlined'
        value={price}
        disabled={selectedProduct.price ? true : false}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required='true'
          // disableToolbar
          minDate={new Date()}
          variant='inline'
          format='dd/MM/yyyy'
          margin='normal'
          id='date-picker-inline'
          label='Delivery date'
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <Button
        style={{ marginTop: "10px", marginBottom: "0px" }}
        variant='outlined'
        color='inherit'
        onClick={addProduct}>
        add Product
      </Button>
    </div>
  );
}

// export const StyledSwal = styled.Swal`
//   z-index: 1000000;
// `;
