import { get, concat, isEmpty } from "lodash";

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
          [action.paymentStatus]: {
            ...state.invoiceListing[action.paymentStatus],
            loading: true,
          },
        },
      };
    case "GET_INVOICE_LISTING_SUCCESS":
      const { invoiceListing } = state;

      const currentListItem = get(
        invoiceListing,
        [action.paymentStatus, "data"],
        [],
      );

      const pagination = get(action.data, ["pagination"], []);
      const currentPage = get(pagination, ["current_page"], 1);
      const listItems = get(action.data, ["data"], []);

      const combinedListItems =
        !isEmpty(listItems) && currentPage > 1
          ? concat(currentListItem, listItems)
          : listItems;

      return {
        ...state,
        invoiceListing: {
          [action.paymentStatus]: {
            data: combinedListItems,
            loading: false,
            pagination: pagination,
          },
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
