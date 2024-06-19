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
import _ from "lodash";
import Description from "@/components/Detail/Description";
import * as listingSelector from "@/src/selectors/listing";
import * as listingAction from "@/src/actions/listing";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import MoveInCostModal from "@/components/PropertyOverview/MoveInCostModal";
import Constant from "@/src/utils/Constant";
import { getMoveInFees, getSquareFeet } from "@/src/selectors/listing";
import ImageModal from "@/components/PropertyOverview/ImageModal";
import RentChargeModal from "@/components/Booking/RentChargeModal";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps(context) {
  const id = _.get(context, ["params", "slug"], "");

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
  const [openCharges, setOpenCharges] = useState(false);

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
  const totalMoveInCost = listingSelector.getFeesTotalCostFull(
    listingPropertyDetailData,
  );

  const [selectedImage, setSelectedImage] = useState(null);

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

  const onClickOpenModalCharges = () => {
    setOpenCharges(!openCharges);
  };

  // const onClickRightButton = () => {
  //   setIsBookMarks(!isBookMarks);
  // };

  const fetchListingCancellation = () => {
    getListingCancellationRequest();
  };

  const onClickSelectDetail = (select) => {
    setSelectedDetail(select);

    if (_.isEqual(select, Constant.POLICY)) {
      fetchListingCancellation();
    }
  };

  const onClickBooking = () => {
    router.push(`/booking/${id}`);
  };

  const onClickOpenWhatsApp = (contactNumber) => {
    window.open(
      _.isEmpty(contactNumber)
        ? `https://api.whatsapp.com/send/?text=Hi, I need some help.`
        : `https://api.whatsapp.com/send/?phone=${contactNumber}&text=Hi, I need some help.`,
      "_blank",
    );
  };

  const onClickToPropertyOverview = (id) => {
    router.push(`/property-overview/${id}`);
  };

  const onClickOpenMoveInCostModal = () => {
    document.getElementById("move_in_cost_modal").showModal();
  };

  const onClickPopupImage = (selectedImage) => {
    setSelectedImage(selectedImage);
    document.getElementById("image_modal").showModal();
  };

  return (
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
              _.isEqual(selectDetail, Constant.TENANCY)
                ? Images.tenancyIconActive
                : Images.tenancyIcon
            }
            buttonClassName={`col-span-3 ${_.isEqual(selectDetail, Constant.TENANCY) ? "primary-btn" : "default-btn"} flex-row-reverse`}
            textClassName="font-size-normal"
            buttonText={t("propertyDetail.tenancy")}
            imageStyle={{ width: "20px", height: "20px" }}
            onClick={() => onClickSelectDetail(Constant.TENANCY)}
          />

          <CustomButton
            icon={
              _.isEqual(selectDetail, Constant.TENANCY)
                ? Images.policyIcon
                : Images.policyIconActive
            }
            imageStyle={{ width: "20px", height: "20px" }}
            buttonClassName={`col-span-3 ${_.isEqual(selectDetail, Constant.POLICY) ? "primary-btn" : "default-btn"} flex-row-reverse`}
            textClassName="font-size-normal disable-text"
            buttonText={t("propertyDetail.policy")}
            onClick={() => onClickSelectDetail(Constant.POLICY)}
          />
        </div>

        {_.isEqual(selectDetail, Constant.TENANCY) ? (
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

            <RecommendSection
              t={t}
              recommendedList={recommendedList}
              onClickToPropertyOverview={onClickToPropertyOverview}
            />
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
          onClickOpenWhatsApp={onClickOpenWhatsApp}
          onClickBooking={onClickBooking}
          onClickToBookAppointment={onClickToBookAppointment}
          data={listingPropertyDetailData}
          onClickOpenMoveInCostModal={onClickOpenMoveInCostModal}
          totalMoveInCost={totalMoveInCost}
        />

        <MoveInCostModal
          openCharges={openCharges}
          onClickOpenModalCharges={onClickOpenModalCharges}
          lists={moveInFees}
        />

        <ImageModal data={selectedImage} />

        <RentChargeModal />

        <LoadingOverlay loading={listingPropertyDetailDataLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(PropertyOverview);
