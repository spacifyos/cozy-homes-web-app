import { get, concat, isEmpty } from "lodash";

const initialState = {
  agreementListing: {
    data: null,
    loading: false,
  },
  agreementOverview: {
    data: null,
    loading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_AGREEMENT_LISTING_REQUEST":
      return {
        ...state,
        agreementListing: {
          [action.status]: {
            ...state.agreementListing[action.status],
            loading: true,
          },
        },
      };
    case "GET_AGREEMENT_LISTING_SUCCESS":
      const { agreementListing } = state;

      const currentListItem = get(
        agreementListing,
        [action.status, "data"],
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
        agreementListing: {
          [action.status]: {
            data: combinedListItems,
            loading: false,
            pagination: pagination,
          },
        },
      };
    case "GET_AGREEMENT_LISTING_FAILURE":
      return {
        ...state,
        agreementListing: {
          loading: false,
        },
      };

    case "GET_AGREEMENT_OVERVIEW_REQUEST":
      return {
        ...state,
        agreementOverview: {
          loading: true,
        },
      };
    case "GET_AGREEMENT_OVERVIEW_SUCCESS":
      return {
        ...state,
        agreementOverview: {
          [action.id]: { data: action.data },
          loading: false,
        },
      };
    case "GET_AGREEMENT_OVERVIEW_FAILURE":
      return {
        ...state,
        agreementOverview: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
