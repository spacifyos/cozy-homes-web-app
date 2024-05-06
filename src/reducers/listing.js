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
  },
  listingPropertyDetail: {
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
          data: action.data,
          loading: false,
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

    default:
      return state;
  }
}
