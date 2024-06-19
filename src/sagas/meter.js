import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as meterAction from "@/src/actions/meter";

function* getMeterListingRequest({ per_page, page }) {
  try {
    const response = yield call(api.getMeterListing, per_page, page);

    const { data, code, message } = response;

    yield put(meterAction.getMeterListingSuccess(data));
  } catch (error) {
    yield call(httpErrorHelpers, error, meterAction.getMeterListingFailure);
  }
}

function* getMeterOverviewRequest({ id }) {
  try {
    const response = yield call(api.getMeterOverview, id);

    const { data, code, message } = response.data;

    yield put(meterAction.getMeterOverviewSuccess(id, data));
  } catch (error) {
    yield call(httpErrorHelpers, error, meterAction.getMeterOverviewFailure);
  }
}

function* MeterSaga() {
  yield all([
    takeLatest("GET_METER_LISTING_REQUEST", getMeterListingRequest),
    takeLatest("GET_METER_OVERVIEW_REQUEST", getMeterOverviewRequest),
  ]);
}

export default MeterSaga;
