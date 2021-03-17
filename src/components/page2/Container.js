import React from "react";
import { useSelector } from "react-redux";
import Stores from "./Stores";
import { Typography } from "@material-ui/core";
// import { lodash } from "lodash";
var _ = require("lodash");
export default function Container() {
  const myArchive = useSelector((state) => state.myArchive);
  const myItems = useSelector((state) => state.myItems);

  const allItems = [...myArchive, ...myItems];
  const result = _(allItems)
    .groupBy("store")
    .map((v, k) => ({
      store: k,
      history: v,
    }))
    .value();

  return (
    <div
      style={{
        padding: "2%",
      }}>
      <Typography variant='h2' style={{ margin: "5px" }}>
        Stores
      </Typography>
      <Stores data={result} style={{}} />
    </div>
  );
}
