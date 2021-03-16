import React from "react";
import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";

export default function Archive() {
  const myArchive = useSelector((state) => state.myArchive);
  console.log(myArchive);
  return (
    <div>
      <Table mainPage='archive' data={myArchive} />
    </div>
  );
}
