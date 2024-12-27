import { get } from "lodash";

export const getMaintenanceTicketListingData = (state, status) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketListing", status, "data"],
    null,
  );
export const getMaintenanceTicketListingPagination = (state, status) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketListing", status, "pagination"],
    null,
  );
export const getMaintenanceTicketListingLoading = (state, status) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketListing", status, "loading"],
    false,
  );

export const getAgreementOverviewData = (state, id) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketOverview", id, "data"],
    null,
  );
export const getAgreementOverviewLoading = (state) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketOverview", "loading"],
    false,
  );

export const getRequestType = (state) => get(state, ["request_type"], []);
export const getTenancyOptions = (state) => get(state, ["tenancy_options"], []);
export const getRequestTypeSubType = (state) => get(state, ["sub_types"], []);
export const getLabel = (state) => get(state, ["label"], []);
export const getValue = (state) => get(state, ["value"], []);
export const getCreatedAt = (state) => get(state, ["created_at"], "");
export const getId = (state) => get(state, ["id"], "");
export const getPriority = (state) => get(state, ["priority"], "");
export const getPriorityValue = (state) => get(state, ["priority_value"], "");
export const getPropertyUnitName = (state) =>
  get(state, ["property_unit_name"], "");
export const getRequestInfo = (state) => get(state, ["request_info"], "");
export const getRequestNumber = (state) => get(state, ["request_number"], "");
export const getRoomName = (state) => get(state, ["room_name"], "");
export const getStatus = (state) => get(state, ["status"], "");
export const getStatusValue = (state) => get(state, ["status_value"], "");
export const getHasMorePages = (state) => get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => get(state, ["total"], 1);
export const getCurrentPage = (state) => get(state, ["current_page"], 1);
export const getLastPage = (state) => get(state, ["last_page"], 1);
