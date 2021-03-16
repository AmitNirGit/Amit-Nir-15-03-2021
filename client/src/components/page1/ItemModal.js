import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Typography } from "@material-ui/core";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import DateFnsUtils from "@date-io/date-fns";

export default function ItemModal({ closeModal }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setselectedProduct] = useState({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const getProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    const labeledProducts = data.map((prod) => {
      return { value: prod, label: prod.title };
    });
    setProducts(labeledProducts);
  };

  const onChange = (product) => {
    // console.log(product.__isNew__);
    if (product && product.__isNew__) {
      console.log("new");
      setTitle(product.value);
    } else if (product) {
      console.log("fixed");
      setselectedProduct(product.value);
      setTitle(product.value.title);
      setPrice(product.value.price);
    } else {
      console.log("clear");
      setselectedProduct("");
      setPrice("");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addProduct = async () => {
    try {
      //todo add to my cart
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
        label='price'
        multiline
        rows={1}
        // variant='outlined'
        value={price}
        disabled={selectedProduct.price ? true : false}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-inline'
          label='Date picker inline'
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <Button
        style={{ margin: "auto", marginBottom: "0px" }}
        variant='outlined'
        color='inherit'
        onClick={addProduct}>
        add Product
      </Button>
    </div>
  );
}
