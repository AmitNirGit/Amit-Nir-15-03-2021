import React from "react";
import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";

export default function Archive() {
  const myArchive = useSelector((state) => state.myArchive);
  myArchive.sort((a, b) => a.deliveryDate.getTime() - b.deliveryDate.getTime());

  return (
    <div>
      <Typography variant='h2' style={{ margin: "5px" }}>
        Archive
      </Typography>
      <Table mainPage='archive' data={myArchive} />
    </div>
  );
}
