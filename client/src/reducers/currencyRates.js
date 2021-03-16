const currencyReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_RATES":
      return action.payload;

    default:
      return state;
  }
};
export default currencyReducer;
