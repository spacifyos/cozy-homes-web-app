import apiInstance, {
  AUTH_TOKEN_HEADER,
  AUTH_AGENT_TOKEN_HEADER,
} from "./httpManager";
import _ from "lodash";
import httpManager from "./httpManager";

const version = "v1";

/**
 * To update language in api header
 * @param locale
 */
const setHeaderLanguage = (locale) => {
  apiInstance.defaults.headers["Accept-Language"] = locale;
};

/**
 * To get common data
 */
const getCommonData = () => apiInstance.get(`${version}/common`);

const getAuthUser = () => apiInstance.get(`merchant/auth/customer-info`);

const getMeterList = () => apiInstance.get(`/merchant/meter`);

const getMeterDetail = (id) => apiInstance.get(`/merchant/meter/${id}/info`);

const postSearchMeter = (postData) =>
  apiInstance.post(`/merchant/meter/search-meter`, postData);

const postDeleteMeter = (id) => apiInstance.delete(`/merchant/meter/${id}`);

const postSmartMeterTopUp = (id, postDate) =>
  apiInstance.post(`/merchant/meter/${id}/top-up`, postDate);

const getSmartMeterTransaction = (id, params) => {
  const dateFrom = _.get(params, ["date_from"], "");
  const dateTo = _.get(params, ["date_to"], "");

  return apiInstance.get(
    `/merchant/meter/${id}/transactions?date_from=${dateFrom}&date_to=${dateTo}`
  );
};

const loginAccount = (data) => apiInstance.post("/oauth/token", data);

const signUpAccount = (data) => apiInstance.post("/auth/register", data);

const getUserProfile = () => apiInstance.get("/self");

const putUpdateSelfProfileInfo = (data) => apiInstance.post("/self", data);

const postSetPinNumber = (postData) =>
  apiInstance.post(`self/pin-number`, postData);

const getTenancyListing = (page, per_page) =>
  apiInstance.get(`tenancy?status=1&page=${page}&per_page=${per_page}`);

const getTenancyDetail = (code) => apiInstance.get(`tenancy/${code}`);

const getTenancySmartHome = (code) =>
  apiInstance.get(`tenancy/${code}/smart-home`);

const getTenantSmartMeterListing = (page, per_page) =>
  apiInstance.get(`meter?page=${page}&per_page=${per_page}`);

const getTenantSmartMeterListingDetail = (id) => apiInstance.get(`meter/${id}`);

const postTenantSmartMeterTopUp = (id, postDate) =>
  apiInstance.post(`meter/${id}/top-up`, postDate);

const getTenantSmartMeterUsage = (filterData) => {
  const checkMeterId = _.get(filterData, ["meter_id"], "");
  const checkTimeType = _.get(filterData, ["time_type"], "");
  const checkDateFrom = _.get(filterData, ["date_from"], "");
  const checkDateTo = _.get(filterData, ["date_to"], "");

  return apiInstance.get(
    `meter/usage?meter_id=${checkMeterId}&time_type=${checkTimeType}&date_from=${checkDateFrom}&date_to=${checkDateTo}`,
    filterData
  );
};

const postTenantSmartMeterSyncStatus = (id) =>
  apiInstance.post(`meter/${id}/sync-status`, id);

const getInvoiceListing = (page, per_page, params, payment_status) => {
  const filterTagTitle = _.get(params, ["params", "filterTagTitle"], "");
  const filterTagValue = _.get(params, ["params", "filterTagValue"], "");
  const dateFromValue = _.get(params, ["params", "dateFromValue"], "");
  const dateToValue = _.get(params, ["params", "dateToValue"], "");
  const getFilterTagTitle = _.isEmpty(filterTagTitle) ? "" : filterTagTitle;
  let checkFilterTag;

  if (
    _.isEqual(getFilterTagTitle, "Invoice Number") &&
    !_.isEmpty(filterTagValue)
  ) {
    checkFilterTag = _.isEmpty(filterTagValue)
      ? ""
      : `&invoice_number=${filterTagValue}`;
  } else if (
    _.isEqual(getFilterTagTitle, "Receipt Number") &&
    !_.isEmpty(filterTagValue)
  ) {
    checkFilterTag = _.isEmpty(filterTagValue)
      ? ""
      : `&receipt_number=${filterTagValue}`;
  } else if (
    _.isEqual(getFilterTagTitle, "Tenancy Code") &&
    !_.isEmpty(filterTagValue)
  ) {
    checkFilterTag = _.isEmpty(filterTagValue)
      ? ""
      : `&tenancy_code=${filterTagValue}`;
  } else {
    checkFilterTag = "";
  }

  const checkDateFrom = _.isEmpty(dateFromValue)
    ? ""
    : `&invoice_date_from=${dateFromValue}`;
  const checkDateTo = _.isEmpty(dateToValue)
    ? ""
    : `&invoice_date_to=${dateToValue}`;

  return apiInstance.get(
    `invoice?page=${page}&per_page=${per_page}${checkFilterTag}${checkDateFrom}${checkDateTo}${encodedPaymentStatus(
      payment_status
    )}`
  );
};

