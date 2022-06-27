const searchReduce = {
  DataSearch: "",
};

const AddresReducer = {
  DataProvinsi: [],
  DataCity: [],
  DataKecamatan: [],
  DataKelurahan: [],
};

const ClassReducer = {
  AllClass: [],
};

const processReduce = {
  DataProcess: "",
  DataClass: [],
};

export const reducerSearch = (state = searchReduce, action) => {
  if (action.type === "SEARCH_GLOBAL") {
    return {
      ...state,
      DataSearch: action.value,
    };
  }

  return state;
};

export const reducerProcessId = (state = processReduce, action) => {
  if (action.type === "GET_PROCESSID") {
    return {
      ...state,
      DataProcess: action.value,
    };
  }
  return state;
};

export const ReducerAddres = (state = AddresReducer, action) => {
  if (action.type === "SET_PROVINSI") {
    return {
      ...state,
      DataProvinsi: action.value,
    };
  }

  if (action.type === "SET_CITY") {
    return {
      ...state,
      DataCity: action.value,
    };
  }

  if (action.type === "SET_KECAMATAN") {
    return {
      ...state,
      DataKecamatan: action.value,
    };
  }

  if (action.type === "SET_KELURAHAN") {
    return {
      ...state,
      DataKelurahan: action.value,
    };
  }

  return state;
};

export const ReducerClass = (state = ClassReducer, action) => {
  if (action.type === "SET_CLASS") {
    return {
      ...state,
      AllClass: action.value,
    };
  }

  return state;
};
