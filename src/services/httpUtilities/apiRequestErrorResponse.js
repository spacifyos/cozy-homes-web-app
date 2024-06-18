import _ from "lodash";
import Toast from "@/src/utils/Toast";

export const apiRequestErrorResponse = (err, ignoreToast = false) => {
  const response = _.get(err, ["response"], "");
  const message = _.get(err, ["message"], "");
  const statusCode = _.get(response, "status", null);

  if (!_.isEmpty(response)) {
    const messages = _.get(response, ["data", "message"], "");

    if (!_.isEmpty(messages) && !ignoreToast) {
      Toast.error(messages);
    } else {
      const unknownErrorMsg = `Unknown ${statusCode} Error`;
      Toast.error(unknownErrorMsg);
    }

    return;
  }

  if (!_.isEmpty(message)) {
    !ignoreToast ? Toast.error(message) : false;
  } else {
    const unknownErrorMsg = `Unknown ${statusCode} Error`;
    Toast.error(unknownErrorMsg);
  }
};
