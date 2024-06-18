const initialState = {
  smartMeterListing: {
    data: null,
    loading: false,
  },
  smartMeterOverview: {
    data: null,
    loading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_SMART_METER_LISTING_REQUEST":
      return {
        ...state,
        smartMeterListing: {
          loading: true,
        },
      };
    case "GET_SMART_METER_LISTING_SUCCESS":
      return {
        ...state,
        smartMeterListing: {
          data: action.data,
          loading: false,
        },
      };
    case "GET_SMART_METER_LISTING_FAILURE":
      return {
        ...state,
        smartMeterListing: {
          loading: false,
        },
      };

    case "GET_SMART_METER_OVERVIEW_REQUEST":
      return {
        ...state,
        smartMeterOverview: {
          loading: true,
        },
      };
    case "GET_SMART_METER_OVERVIEW_SUCCESS":
      return {
        ...state,
        smartMeterOverview: {
          [action.id]: { data: action.data },
          loading: false,
        },
      };
    case "GET_SMART_METER_OVERVIEW_FAILURE":
      return {
        ...state,
        smartMeterOverview: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
