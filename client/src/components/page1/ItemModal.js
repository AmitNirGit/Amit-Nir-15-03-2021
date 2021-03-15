import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default function ItemModal({ closeModal }) {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");

  const getProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = async () => {
    try {
      //todo add to my cart
      Swal.fire("Success", "Notice Added :)", "success")
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
    <div id='add-item' style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        style={{ padding: "5px", marginBottom: "10px" }}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        id='outlined-multiline-static'
        label='product'
        multiline
        rows={2}
        variant='outlined'
      />
      <TextField
        style={{ padding: "5px", marginBottom: "10px" }}
        onChange={(e) => {
          setStore(e.target.value);
        }}
        id='outlined-multiline-static'
        label='store'
        multiline
        rows={2}
        variant='outlined'
      />
      <TextField
        style={{ padding: "5px", marginBottom: "10px" }}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        id='outlined-multiline-static'
        label='price'
        multiline
        rows={2}
        variant='outlined'
      />
      <MuiPickersUtilsProvider>
        <KeyboardDatePicker
          // className={classes.formControl}
          label='Deadline'
          // disableToolbar
          minDate={new Date()}
          variant='inline'
          format='dd/MM/yyyy'
          margin='normal'
          id='date-picker-inline'
          inputVariant='outlined'
          // value={task.endDate}
          // onChange={(e) => handleChange("endDate", index, e)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <Button variant='outlined' color='inherit' onClick={addProduct}>
        add Product
      </Button>
    </div>
  );
}
