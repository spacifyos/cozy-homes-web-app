import { get } from "lodash";

export const getPropertyOption = (state) =>
  get(state, ["property_select_options"], []);
export const getUnitOption = (state) => get(state, ["units"], []);
export const getStatement = (state) => get(state, ["statement"], []);
export const getDescription = (state) => get(state, ["description"], "");
export const getPeriod = (state) => get(state, ["period"], "");
export const getPropertyUnitName = (state) =>
  get(state, ["property_unit_name"], "");
export const getUnitId = (state) => get(state, ["unit_id"], "");
