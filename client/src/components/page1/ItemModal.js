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

export default function ItemModal({ closeModal }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setselectedProduct] = useState({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const currenctyRate = useSelector((state) => state.pickedCurrency);

  const getProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    const labeledProducts = data.map((prod) => {
      return { value: prod, label: prod.title };
    });
    setProducts(labeledProducts);
  };

  //change handler of item picker
  const onChange = (product) => {
    //self added items
    if (product && product.__isNew__) {
      setTitle(product.value);
      //fixed items
    } else if (product) {
      setselectedProduct(product.value);
      setTitle(product.value.title);
      setPrice(
        (Math.round(product.value.price * currenctyRate * 100) / 100).toFixed(2)
      );
      //clear
    } else {
      setselectedProduct("");
      setPrice("");
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addProduct = async () => {
    try {
      const newProduct = { title, price, store, selectedDate };
      //todo add to my items
      Swal.fire("Success", "Item Added :)", "success")
        .then
        //todo reload
        ();
      //todo reload^^
      // updateLocal((prev: INotice[]) => prev?.concat(data));
    } catch (error) {
      Swal.fire("Error Occurred", error.message, "error");
    } finally {
      closeModal();
    }
  };

  //fetch products from api
  useEffect(() => {
    getProducts();
  }, []);

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
