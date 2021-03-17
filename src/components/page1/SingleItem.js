import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRates } from "../../actions";

export default function SingleItem() {
  const rate = useSelector((state) => state.currencyRates);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>rat {rate}</h1>
      <button
        onClick={() => {
          dispatch(updateRates(3.18));
        }}>
        change
      </button>
    </div>
  );
}
