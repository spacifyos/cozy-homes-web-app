import { all } from "redux-saga/effects";
import verificationSaga from "@/src/sagas/verification";
import authSaga from "@/src/sagas/auth";
import listingSage from "@/src/sagas/listing";
import commonSaga from "@/src/sagas/common";
import tenancySaga from "@/src/sagas/tenancy";
import invoiceSaga from "@/src/sagas/invoice";

export default function* rootSaga() {
  yield all([
    verificationSaga(),
    authSaga(),
    listingSage(),
    commonSaga(),
    tenancySaga(),
    invoiceSaga(),
  ]);
}
