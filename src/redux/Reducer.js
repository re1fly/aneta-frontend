const searchReduce = {
  DataSearch: '',
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
