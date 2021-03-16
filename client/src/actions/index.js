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

export const addNewItem = (item) => {
  return {
    type: "ADD_TO_MY_ITEMS",
    payload: item,
  };
};

export const removeItem = (item) => {
  return {
    type: "REMOVE_FROM_MY_ITEMS",
    payload: item,
  };
};

export const addToArchive = (item) => {
  return {
    type: "ADD_TO_MY_ARCHIVE",
    payload: item,
  };
};

export const removeFromArchive = (item) => {
  return {
    type: "REMOVE_FROM_MY_ARCHIVE",
    payload: item,
  };
};
