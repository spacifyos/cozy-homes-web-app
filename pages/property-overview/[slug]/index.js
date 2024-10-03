import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import RoomPicCarousel from "@/components/PropertyOverview/RoomPicCarousel";
import DetailComponent from "@/components/PropertyOverview/DetailComponent";
import DetailFeatureSection from "@/components/PropertyOverview/DetailFeatureSection";
import Facilities from "@/components/PropertyOverview/Facilities";
import AgentSection from "@/components/PropertyOverview/AgentSection";
import SpacifyMap from "@/components/PropertyOverview/SpacifyMap";
import RecommendSection from "@/components/PropertyOverview/RecommendSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import PolicyDetail from "@/components/PropertyOverview/PolicyDetail";
import { isEmpty, isEqual, get } from "lodash";
import Description from "@/components/Detail/Description";
import * as listingSelector from "@/src/selectors/listing";
import * as listingAction from "@/src/actions/listing";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomButton from "@/components/CustomButton";
import MoveInCostModal from "@/components/PropertyOverview/MoveInCostModal";
import Constant from "@/src/utils/Constant";
import Helper from "@/src/utils/Helper";
import ImageModal from "@/components/PropertyOverview/ImageModal";
import RentChargeModal from "@/components/Booking/RentChargeModal";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import CustomImage from "@/components/CustomImage";
import DesktopRecommendSection from "@/components/PropertyOverview/DesktopRecommendSection";
import DesktopNearbyRoomSection from "@/components/PropertyOverview/DesktopNearbyRoomSection";
import DesktopPropertyPriceSection from "@/components/PropertyOverview/DesktopPropertyPriceSection";

