const fakeItems = [
  {
    title: "item10",
    store: "amazon",
    priceUSD: 99.99,
    deliveryDate: new Date(),
  },
  {
    title: "item45",
    store: "barakobama",
    priceUSD: 43,
    deliveryDate: new Date(),
  },
  {
    title: "item30",
    store: "herolo",
    priceUSD: 19.9,
    deliveryDate: new Date(),
  },
  {
    title: "item21",
    store: "facebook",
    priceUSD: 25,
    deliveryDate: new Date(),
  },
];

const myItemsReducer = (state = fakeItems, action) => {
  switch (action.type) {
    case "ADD_TO_MY_ITEMS":
      return [...state, action.payload];

    case "REMOVE_FROM_MY_ITEMS":
      return state.filter((item) => item !== action.payload);

    default:
      return state;
  }
};
export default myItemsReducer;
