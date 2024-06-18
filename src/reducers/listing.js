import _ from "lodash";

const initialState = {
  listing: {
    data: null,
    loading: false,
  },
  listingBanner: {
    data: null,
    loading: false,
  },
  listingTagOption: {
    data: null,
    loading: false,
  },
  listingProperty: {
    data: null,
    loading: false,
    pagination: null,
  },
  listingPropertyDetail: {
    data: null,
    loading: false,
  },
  listingCancellation: {
    data: null,
    loading: false,
  },
  bookingOverview: {
    data: null,
    loading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_LISTING_REQUEST":
      return {
        ...state,
        listing: {
          loading: true,
        },
      };
    case "GET_LISTING_SUCCESS":
      return {
        ...state,
        listing: {
          data: action.data,
          loading: false,
        },
      };
    case "GET_LISTING_FAILURE":
      return {
        ...state,
        listing: {
          loading: false,
        },
      };

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

    case "GET_LISTING_TAG_OPTION_REQUEST":
      return {
        ...state,
        listingTagOption: {
          loading: true,
        },
      };
    case "GET_LISTING_TAG_OPTION_SUCCESS":
      return {
        ...state,
        listingTagOption: {
          data: action.data,
          loading: false,
        },
      };
    case "GET_LISTING_TAG_OPTION_FAILURE":
      return {
        ...state,
        listingTagOption: {
          loading: false,
        },
      };

    case "GET_LISTING_PROPERTY_REQUEST":
      return {
        ...state,
        listingProperty: {
          loading: true,
        },
      };
    case "GET_LISTING_PROPERTY_SUCCESS":
      return {
        ...state,
        listingProperty: {
          data: _.get(action, ["data", "data"], null),
          loading: false,
          pagination: _.get(action, ["data", "pagination"], null),
        },
      };
    case "GET_LISTING_PROPERTY_FAILURE":
      return {
        ...state,
        listingProperty: {
          loading: false,
        },
      };

    case "GET_LISTING_PROPERTY_DETAIL_REQUEST":
      return {
        ...state,
        listingPropertyDetail: {
          loading: true,
        },
      };
    case "GET_LISTING_PROPERTY_DETAIL_SUCCESS":
      return {
        ...state,
        listingPropertyDetail: {
          [action.id]: { data: action.data },
          loading: false,
        },
      };
    case "GET_LISTING_PROPERTY_DETAIL_FAILURE":
      return {
        ...state,
        listingPropertyDetail: {
          loading: false,
        },
      };

    case "GET_LISTING_CANCELLATION_REQUEST":
      return {
        ...state,
        listingCancellation: {
          loading: true,
        },
      };
    case "GET_LISTING_CANCELLATION_SUCCESS":
      return {
        ...state,
        listingCancellation: {
          data: action.data,
          loading: false,
        },
      };
    case "GET_LISTING_CANCELLATION_FAILURE":
      return {
        ...state,
        listingCancellation: {
          loading: false,
        },
      };

    case "GET_BOOKING_OVERVIEW_REQUEST":
      return {
        ...state,
        bookingOverview: {
          loading: true,
        },
      };
    case "GET_BOOKING_OVERVIEW_SUCCESS":
      return {
        ...state,
        bookingOverview: {
          [action.id]: { data: action.data },
          loading: false,
        },
      };
    case "GET_BOOKING_OVERVIEW_FAILURE":
      return {
        ...state,
        bookingOverview: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
