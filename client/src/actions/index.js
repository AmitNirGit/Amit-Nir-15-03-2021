export const updateRates = (rate) => {
  return {
    type: "UPDATE_RATES",
    payload: rate,
  };
};

export const changePickedCurrency = (curr) => {
  return {
    type: "CHANGE_CURRENCY",
    payload: curr,
  };
};
