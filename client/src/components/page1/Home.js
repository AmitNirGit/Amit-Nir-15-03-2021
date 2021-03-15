import React from "react";
const axios = require("axios");
import { get, post } from "../../network";

export default function Home() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const { data } = await get("https://fakestoreapi.com/products");
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <div></div>;
}
