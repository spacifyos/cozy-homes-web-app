import Toast from "@/src/utils/Toast";
import _ from "lodash";
import { all, call, put, takeLatest } from "redux-saga/effects";

function* httpErrorHelpers(
  error,
  action,
  effects,
  ignoreToast = false,
  overrideErrorToastToInfo = false,
  errorData
) {
  if (error.response) {
    yield call(
      handleApiResponseError,
      error.response,
      effects,
      ignoreToast,
      overrideErrorToastToInfo,
      action,
      errorData
    );

    return;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  }

  const status = _.get(error, "response.status", null);

  if (!_.isEmpty(error.message)) {
    !ignoreToast
      ? !overrideErrorToastToInfo
        ? Toast.error(error.message)
        : Toast.info(error.message)
      : false;
    yield put(
      action(!_.isEmpty(errorData) ? errorData : error.message),
      status
    );
  } else {
    const unknownErrorMsg = `Unknown ${status} Error`;

    Toast.error(unknownErrorMsg);
    yield put(action(unknownErrorMsg, status));
  }
}

/**
 * This function will handle error from the response
 * @param response
 * @param put
 * @param select
 * @param ignoreToast
 * @param overrideErrorToastToInfo - To change error to info message
 * @param action
 * @param errorData
 */
function* handleApiResponseError(
  response,
  aa,
  ignoreToast,
  overrideErrorToastToInfo = false,
  action,
  errorData
) {
  const statusCode = _.get(response, "status", null);

  if (statusCode === 403) {
    // Router.push("/contact");
  }

  const messages = _.get(response, "data", null);

  if (!_.isEmpty(messages.message) && !ignoreToast) {
    Toast.error(messages.message);
    // const { text, type } = messages[0];
    // type === "error"
    //   ? !overrideErrorToastToInfo
    //     ? Toast.error(text)
    //     : Toast.info(text)
    //   : Toast.info(text);

    yield put(
      action(!_.isEmpty(errorData) ? errorData : messages, statusCode)
      // statusCode
    );
  } else {
    const unknownErrorMsg = `Unknown ${statusCode} Error`;

    Toast.error(unknownErrorMsg);
    yield put(action(unknownErrorMsg, statusCode));
  }
}

export default httpErrorHelpers;
