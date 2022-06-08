import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducerSearch} from "./Reducer";
import thunk from "redux-thunk";

const allReducers = combineReducers({
  search: reducerSearch,
});

export const store = createStore(allReducers,applyMiddleware(thunk));
