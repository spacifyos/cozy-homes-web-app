import { combineReducers } from "redux";
import verification from "@/src/reducers/verification";
import auth from "@/src/reducers/auth";
import listing from "@/src/reducers/listing";
import tenancy from "@/src/reducers/tenancy";
import invoice from "@/src/reducers/invoice";
import meter from "@/src/reducers/meter";
import common from "@/src/reducers/common";
import agreement from "@/src/reducers/agreement";

export const rootReducers = combineReducers({
  common,
  auth,
  verification,
  listing,
  tenancy,
  invoice,
  meter,
  agreement,
});
