import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as tenancyAction from "@/src/actions/tenancy";

function* getTenancyListingRequest({}) {
  try {
    const response = yield call(api.getListing);

    const { data, code, message } = response.data;

    yield put(tenancyAction.getTenancyListingSuccess(data));
  } catch (error) {
    yield call(httpErrorHelpers, error, tenancyAction.getTenancyListingFailure);
  }
}

function* getTenancyOverviewRequest({ id }) {
  try {
    const response = yield call(api.getBookingOverview, id);

    const { data, code, message } = response.data;

    yield put(tenancyAction.getTenancyOverviewSuccess(id, data));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      tenancyAction.getTenancyOverviewFailure,
    );
  }
}

function* TenancySaga() {
  yield all([
    takeLatest("GET_TENANCY_LISTING_REQUEST", getTenancyListingRequest),
    takeLatest("GET_TENANCY_OVERVIEW_REQUEST", getTenancyOverviewRequest),
  ]);
}

export default TenancySaga;
