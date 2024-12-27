export const getMaintenanceTicketListingRequest = (perPage, page, status) => ({
  type: "GET_MAINTENANCE_TICKET_LISTING_REQUEST",
  perPage,
  page,
  status,
});

export const getMaintenanceTicketListingSuccess = (data, status) => ({
  type: "GET_MAINTENANCE_TICKET_LISTING_SUCCESS",
  data,
  status,
});

export const getMaintenanceTicketListingFailure = (messages) => ({
  type: "GET_MAINTENANCE_TICKET_LISTING_FAILURE",
  messages,
});

export const getMaintenanceTicketOverviewRequest = (id) => ({
  type: "GET_MAINTENANCE_TICKET_OVERVIEW_REQUEST",
  id,
});

export const getMaintenanceTicketOverviewSuccess = (id, data) => ({
  type: "GET_MAINTENANCE_TICKET_OVERVIEW_SUCCESS",
  id,
  data,
});

export const getMaintenanceTicketOverviewFailure = (messages) => ({
  type: "GET_MAINTENANCE_TICKET_OVERVIEW_FAILURE",
  messages,
});
