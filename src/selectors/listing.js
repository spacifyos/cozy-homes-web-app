import _ from "lodash";

export const getListingData = (state) =>
  _.get(state, ["listing", "listing", "data"], null);
export const getListingDataLoading = (state) =>
  _.get(state, ["listing", "listing", "loading"], false);

export const getListingBannerData = (state) =>
  _.get(state, ["listing", "listingBanner", "data"], null);
export const getListingBannerDataLoading = (state) =>
  _.get(state, ["listing", "listingBanner", "loading"], false);

export const getListingTagOptionData = (state) =>
  _.get(state, ["listing", "listingTagOption", "data"], null);
export const getListingTagOptionDataLoading = (state) =>
  _.get(state, ["listing", "listingTagOption", "loading"], false);

export const getListingPropertyData = (state) =>
  _.get(state, ["listing", "listingProperty", "data"], null);
export const getListingPropertyPagination = (state) =>
  _.get(state, ["listing", "listingProperty", "pagination"], null);
export const getListingPropertyDataLoading = (state) =>
  _.get(state, ["listing", "listingProperty", "loading"], false);

export const getListingPropertyDetailData = (state, id) =>
  _.get(state, ["listing", "listingPropertyDetail", id, "data"], null);
export const getListingPropertyDetailDataLoading = (state) =>
  _.get(state, ["listing", "listingPropertyDetail", "loading"], false);

export const getListingCancellationData = (state) =>
  _.get(state, ["listing", "listingCancellation", "data"], null);
export const getListingCancellationDataLoading = (state) =>
  _.get(state, ["listing", "listingCancellation", "loading"], false);

export const getBookingOverviewData = (state, id) =>
  _.get(state, ["listing", "bookingOverview", id, "data"], null);
export const getBookingOverviewLoading = (state) =>
  _.get(state, ["listing", "bookingOverview", "loading"], false);

export const getPopularUniCollege = (state) =>
  _.get(state, ["uni_college_profile"], []);
export const getPopularCondo = (state) => _.get(state, ["popular_condo"], []);
export const getTags = (state) => _.get(state, ["tags"], []);
export const getName = (state) => _.get(state, ["name"], "");
export const getImageUrl = (state) => _.get(state, ["image_url"], "");
export const getImageUrlActive = (state) =>
  _.get(state, ["image_url_active"], "");
export const getImagesUrl = (state) => _.get(state, ["images_url"], []);
export const getId = (state) => _.get(state, ["id"], 0);
export const getPropertyId = (state) => _.get(state, ["property_id"], 0);
export const getProfileId = (state) => _.get(state, ["profile_id"], "");
export const getFacilityTag = (state) => _.get(state, ["facility_tags"], []);
export const getGeneralTag = (state) => _.get(state, ["general_tags"], []);
export const getCode = (state) => _.get(state, ["code"], "");
export const getDescription = (state) => _.get(state, ["description"], "");
export const getRental = (state) => _.get(state, ["rental"], "");
export const getFees = (state) => _.get(state, ["fees"], "");
export const getMoveInFees = (state) => _.get(state, ["move_in_fees"], null);
export const getRecommended = (state) => _.get(state, ["recommended"], []);
export const getFacilities = (state) => _.get(state, ["facilities"], []);
export const getBathroom = (state) => _.get(state, ["bathroom_type"], "");
export const getSquareFeet = (state) => _.get(state, ["square_feet"], "");
export const getBedType = (state) => _.get(state, ["bed_type"], "");
export const getPropertyName = (state) => _.get(state, ["property_name"], "");
export const getUnitRoomName = (state) => _.get(state, ["unit_room_name"], "");
export const getUnitName = (state) => _.get(state, ["unit_name"], "");
export const getGender = (state) => _.get(state, ["gender"], "");
export const getAddress = (state) => _.get(state, ["address"], "");
export const getPicMemberStartDate = (state) =>
  _.get(state, ["pic_member_start_date"], new Date());
export const getPicName = (state) => _.get(state, ["pic_name"], "");
export const getLabel = (state) => _.get(state, ["label"], "");
export const getValue = (state) => _.get(state, ["value"], "");
export const getAmount = (state) => _.get(state, ["amount"], "");
export const getFeeAmount = (state) => _.get(state, ["fee_amount"], "");
export const getContactNumber = (state) => _.get(state, ["contact_number"], "");
export const getHtmlContent = (state) => _.get(state, ["html_content"], "");
export const getTitle = (state) => _.get(state, ["title"], "");
export const getFeesItem = (state) => _.get(state, ["fees", "item"], "");
export const getFeesItemOthers = (state) =>
  _.get(state, ["items", "others"], []);
export const getFeesItemRentCharges = (state) =>
  _.get(state, ["items", "rent_charges"], []);
export const getFeesTotalCost = (state) =>
  _.get(state, ["fees", "total_cost"], "");
export const getTotalCostRentCharges = (state) =>
  _.get(state, ["total_cost", "rent_charges"], "");
export const getTotalCostFull = (state) =>
  _.get(state, ["total_cost", "full"], "");
export const getFeesTotalCostFull = (state) =>
  _.get(state, ["move_in_fees", "total_cost", "full"], "");
export const getTenureOption = (state) => _.get(state, ["tenure_options"], []);
export const getHasMorePages = (state) =>
  _.get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => _.get(state, ["total"], 1);
export const getCurrentPage = (state) => _.get(state, ["current_page"], 1);
export const getLastPage = (state) => _.get(state, ["last_page"], 1);
export const getReferenceNumber = (state) =>
  _.get(state, ["reference_number"], "");
export const getPaymentLink = (state) => _.get(state, ["payment_link"], "");
export const getCreatedAt = (state) => _.get(state, "created_at", "");
export const getPaymentStatus = (state) => _.get(state, ["payment_status"], "");
export const getAgencyReviewStatus = (state) =>
  _.get(state, ["agency_review_status"], "");
export const getAuthorizedAt = (state) => _.get(state, ["authorized_at"], "");
export const getTotalFees = (state) => _.get(state, ["total_fees"], "");
