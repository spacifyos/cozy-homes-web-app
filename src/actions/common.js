export const getSelectOptionRequest = () => ({
  type: "GET_SELECT_OPTION_REQUEST",
});

export const getSelectOptionSuccess = (data) => ({
    type: "GET_SELECT_OPTION_SUCCESS",
    data,
});

export const getSelectOptionFailure = (messages) => ({
    type: "GET_SELECT_OPTION_FAILURE",
    messages,
});
