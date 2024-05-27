const initialState = {
  userProfile: {
    data: null,
    loading: false,
  },
  signUpRequest: {
    data: null,
    loading: false,
    status: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_USER_PROFILE_REQUEST":
      return {
        ...state,
        userProfile: {
          loading: true,
        },
      };
    case "GET_USER_PROFILE_SUCCESS":
      return {
        ...state,
        userProfile: {
          data: action.data,
          loading: false,
        },
      };
    case "GET_USER_PROFILE_FAILURE":
      return {
        ...state,
        userProfile: {
          loading: false,
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
