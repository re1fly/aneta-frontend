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
  SubClass: [],
};

const processReduce = {
  DataProcess: "",
  DataClass: [],
};

const ClassMateriReducer = {
  DataTingkatKelas: [],
  DataSubKelas: [],
  DataPelajaran: [],
  DataKompetensi: [],
}

const PertemuanMateriReducer = {
  DataMateri: [],
  DataTanggal: [],
  DataJam: [],
  // IdJam: [],
}

const PertemuanTugasReducer = {
  DataTugas: [],
  DataTanggal: [],
  DataJam: [],
}

const IdJamReducer = {
  IdJam: [],
}

const AllDate = {
  DateTime: [],
}

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
  if (action.type === "SET_SUBCLASS") {
    return {
      ...state,
      SubClass: action.value,
    };
  }

  return state;
};

export const ReducerClassMateri = (state = ClassMateriReducer, action) => {
  if (action.type === "SET_TINGKATCLASS") {
    return {
      ...state,
      DataTingkatKelas: action.value,
    };
  }

  if (action.type === "SET_SUBCLASS") {
    return {
      ...state,
      DataSubKelas: action.value,
    };
  }

  if (action.type === "SET_PELAJARAN") {
    return {
      ...state,
      DataPelajaran: action.value,
    };
  }

  if (action.type === "SET_KOMPETENSI") {
    return {
      ...state,
      DataKompetensi: action.value,
    };
  }

  return state;
};

export const ReducerPertemuanMateri = (state = PertemuanMateriReducer, action) => {
  if (action.type === "SET_MATERIPERTEMUAN") {
    return {
      ...state,
      DataMateri: action.value,
    };
  }

  if (action.type === "SET_MATERITANGGAL") {
    return {
      ...state,
      DataTanggal: action.value,
    };
  }

  if (action.type === "SET_MATERIJAM") {
    return {
      ...state,
      DataJam: action.value,
    };
  }

  // if (action.type === "SET_IDJAM") {
  //   return {
  //     ...state,
  //     IdJam: action.value,
  //   };
  // }

  return state;
};

export const ReducerPertemuanTugas = (state = PertemuanTugasReducer, action) => {
  if (action.type === "SET_TUGASPERTEMUAN") {
    return {
      ...state,
      DataTugas: action.value,
    };
  }

  if (action.type === "SET_TUGASTANGGAL") {
    return {
      ...state,
      DataTanggal: action.value,
    };
  }

  if (action.type === "SET_TUGASJAM") {
    return {
      ...state,
      DataJam: action.value,
    };
  }

  // if (action.type === "SET_IDJAM") {
  //   return {
  //     ...state,
  //     IdJam: action.value,
  //   };
  // }

  return state;
};

export const ReducerIdjam = (state = IdJamReducer, action) => {

  if (action.type === "SET_IDJAM") {
    return {
      ...state,
      IdJam: action.value,
    };
  }

  return state;
};

export const ReducerDateTime = (state = AllDate, action) => {
  if (action.type === "SET_DATETIME") {
    return {
      ...state,
      DateTime: action.value,
    };
  }

  return state;
};