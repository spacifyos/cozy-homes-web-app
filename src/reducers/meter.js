import _ from "lodash";

const initialState = {
  meterListing: {
    data: null,
    loading: false,
    pagination: null,
  },
  meterOverview: {
    data: null,
    loading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_METER_LISTING_REQUEST":
      return {
        ...state,
        meterListing: {
          loading: true,
        },
      };
    case "GET_METER_LISTING_SUCCESS":
      return {
        ...state,
        meterListing: {
          data: _.get(action, ["data", "data"], null),
          loading: false,
          pagination: _.get(action, ["data", "pagination"], null),
        },
      };
    case "GET_METER_LISTING_FAILURE":
      return {
        ...state,
        meterListing: {
          loading: false,
        },
      };

    case "GET_METER_OVERVIEW_REQUEST":
      return {
        ...state,
        meterOverview: {
          loading: true,
        },
      };
    case "GET_METER_OVERVIEW_SUCCESS":
      return {
        ...state,
        meterOverview: {
          [action.id]: { data: action.data },
          loading: false,
        },
      };
    case "GET_METER_OVERVIEW_FAILURE":
      return {
        ...state,
        meterOverview: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
