const initialState = {
  tenancyListing: {
    data: null,
    loading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_TENANCY_LISTING_REQUEST":
      return {
        ...state,
        tenancyListing: {
          loading: true,
        },
      };
    case "GET_TENANCY_LISTING_SUCCESS":
      return {
        ...state,
        tenancyListing: {
          data: action.data,
          loading: false,
        },
      };
    case "GET_TENANCY_LISTING_FAILURE":
      return {
        ...state,
        tenancyListing: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
