import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  reducerSearch,
  reducerProcessId,
  ReducerAddres,
  ReducerClass,
  ReducerClassMateri,
  ReducerPertemuanMateri,
  ReducerIdjam,
  ReducerPertemuanTugas,
  ReducerDateTime,
  ReducerPathJadwalGuru,
  ReducerPathKalenderGuru,
  ReducerPathNilaiGuru,
  ReducerPathKalenderSiswa,
  ReducerJadwalPelajaranDetail,
} from "./Reducer";
import thunk from "redux-thunk";

const allReducers = combineReducers({
  search: reducerSearch,
  processId: reducerProcessId,
  addres: ReducerAddres,
  dataKelas: ReducerClass,
  classMateri: ReducerClassMateri,
  pertemuanMateri: ReducerPertemuanMateri,
  pertemuanTugas: ReducerPertemuanTugas,
  dataIdJam: ReducerIdjam,
  dataDateTime: ReducerDateTime,
  dataPathJadwalGuru: ReducerPathJadwalGuru,
  dataPathKalenderGuru: ReducerPathKalenderGuru,
  dataPathNilaiGuru: ReducerPathNilaiGuru,
  dataPathKalenderSiswa: ReducerPathKalenderSiswa,
  dataJadwalDetail: ReducerJadwalPelajaranDetail,
});

export const store = createStore(allReducers, applyMiddleware(thunk));
