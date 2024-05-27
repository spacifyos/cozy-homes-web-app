import { combineReducers } from "redux";
import verification from "@/src/reducers/verification";
import auth from "@/src/reducers/auth";
import listing from "@/src/reducers/listing";
import tenancy from "@/src/reducers/tenancy";
import invoice from "@/src/reducers/invoice";
import meter from "@/src/reducers/meter";

export const rootReducers = combineReducers({
  auth,
  verification,
  listing,
  tenancy,
  invoice,
  meter,
});
