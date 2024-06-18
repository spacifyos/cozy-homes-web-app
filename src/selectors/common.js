import _ from "lodash";

export const getSelectOptionData = (state) =>
  _.get(state, ["common", "selectOption", "data"], null);
export const getSelectOptionDateLoading = (state) =>
  _.get(state, ["common", "selectOption", "loading"], false);

export const getCountry = (state) => _.get(state, ["country"], []);
export const getGender = (state) => _.get(state, ["gender"], []);
export const getIdType = (state) => _.get(state, ["id_type"], []);
export const getPhonePrefix = (state) => _.get(state, ["phone_prefix"], []);
export const getRace = (state) => _.get(state, ["race"], []);
export const getState = (state) => _.get(state, ["state"], []);
export const getNationality = (state) => _.get(state, ["nationality"], []);
