import { all } from "redux-saga/effects";
import verificationSaga from "@/src/sagas/verification";
import authSaga from "@/src/sagas/auth";
import listingSage from "@/src/sagas/listing";

export default function* rootSaga() {
  yield all([verificationSaga(), authSaga(), listingSage()]);
}
