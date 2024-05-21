const initialState = {
  signInRequest: {
    token: null,
    loading: false,
    status: false,
  },
  signUpRequest: {
    data: null,
    loading: false,
    status: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN_ACCOUNT_REQUEST":
      return {
        ...state,
        signInRequest: {
          loading: true,
          status: false,
        },
      };
    case "SIGN_IN_ACCOUNT_SUCCESS":
      return {
        ...state,
        signInRequest: {
          token: action.token,
          loading: false,
          status: true,
        },
      };
    case "SIGN_IN_ACCOUNT_FAILURE":
      return {
        ...state,
        signInRequest: {
          loading: false,
          status: false,
        },
      };

    case "SIGN_UP_ACCOUNT_REQUEST":
      return {
        ...state,
        signUpRequest: {
          loading: true,
          status: false,
        },
      };
    case "SIGN_UP_ACCOUNT_SUCCESS":
      return {
        ...state,
        signUpRequest: {
          token: action.token,
          loading: false,
          status: true,
        },
      };
    case "SIGN_UP_ACCOUNT_FAILURE":
      return {
        ...state,
        signUpRequest: {
          loading: false,
          status: false,
        },
      };
    case "SAVE_AUTH":
      return {
        ...state,
        data: "ssssss",
      };
    default:
      return state;
  }
}
