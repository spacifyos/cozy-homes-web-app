import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as listingAction from "@/src/actions/listing";

function* getRequestListingBanner({}) {
  try {
    const response = yield call(api.getListingBanner);

    const { data, code, message } = response.data;

    yield put(listingAction.getListingBannerSuccess(data));
  } catch (error) {
    yield call(httpErrorHelpers, error, listingAction.getListingBannerFailure);
  }
}

function* getRequestListing({}) {
  try {
    const response = yield call(api.getListing);

    const { data, code, message } = response.data;

    yield put(listingAction.getListingSuccess(data));
  } catch (error) {
    yield call(httpErrorHelpers, error, listingAction.getListingFailure);
  }
}

function* listingSaga() {
  yield all([
    takeLatest("GET_LISTING_REQUEST", getRequestListing),
    takeLatest("GET_LISTING_BANNER_REQUEST", getRequestListingBanner),
  ]);
}

export default listingSaga;
