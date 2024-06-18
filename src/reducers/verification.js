const initialState = {
  requestVerification: {
    data: null,
    loading: false,
    status: false,
  },
  verifyCode: {
    data: null,
    loading: false,
    status: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "POST_REQUEST_PHONE_VERIFICATION_CODE_REQUEST":
      return {
        ...state,
        requestVerification: {
          loading: true,
          status: false,
        },
      };
    case "POST_REQUEST_PHONE_VERIFICATION_CODE_SUCCESS":
      return {
        ...state,
        requestVerification: {
          data: action.item,
          loading: false,
          status: true,
        },
      };
    case "POST_REQUEST_PHONE_VERIFICATION_CODE_FAILURE":
      return {
        ...state,
        requestVerification: {
          loading: false,
          status: false,
        },
      };

    case "VERIFY_PHONE_VERIFICATION_CODE_REQUEST":
      return {
        ...state,
        verifyCode: {
          loading: true,
          status: false,
        },
      };
    case "VERIFY_PHONE_VERIFICATION_CODE_SUCCESS":
      return {
        ...state,
        verifyCode: {
          data: action.item,
          loading: false,
          status: true,
        },
      };
    case "VERIFY_PHONE_VERIFICATION_CODE_FAILURE":
      return {
        ...state,
        verifyCode: {
          loading: false,
          status: false,
        },
      };

    default:
      return state;
  }
}
