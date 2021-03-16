import React from "react";
import { useSelector } from "react-redux";
import Stores from "./Stores";
export default function Container() {
  const myArchive = useSelector((state) => state.myArchive);
  const myItems = useSelector((state) => state.myItems);

  const allItems = [...myArchive, ...myItems];
  console.log(allItems);

  return (
    <div>
      <Stores />
    </div>
  );
}
