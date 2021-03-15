export const initialState = {
  items: [],
  archivedItems: [],
  currency: [],
};

const reducer = (state, action) => {
  //console.log(action);

  // action -> type, [payload]

  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.items };
    case "SET_ARCHIVEDITEMS":
      return { ...state, items: action.archivedItems };
    case "SET_CURRENCY":
      return { ...state, items: action.currency };

    default:
      return state;
  }
};

export default reducer;
