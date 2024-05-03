const initialState = {
  listingBanner: {
    data: null,
    loading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_LISTING_BANNER_REQUEST":
      return {
        ...state,
        listingBanner: {
          loading: true,
        },
      };
    case "GET_LISTING_BANNER_SUCCESS":
      return {
        ...state,
        listingBanner: {
          data: action.data,
          loading: false,
        },
      };
    case "GET_LISTING_BANNER_FAILURE":
      return {
        ...state,
        listingBanner: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
