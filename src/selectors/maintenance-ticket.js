import { get } from "lodash";

export const getRequestType = (state) => get(state, ["request_type"], []);
export const getTenancyOptions = (state) => get(state, ["tenancy_options"], []);
export const getRequestTypeSubType = (state) => get(state, ["sub_types"], []);
export const getLabel = (state) => get(state, ["label"], []);
export const getValue = (state) => get(state, ["value"], []);
