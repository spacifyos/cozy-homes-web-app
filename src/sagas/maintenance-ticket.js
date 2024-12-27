import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as maintenanceTicketAction from "@/src/actions/maintenance-ticket";

function* getMaintenanceTicketListingRequest({ perPage, page, status }) {
  try {
    const response = yield call(
      api.getMaintenanceTicket,
      perPage,
      page,
      status,
    );

    const { data, code, message } = response;

    yield put(
      maintenanceTicketAction.getMaintenanceTicketListingSuccess(data, status),
    );
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      maintenanceTicketAction.getMaintenanceTicketListingFailure,
    );
  }
}

function* getMaintenanceTicketOverviewRequest({ id }) {
  try {
    const response = yield call(api.getMaintenanceTicketDetail, id);

    const { data, code, message } = response.data;

    yield put(
      maintenanceTicketAction.getMaintenanceTicketOverviewSuccess(id, data),
    );
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      maintenanceTicketAction.getMaintenanceTicketOverviewFailure,
    );
  }
}

function* MaintenanceTicketSaga() {
  yield all([
    takeLatest(
      "GET_MAINTENANCE_TICKET_LISTING_REQUEST",
      getMaintenanceTicketListingRequest,
    ),
    takeLatest(
      "GET_MAINTENANCE_TICKET_OVERVIEW_REQUEST",
      getMaintenanceTicketOverviewRequest,
    ),
  ]);
}

export default MaintenanceTicketSaga;
