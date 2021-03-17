import currencyReducer from "./currencyRates";
import archiveReducer from "./myArchive";
import itemsReducer from "./myItems";
import pickedCurrencyReducer from "./pickedCurrency";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  currencyRates: currencyReducer,
  myArchive: archiveReducer,
  myItems: itemsReducer,
  pickedCurrency: pickedCurrencyReducer,
});

export default allReducers;
