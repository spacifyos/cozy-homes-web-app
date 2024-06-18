export const getSmartMeterListingRequest = () => ({
    type: "GET_SMART_METER_LISTING_REQUEST",
});

export const getSmartMeterListingSuccess = (data) => ({
    type: "GET_SMART_METER_LISTING_SUCCESS",
    data,
});

export const getSmartMeterListingFailure = (messages) => ({
    type: "GET_SMART_METER_LISTING_FAILURE",
    messages,
});

export const getSmartMeterOverviewRequest = (id) => ({
    type: "GET_SMART_METER_OVERVIEW_REQUEST",
    id,
});

export const getSmartMeterOverviewSuccess = (id, data) => ({
    type: "GET_SMART_METER_OVERVIEW_SUCCESS",
    id,
    data,
});

export const getSmartMeterOverviewFailure = (messages) => ({
    type: "GET_SMART_METER_OVERVIEW_FAILURE",
    messages,
});

