const pickedCurrencyReducer = (state = 1, action) => {
  switch (action.type) {
    case "CHANGE_CURRENCY":
      return action.payload;

    default:
      return state;
  }
};
export default pickedCurrencyReducer;
