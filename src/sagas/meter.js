import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as smartMeterAction from "@/src/actions/meter";

function* getSmartMeterListingRequest({}) {
  try {
    const response = yield call(api.getListing);

    const { data, code, message } = response.data;

    yield put(smartMeterAction.getSmartMeterListingSuccess(data));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      smartMeterAction.getSmartMeterListingFailure,
    );
  }
}

function* getSmartMeterOverviewRequest({ id }) {
  try {
    const response = yield call(api.getBookingOverview, id);

    const { data, code, message } = response.data;

    yield put(smartMeterAction.getSmartMeterOverviewSuccess(id, data));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      smartMeterAction.getSmartMeterOverviewFailure,
    );
  }
}

function* SmartMeterSaga() {
  yield all([
    takeLatest("GET_SMART_METER_LISTING_REQUEST", getSmartMeterListingRequest),
    takeLatest(
      "GET_SMART_METER_OVERVIEW_REQUEST",
      getSmartMeterOverviewRequest,
    ),
  ]);
}

export default SmartMeterSaga;
