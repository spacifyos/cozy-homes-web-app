const initialState = {
  tenancyListing: {
    data: null,
    loading: false,
  },
  tenancyOverview: {
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

    case "GET_TENANCY_OVERVIEW_REQUEST":
      return {
        ...state,
        tenancyOverview: {
          loading: true,
        },
      };
    case "GET_TENANCY_OVERVIEW_SUCCESS":
      return {
        ...state,
        tenancyOverview: {
          [action.id]: { data: action.data },
          loading: false,
        },
      };
    case "GET_TENANCY_OVERVIEW_FAILURE":
      return {
        ...state,
        tenancyOverview: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