const encodedPaymentStatus = (payment_status) => {
  switch (payment_status.length) {
    case 1:
      return `&payment_status[]=` + payment_status[0];
    case 2:
      return (
        `&payment_status[]=` +
        payment_status[0] +
        `&payment_status[]=` +
        payment_status[1]
      );
    case 3:
      return (
        `&payment_status[]=` +
        payment_status[0] +
        `&payment_status[]=` +
        payment_status[1] +
        `&payment_status[]=` +
        payment_status[2]
      );
  }
};

const getInvoiceListingDetail = (id) => apiInstance.get(`invoice/${id}`);

const getInvoiceSummary = () => apiInstance.get(`invoice/summary`);

const getInvoicePaymentUrl = (id, paymentType, module) =>
  apiInstance.get(
    `payment/generate-parameter?id=${id}&type=${paymentType}&module=${module}`
  );

const postGalleryPreSign = (postData) =>
  apiInstance.post(`gallery/pre-signed-url`, postData);

const getEAgreementListing = (page, per_page, list_status, params) => {
  const referenceNumber = _.get(params, ["params", "referenceNumber"], "");
  const stampingStatus = _.get(params, ["params", "stampingStatus"], "");

  const referenceNumberParams = !_.isEmpty(referenceNumber)
    ? `&search=${referenceNumber}`
    : ``;
  const stampingStatusParams = !_.isEmpty(stampingStatus)
    ? `&stamping_status=${stampingStatus}`
    : ``;
  return apiInstance.get(
    `agreement/my?page=${page}&per_page=${per_page}&list_status=${list_status}${referenceNumberParams}${stampingStatusParams}`
  );
};

const getEAgreementListingDetail = (id) =>
  apiInstance.get(`agreement/my/${id}`);

const postEAgreementAgreed = (id, postData) =>
  apiInstance.post(`agreement/my/${id}/agreed`, postData);

const postEAgreementRejected = (id, postData) =>
  apiInstance.post(`agreement/my/${id}/rejected`, postData);

const postEAgreementSign = (id, postData) =>
  apiInstance.post(`agreement/my/${id}/sign`, postData);

const getEAgreementPdf = (id, download) => {
  const checkDownload = !download ? "?base64=1" : `?download=${download}`;

  return apiInstance.get(`agreement/${id}/pdf${checkDownload}`);
};

const getInsuranceListing = (page, per_page, status) =>
  apiInstance.get(
    `agreement-insurance?page=${page}&per_page=${per_page}&status[]=${status}`
  );

const getInsuranceDetail = (id) => apiInstance.get(`agreement-insurance/${id}`);

const getInsurancePolicy = (id) =>
  apiInstance.get(`agreement-insurance/${id}/policy?base64=1`);

const postAutoCollection = (postData) =>
  apiInstance.post(`auto-collection`, postData);

const getAutoCollectionStatus = (code) =>
  apiInstance.get(`/auto-collection/status/${code}`);

const deleteAutoCollectionMandate = (code, postData) =>
  apiInstance.delete(`/auto-collection/mandate/${code}`, postData);

const getAutoCollectionMandateAuthorizeUrl = (code) =>
  apiInstance.get(`/auto-collection/mandate/authorize-url/${code}`);

const getAnnouncementListing = (page, per_page) =>
  apiInstance.get(`announcement?page=${page}&per_page=${per_page}`);

const getAnnouncementDetail = (id) => apiInstance.get(`announcement/${id}`);

const postRequestPhoneVerificationCode = (data) => {
  return apiInstance.post(`/otp`, data);
};

