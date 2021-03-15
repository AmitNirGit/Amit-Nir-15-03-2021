import React, { useState, useEffect } from "react";
import { get, post } from "../../network";
const axios = require("axios");

export default function Home() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const { data } = await get("https://fakestoreapi.com/products");
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <div>hey im home</div>;
}
