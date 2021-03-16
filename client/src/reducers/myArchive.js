const fakeArchive = [
  { title: "item1", store: "amazon", priceUSD: 10, deliveryDate: new Date() },
  { title: "item2", store: "amazon", priceUSD: 13, deliveryDate: new Date() },
  { title: "item3", store: "shein", priceUSD: 15, deliveryDate: new Date() },
  { title: "item4", store: "ebay", priceUSD: 19.99, deliveryDate: new Date() },
  {
    title: "item5",
    store: "bilabong",
    priceUSD: 19.99,
    deliveryDate: new Date(),
  },
];

const myArchiveReducer = (state = fakeArchive, action) => {
  switch (action.type) {
    case "ADD_TO_MY_ARCHIVE":
      return [...state, action.payload];

    case "REMOVE_FROM_MY_ARCHIVE":
      return state.filter((item) => item !== action.payload);

    default:
      return state;
  }
};
export default myArchiveReducer;