const verifyPhoneVerificationCode = (data) => {
  return apiInstance.put(`/otp`, data);
};
const getRequestEAgreementDocumentUrl = (id) =>
  apiInstance.get(`/agreement/${id}/url`);

const getRequestInsuranceDocumentUrl = (id) =>
  apiInstance.get(`/agreement-insurance/${id}/link`);

//Sky World
const getSpaceBannerAnnouncement = (type) =>
  apiInstance.get(`/space-plus/banner-announcement?type=${type}`);

const getSpaceListing = (id, filterValue) => {
  // const bedType = _.get(filterValue, ["selected_bed-type"], "");
  // const gender = _.get(filterValue, ["selected_gender"], "");
  // const property = _.get(filterValue, ["selected_property_ids"], 0);

  let filterParam = "";
  const priceMin = _.get(filterValue, ["price_min"], 0);
  const priceMax = _.get(filterValue, ["price_max"], 5000);

  _.map(filterValue, (value, key) => {
    if (!_.isEmpty(value)) {
      return (filterParam += `filters[${key}]=${value}&`);
    }
  });

  if (id !== 0) {
    return apiInstance.get(
      `/space-plus/listing?space_collection_id=${id}&price_min=${priceMin}&price_max=${priceMax}&${filterParam}`
    );
  } else {
    return apiInstance.get(
      `/space-plus/listing?price_min=${priceMin}&price_max=${priceMax}&${filterParam}`
    );
  }
};

const getSpaceCollection = (id, filterValue, price) => {
  let filterParam = "";
  const priceMin = _.get(filterValue, ["price_min"], 0);
  const priceMax = _.get(filterValue, ["price_max"], 5000);

  _.map(filterValue, (value, key) => {
    if (!_.isEmpty(value)) {
      return (filterParam += `filters[${key}]=${value}&`);
    }
  });

  const checkPrice = !_.isEmpty(price) ? `price=${price}` : "";

  return apiInstance.get(
    `/space-plus/collection/${id}?price_min=${priceMin}&price_max=${priceMax}&${filterParam}${checkPrice}`
  );
};

const getSpaceCancellationPolicy = () =>
  apiInstance.get(`/space-plus/cancellation-policy`);

const getSpaceRentApplication = (id) =>
  apiInstance.get(`/rent-application/listing/${id}`);

const postSpaceRentApplicationBooking = (postData) =>
  apiInstance.post(`/rent-application/booking`, postData);

const getSpaceRecommendListing = () => apiInstance.get(`/space-plus/recommend`);

const getSpaceCollectionOption = () => apiInstance.get(`/space-plus/option`);

export default {
  signUpAccount,
  setHeaderLanguage,
  getCommonData,
  getAuthUser,
  getMeterList,
  postSearchMeter,
  postDeleteMeter,
  postSmartMeterTopUp,
  getSmartMeterTransaction,
  getMeterDetail,
  getUserProfile,
  putUpdateSelfProfileInfo,
  postSetPinNumber,
  getTenancyListing,
  getTenancyDetail,
  getTenancySmartHome,
  getTenantSmartMeterListing,
  getTenantSmartMeterListingDetail,
  postTenantSmartMeterTopUp,
  getTenantSmartMeterUsage,
  postTenantSmartMeterSyncStatus,
  getInvoiceListing,
  getInvoiceListingDetail,
  getInvoiceSummary,
  getEAgreementListing,
  getEAgreementListingDetail,
  postEAgreementAgreed,
  postEAgreementRejected,
  postEAgreementSign,
  getEAgreementPdf,
  getInvoicePaymentUrl,
  postGalleryPreSign,
  getInsuranceListing,
  getInsuranceDetail,
  getInsurancePolicy,
  postAutoCollection,
  getAutoCollectionStatus,
  deleteAutoCollectionMandate,
  getAutoCollectionMandateAuthorizeUrl,
  getAnnouncementListing,
  getAnnouncementDetail,
  postRequestPhoneVerificationCode,
  loginAccount,
  getRequestEAgreementDocumentUrl,
  getRequestInsuranceDocumentUrl,
  getSpaceBannerAnnouncement,
  getSpaceListing,
  getSpaceCollection,
  getSpaceCancellationPolicy,
  getSpaceRentApplication,
  postSpaceRentApplicationBooking,
  getSpaceRecommendListing,
  getSpaceCollectionOption,
  verifyPhoneVerificationCode,
};
