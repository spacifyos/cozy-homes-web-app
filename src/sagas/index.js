import { all } from "redux-saga/effects";
import authSaga from "@/src/sagas/auth";
import listingSage from "@/src/sagas/listing";
import commonSaga from "@/src/sagas/common";
import tenancySaga from "@/src/sagas/tenancy";
import invoiceSaga from "@/src/sagas/invoice";
import meterSaga from "@/src/sagas/meter";
import agreementSaga from "@/src/sagas/agreement";

export default function* rootSaga() {
  yield all([
    authSaga(),
    listingSage(),
    commonSaga(),
    tenancySaga(),
    invoiceSaga(),
    meterSaga(),
    agreementSaga(),
  ]);
}
