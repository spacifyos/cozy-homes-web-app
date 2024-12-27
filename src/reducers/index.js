import { combineReducers } from "redux";
import auth from "@/src/reducers/auth";
import listing from "@/src/reducers/listing";
import tenancy from "@/src/reducers/tenancy";
import invoice from "@/src/reducers/invoice";
import meter from "@/src/reducers/meter";
import common from "@/src/reducers/common";
import agreement from "@/src/reducers/agreement";
import maintenanceTicket from "@/src/reducers/maintenance-ticket";

export const rootReducers = combineReducers({
  common,
  auth,
  listing,
  tenancy,
  invoice,
  meter,
  agreement,
  maintenanceTicket,
});
