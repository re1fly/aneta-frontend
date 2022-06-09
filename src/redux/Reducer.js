const searchReduce = {
  DataSearch: '',
};

const filterReduce = {
  DataFilter: '',
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

export const reducerFilter = (state = filterReduce, action) => {
  if (action.type === "FILTER_GLOBAL") {
    return {
      ...state,
      DataPaginate: action.value,
    };
  }

  return state;
};
