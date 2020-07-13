import {combineReducers} from "redux";
import urlReducer from "./reducerUrl/urlReducer";

const rootReducer = combineReducers({
  reducerUrl: urlReducer,
});

export default rootReducer;