import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  reducerSearch,
  ReducerAddres,
  ReducerClass,
  reducerProcessId,
} from "./Reducer";
import thunk from "redux-thunk";

const allReducers = combineReducers({
  search: reducerSearch,
  processId: reducerProcessId,
  addres: ReducerAddres,
  dataKelas: ReducerClass,
});

export const store = createStore(allReducers, applyMiddleware(thunk));
