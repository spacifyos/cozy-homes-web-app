import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as listingAction from "@/src/actions/listing";
import { getListingPropertyDetailFailure } from "@/src/actions/listing";

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

function* getTagOptionRequest({}) {
  try {
    const response = yield call(api.getListingTagOption);

    const { data, code, message } = response.data;

    yield put(listingAction.getListingTagOptionSuccess(data));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      listingAction.getListingTagOptionFailure,
    );
  }
}

function* getListingPropertyRequest({}) {
  try {
    const response = yield call(api.getListingProperty);

    const { data, code, message } = response.data;

    yield put(listingAction.getListingPropertySuccess(data));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      listingAction.getListingPropertyFailure,
    );
  }
}

function* getListingPropertyDetailRequest({ id }) {
  try {
    const response = yield call(api.getListingPropertyDetail, id);

    const { data, code, message } = response.data;

    yield put(listingAction.getListingPropertyDetailSuccess(id, data));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      listingAction.getListingPropertyDetailFailure,
    );
  }
}

function* listingSaga() {
  yield all([
    takeLatest("GET_LISTING_REQUEST", getRequestListing),
    takeLatest("GET_LISTING_BANNER_REQUEST", getRequestListingBanner),
    takeLatest("GET_LISTING_TAG_OPTION_REQUEST", getTagOptionRequest),
    takeLatest("GET_LISTING_PROPERTY_REQUEST", getListingPropertyRequest),
    takeLatest(
      "GET_LISTING_PROPERTY_DETAIL_REQUEST",
      getListingPropertyDetailRequest,
    ),
  ]);
}

export default listingSaga;
