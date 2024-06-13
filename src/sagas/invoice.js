import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as invoiceAction from "@/src/actions/invoice";

function* getInvoiceListingRequest({}) {
  try {
    const response = yield call(api.getListing);

    const { data, code, message } = response.data;

    yield put(invoiceAction.getInvoiceListingSuccess(data));
  } catch (error) {
    yield call(httpErrorHelpers, error, invoiceAction.getInvoiceListingFailure);
  }
}

function* getInvoiceOverviewRequest({ id }) {
  try {
    const response = yield call(api.getBookingOverview, id);

    const { data, code, message } = response.data;

    yield put(invoiceAction.getInvoiceOverviewSuccess(id, data));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      invoiceAction.getInvoiceOverviewFailure,
    );
  }
}

function* getInvoiceSummaryRequest({}) {
  try {
    const response = yield call(api.getInvoiceSummary);

    const { data, code, message } = response.data;

    yield put(invoiceAction.getInvoiceSummarySuccess(data));
  } catch (error) {
    yield call(httpErrorHelpers, error, invoiceAction.getInvoiceSummaryFailure);
  }
}

function* InvoiceSaga() {
  yield all([
    takeLatest("GET_TENANCY_LISTING_REQUEST", getInvoiceListingRequest),
    takeLatest("GET_TENANCY_OVERVIEW_REQUEST", getInvoiceOverviewRequest),
    takeLatest("GET_INVOICE_SUMMARY_REQUEST", getInvoiceSummaryRequest),
  ]);
}

export default InvoiceSaga;
