import _ from "lodash";

const initialState = {
  invoiceListing: {
    data: null,
    loading: false,
  },
  invoiceOverview: {
    data: null,
    loading: false,
  },
  invoiceSummary: {
    data: null,
    loading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_INVOICE_LISTING_REQUEST":
      return {
        ...state,
        invoiceListing: {
          loading: true,
        },
      };
    case "GET_INVOICE_LISTING_SUCCESS":
      return {
        ...state,
        invoiceListing: {
          [action.paymentStatus]: {
            data: _.get(action, ["data", "data"], null),
          },
          loading: false,
          pagination: _.get(action, ["data", "pagination"], null),
        },
      };
    case "GET_INVOICE_LISTING_FAILURE":
      return {
        ...state,
        invoiceListing: {
          loading: false,
        },
      };

    case "GET_INVOICE_OVERVIEW_REQUEST":
      return {
        ...state,
        invoiceOverview: {
          loading: true,
        },
      };
    case "GET_INVOICE_OVERVIEW_SUCCESS":
      return {
        ...state,
        invoiceOverview: {
          [action.id]: { data: action.data },
          loading: false,
        },
      };
    case "GET_INVOICE_OVERVIEW_FAILURE":
      return {
        ...state,
        invoiceOverview: {
          loading: false,
        },
      };

    case "GET_INVOICE_SUMMARY_REQUEST":
      return {
        ...state,
        invoiceSummary: {
          loading: true,
        },
      };
    case "GET_INVOICE_SUMMARY_SUCCESS":
      return {
        ...state,
        invoiceSummary: {
          data: action.data,
          loading: false,
        },
      };
    case "GET_INVOICE_SUMMARY_FAILURE":
      return {
        ...state,
        invoiceSummary: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
