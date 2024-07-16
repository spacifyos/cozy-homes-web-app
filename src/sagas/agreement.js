import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as agreementAction from "@/src/actions/agreement";

function* getAgreementListingRequest({ status, perPage, page }) {
  try {
    const response = yield call(api.getAgreementListing, status, perPage, page);

    const { data, code, message } = response;

    yield put(agreementAction.getAgreementListingSuccess(data, status));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      agreementAction.getAgreementListingFailure,
    );
  }
}

function* getAgreementOverviewRequest({ id }) {
  try {
    const response = yield call(api.getAgreementOverview, id);

    const { data, code, message } = response.data;

    yield put(agreementAction.getAgreementOverviewSuccess(id, data));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      agreementAction.getAgreementOverviewFailure,
    );
  }
}

function* AgreementSaga() {
  yield all([
    takeLatest("GET_AGREEMENT_LISTING_REQUEST", getAgreementListingRequest),
    takeLatest("GET_AGREEMENT_OVERVIEW_REQUEST", getAgreementOverviewRequest),
  ]);
}

export default AgreementSaga;
