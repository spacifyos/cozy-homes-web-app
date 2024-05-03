import { combineReducers } from "redux";
import verification from "@/src/reducers/verification";
import auth from "@/src/reducers/auth";
import listing from "@/src/reducers/listing";

export const rootReducers = combineReducers({
  auth,
  verification,
  listing,
});
