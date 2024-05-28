const initialState = {
  userProfile: {
    data: null,
    loading: false,
  },
  signOutRequest: {
    loading: false,
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

    case "SIGN_OUT_ACCOUNT_REQUEST":
      return {
        ...state,
        signOutRequest: {
          loading: true,
        },
      };
    case "SIGN_OUT_ACCOUNT_SUCCESS":
      return {
        ...state,
        signOutRequest: {
          loading: false,
        },
      };
    case "SIGN_OUT_ACCOUNT_FAILURE":
      return {
        ...state,
        signOutRequest: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
