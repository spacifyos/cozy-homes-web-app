import { combineReducers } from "redux";
import verification from "@/src/reducers/verification";
import auth from "@/src/reducers/auth";
import listing from "@/src/reducers/listing";
import tenancyListing from "@/src/reducers/tenancy";

export const rootReducers = combineReducers({
  auth,
  verification,
  listing,
  tenancyListing,
});
