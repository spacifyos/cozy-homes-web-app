import { get, concat, isEmpty } from "lodash";

const initialState = {
  maintenanceTicketListing: {
    data: null,
    loading: false,
  },
  maintenanceTicketOverview: {
    data: null,
    loading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_MAINTENANCE_TICKET_LISTING_REQUEST":
      return {
        ...state,
        maintenanceTicketListing: {
          [action.status]: {
            ...state.maintenanceTicketListing[action.status],
            loading: true,
          },
        },
      };
    case "GET_MAINTENANCE_TICKET_LISTING_SUCCESS":
      const { maintenanceTicketListing } = state;

      const currentListItem = get(
        maintenanceTicketListing,
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
        maintenanceTicketListing: {
          [action.status]: {
            data: combinedListItems,
            loading: false,
            pagination: pagination,
          },
        },
      };
    case "GET_MAINTENANCE_TICKET_LISTING_FAILURE":
      return {
        ...state,
        maintenanceTicketListing: {
          loading: false,
        },
      };

    case "GET_MAINTENANCE_TICKET_OVERVIEW_REQUEST":
      return {
        ...state,
        maintenanceTicketOverview: {
          loading: true,
        },
      };
    case "GET_MAINTENANCE_TICKET_OVERVIEW_SUCCESS":
      return {
        ...state,
        maintenanceTicketOverview: {
          [action.id]: { data: action.data },
          loading: false,
        },
      };
    case "GET_MAINTENANCE_TICKET_OVERVIEW_FAILURE":
      return {
        ...state,
        maintenanceTicketOverview: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
