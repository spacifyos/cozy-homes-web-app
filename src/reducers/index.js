import { combineReducers } from "redux";
import verification from "@/src/reducers/verification";
import auth from "@/src/reducers/auth";

export const rootReducers = combineReducers({
  auth,
  verification,
});
