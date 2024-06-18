const initialState = {
  selectOption: {
    data: null,
    loading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_SELECT_OPTION_REQUEST":
      return {
        ...state,
        selectOption: {
          loading: true,
        },
      };
    case "GET_SELECT_OPTION_SUCCESS":
      return {
        ...state,
        selectOption: {
          data: action.data,
          loading: false,
        },
      };
    case "GET_SELECT_OPTION_FAILURE":
      return {
        ...state,
        selectOption: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
