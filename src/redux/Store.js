import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducerSearch, reducerFilter} from "./Reducer";
import thunk from "redux-thunk";

const allReducers = combineReducers({
  search: reducerSearch,
  filter: reducerFilter,
});

export const store = createStore(allReducers,applyMiddleware(thunk));