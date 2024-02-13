const initialState = {
  loginRequest: {
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
    case "LOGIN_ACCOUNT_REQUEST":
      return {
        ...state,
        loginRequest: {
          loading: true,
          status: false,
        },
      };
    case "LOGIN_ACCOUNT_SUCCESS":
      return {
        ...state,
        loginRequest: {
          token: action.token,
          loading: false,
          status: true,
        },
      };
    case "LOGIN_ACCOUNT_FAILURE":
      return {
        ...state,
        loginRequest: {
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

    default:
      return state;
  }
}