export async function getServerSideProps(context) {
  const id = get(context, ["params", "slug"], "");

  return {
    props: {
      id: id,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}
const PropertyOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const getListingPropertyDetailRequest = (id) =>
    dispatch(listingAction.getListingPropertyDetailRequest(id));
  const listingPropertyDetailData = useSelector((state) =>
    listingSelector.getListingPropertyDetailData(state, id),
  );
  const listingPropertyDetailDataLoading = useSelector((state) =>
    listingSelector.getListingPropertyDetailDataLoading(state),
  );

  const getListingCancellationRequest = () =>
    dispatch(listingAction.getListingCancellationRequest());
  const listingCancellationData = useSelector((state) =>
    listingSelector.getListingCancellationData(state),
  );
  const listingCancellationDataLoading = useSelector((state) =>
    listingSelector.getListingCancellationDataLoading(state),
  );

  const [selectDetail, setSelectedDetail] = useState(Constant.TENANCY);
  // const [isBookMarks, setIsBookMarks] = useState(true);
  const [openModalFirstMonthCharges, setOpenFirstMonthModalCharges] =
    useState(false);
  const [openModalLastMonthCharges, setOpenModalLastMonthCharges] =
    useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);

  const propertyName = listingSelector.getPropertyName(
    listingPropertyDetailData,
  );
  const unitRoomName = listingSelector.getUnitRoomName(
    listingPropertyDetailData,
  );
  const address = listingSelector.getAddress(listingPropertyDetailData);
  const description = listingSelector.getDescription(listingPropertyDetailData);
  const rental = listingSelector.getRental(listingPropertyDetailData);
  const recommendedList = listingSelector.getRecommended(
    listingPropertyDetailData,
  );
  const facilitiesList = listingSelector.getFacilities(
    listingPropertyDetailData,
  );
  const bedType = listingSelector.getBedType(listingPropertyDetailData);
  const bathroom = listingSelector.getBathroom(listingPropertyDetailData);
  const squareFeet = listingSelector.getSquareFeet(listingPropertyDetailData);
  const imageUrl = listingSelector.getImagesUrl(listingPropertyDetailData);
  const moveInFees = listingSelector.getMoveInFees(listingPropertyDetailData);

  const isAllowedZeroDeposit = listingSelector.isAllowedZeroDeposit(
    listingPropertyDetailData,
  );

  const normalItems = listingSelector.getItems(moveInFees);
  const zeroDepositItems = listingSelector.getItemsWithZeroDeposit(moveInFees);

  const [targetItems, setTargetItems] = useState(normalItems);

  const totalMoveInCost = listingSelector.getTotalCostFull(targetItems);

  useEffect(() => {
    if (!isAllowedZeroDeposit) {
      setTargetItems(normalItems);
    } else {
      setTargetItems(zeroDepositItems);
    }
  }, [listingPropertyDetailData]);

  const [selectedImage, setSelectedImage] = useState(2);

  useEffect(() => {
    fetchListingPropertyDetail(id);
  }, [id]);

  const fetchListingPropertyDetail = (id) => {
    getListingPropertyDetailRequest(id);
  };

  const onClickToBookAppointment = () => {
    router.push("/property-overview/1/book-appointment");
  };
  const onClickGoBack = () => {
    router.back();
  };

  // const onClickRightButton = () => {
  //   setIsBookMarks(!isBookMarks);
  // };

  const fetchListingCancellation = () => {
    getListingCancellationRequest();
  };

  const onClickSelectDetail = (select) => {
    setSelectedDetail(select);

    if (isEqual(select, Constant.POLICY)) {
      fetchListingCancellation();
    }
  };

  const onClickOpenMoveInCostModal = () => {
    Helper.documentGetElementById("move_in_cost_modal").showModal();
  };

  const onClickPopupImage = (selectedImage) => {
    setSelectedImage(selectedImage);
    setOpenImageModal(true);
  };

  const onClickCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const onClickOpenModalFirstMonthCharges = () => {
    setOpenFirstMonthModalCharges(!openModalFirstMonthCharges);
  };

  const onClickOpenModalLastMonthCharges = () => {
    setOpenModalLastMonthCharges(!openModalLastMonthCharges);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Property Overview - Spacify Asia" />

      <DesktopLayout hideNav>
        <div className="container mx-auto flex-1 py-10">
          <div className="grid grid-rows-2 grid-cols-4 grid-flow-col gap-5 pb-4">
            <div className="row-span-2 col-span-2 global-border-radius global-box-shadow">
              <CustomImage src={Images.logoImage} />
            </div>
            <div className="col-span-1 global-border-radius global-box-shadow">
              <CustomImage src={Images.logoImage} />
            </div>
            <div className="col-span-1 global-border-radius global-box-shadow">
              <CustomImage src={Images.logoImage} />
            </div>
            <div className="col-span-1 global-border-radius global-box-shadow">
              <CustomImage src={Images.logoImage} />
            </div>
            <div className="col-span-1 global-border-radius global-box-shadow">
              <CustomImage src={Images.logoImage} />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-10">
            <div className="col-span-2">
              <DetailComponent
                propertyName={propertyName}
                unitRoomName={unitRoomName}
                address={address}
              />

              <div className="grid grid-cols-6 gap-3 items-center pb-5">
                <CustomButton
                  icon={
                    isEqual(selectDetail, Constant.TENANCY)
                      ? Images.tenancyIconActive
                      : Images.tenancyIcon
                  }
                  buttonClassName={`col-span-2 ${isEqual(selectDetail, Constant.TENANCY) ? "primary-btn" : "default-btn"} flex-row-reverse`}
                  textClassName="font-size-normal"
                  buttonText={t("propertyDetail.tenancy")}
                  imageStyle={{ width: 18 }}
                  onClick={() => onClickSelectDetail(Constant.TENANCY)}
                />

                <CustomButton
                  icon={
                    isEqual(selectDetail, Constant.TENANCY)
                      ? Images.policyIcon
                      : Images.policyIconActive
                  }
                  imageStyle={{ width: 18 }}
                  buttonClassName={`col-span-2 ${isEqual(selectDetail, Constant.POLICY) ? "primary-btn" : "default-btn"} flex-row-reverse`}
                  textClassName="font-size-normal disable-text"
                  buttonText={t("propertyDetail.policy")}
                  onClick={() => onClickSelectDetail(Constant.POLICY)}
                />
              </div>

              {isEqual(selectDetail, Constant.TENANCY) ? (
                <div>
                  <DetailFeatureSection
                    t={t}
                    rental={rental}
                    bedType={bedType}
                    bathroom={bathroom}
                    squareFeet={squareFeet}
                  />

                  <Description t={t} description={description} />

                  <Facilities t={t} facilitiesList={facilitiesList} />

                  {/*<SpacifyMap t={t} />*/}
                </div>
              ) : (
                <PolicyDetail
                  t={t}
                  loading={listingCancellationDataLoading}
                  data={listingCancellationData}
                />
              )}
            </div>
            <div className="col-span-1">
              <DesktopPropertyPriceSection
                t={t}
                data={listingPropertyDetailData}
                lists={targetItems}
                totalMoveInCost={totalMoveInCost}
                rental={rental}
                openModalFirstMonthCharges={openModalFirstMonthCharges}
                openModalLastMonthCharges={openModalLastMonthCharges}
                onClickOpenModalFirstMonthCharges={
                  onClickOpenModalFirstMonthCharges
                }
                onClickOpenModalLastMonthCharges={
                  onClickOpenModalLastMonthCharges
                }
              />
            </div>
          </div>

          <DesktopRecommendSection t={t} recommendedList={recommendedList} />

          <DesktopNearbyRoomSection t={t} recommendedList={recommendedList} />
        </div>
      </DesktopLayout>

      <CustomHeader
        pageTitle={t("pageTitle.propertyDetail")}
        hideBgImage
        onClickGoBack={onClickGoBack}
        // onClickRightButton={onClickRightButton}
        HeaderImageStyle={{ width: "30px", height: "30px" }}
        // rightButtonIcon={
        //   isBookMarks ? Images.bookMarksIcon : Images.bookMarksIconActive
        // }
      >
        <div className="body-container pb-32">
          <RoomPicCarousel
            imageUrl={imageUrl}
            onClickPopupImage={onClickPopupImage}
          />

          <DetailComponent
            propertyName={propertyName}
            unitRoomName={unitRoomName}
            address={address}
          />

          <div className="grid grid-cols-6 gap-3 items-center pb-5">
            <CustomButton
              icon={
                isEqual(selectDetail, Constant.TENANCY)
                  ? Images.tenancyIconActive
                  : Images.tenancyIcon
              }
              buttonClassName={`col-span-3 ${isEqual(selectDetail, Constant.TENANCY) ? "primary-btn" : "default-btn"} flex-row-reverse`}
              textClassName="font-size-normal"
              buttonText={t("propertyDetail.tenancy")}
              imageStyle={{ width: 18 }}
              onClick={() => onClickSelectDetail(Constant.TENANCY)}
            />

            <CustomButton
              icon={
                isEqual(selectDetail, Constant.TENANCY)
                  ? Images.policyIcon
                  : Images.policyIconActive
              }
              imageStyle={{ width: 18 }}
              buttonClassName={`col-span-3 ${isEqual(selectDetail, Constant.POLICY) ? "primary-btn" : "default-btn"} flex-row-reverse`}
              textClassName="font-size-normal disable-text"
              buttonText={t("propertyDetail.policy")}
              onClick={() => onClickSelectDetail(Constant.POLICY)}
            />
          </div>

          {isEqual(selectDetail, Constant.TENANCY) ? (
            <div>
              <DetailFeatureSection
                t={t}
                rental={rental}
                bedType={bedType}
                bathroom={bathroom}
                squareFeet={squareFeet}
              />

              <Description t={t} description={description} />

              <Facilities t={t} facilitiesList={facilitiesList} />

              {/*<SpacifyMap t={t} />*/}

              <RecommendSection t={t} recommendedList={recommendedList} />
            </div>
          ) : (
            <PolicyDetail
              t={t}
              loading={listingCancellationDataLoading}
              data={listingCancellationData}
            />
          )}

          <AgentSection
            t={t}
            onClickToBookAppointment={onClickToBookAppointment}
            data={listingPropertyDetailData}
            onClickOpenMoveInCostModal={onClickOpenMoveInCostModal}
            totalMoveInCost={totalMoveInCost}
            propertyId={id}
          />

          <MoveInCostModal
            openModalFirstMonthCharges={openModalFirstMonthCharges}
            openModalLastMonthCharges={openModalLastMonthCharges}
            onClickOpenModalFirstMonthCharges={
              onClickOpenModalFirstMonthCharges
            }
            onClickOpenModalLastMonthCharges={onClickOpenModalLastMonthCharges}
            lists={targetItems}
          />

          <ImageModal
            data={imageUrl}
            selectedImage={selectedImage}
            onClickCloseImageModal={onClickCloseImageModal}
            openImageModal={openImageModal}
          />

          <RentChargeModal />

          <LoadingOverlay loading={listingPropertyDetailDataLoading} />
        </div>
      </CustomHeader>
    </div>
  );
};

export default withTranslation("common")(PropertyOverview);
