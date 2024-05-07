import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import RoomPicCarousel from "@/components/PropertyOverview/RoomPicCarousel";
import DetailComponent from "@/components/PropertyOverview/DetailComponent";
import DetailFeatureSection from "@/components/PropertyOverview/DetailFeatureSection";
import Facilities from "@/components/PropertyOverview/Facilities";
import AgentSection from "@/components/PropertyOverview/AgentSection";
import RoomzMap from "@/components/PropertyOverview/RoomzMap";
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

export { getServerSideProps };

const lists = [
  {
    title: "First Month Rental",
    value: "RM100",
  },
  {
    title: "Insurance Extra Charges",
    value: "RM100",
  },
  {
    title: "Aircond Charges",
    value: "RM100",
  },
  {
    title: "Water Bill",
    value: "RM100",
  },
];

const PropertyDetail = ({ id }) => {
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

  const [selectDetail, setSelectedDetail] = useState("Tenancy");
  const [showPolicy, setShowPolicy] = useState(true);
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
  const fees = listingSelector.getFees(listingPropertyDetailData);
  const recommendedList = listingSelector.getRecommended(
    listingPropertyDetailData,
  );
  const facilitiesList = listingSelector.getFacilities(
    listingPropertyDetailData,
  );
  const bedType = listingSelector.getBedType(listingPropertyDetailData);
  const bathroom = listingSelector.getBathroom(listingPropertyDetailData);

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

  const onClickOpenCharges = () => {
    setOpenCharges(!openCharges);
  };

  // const onClickRightButton = () => {
  //   setIsBookMarks(!isBookMarks);
  // };

  const onClickSelectDetail = (select) => {
    setSelectedDetail(select);
  };

  useEffect(() => {
    setShowPolicy(selectDetail === "Tenancy");
  }, [selectDetail]);

  const onClickBooking = (contactNumber) => {
    window.open(
      `https://api.whatsapp.com/send/?phone=${contactNumber}&text=Hi, I need some help.`,
      "_blank",
    );
    // router.push(`/booking/1`);
  };

  const onClickToPropertyOverview = (id) => {
    router.push(`/property-overview/${id}`);
  };

  const onClickOpenMoveInCostModal = () => {
    document.getElementById("move_in_cost_modal").showModal();
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
        <RoomPicCarousel t={t} />

        <DetailComponent
          propertyName={propertyName}
          unitRoomName={unitRoomName}
          address={address}
        />

        <div className="grid grid-cols-6 gap-3 items-center pb-7">
          <CustomButton
            icon={
              _.isEqual(selectDetail, "Tenancy")
                ? Images.tenancyIconActive
                : Images.tenancyIcon
            }
            buttonClassName={`col-span-3 ${_.isEqual(selectDetail, "Tenancy") ? "primary-btn" : "default-btn"} flex-row-reverse`}
            textClassName="font-size-normal"
            buttonText={t("propertyDetail.tenancy")}
            imageStyle={{ width: "20px", height: "20px" }}
            onClick={() => onClickSelectDetail("Tenancy")}
          />

          <CustomButton
            icon={
              _.isEqual(selectDetail, "Tenancy")
                ? Images.policyIcon
                : Images.policyIconActive
            }
            imageStyle={{ width: "20px", height: "20px" }}
            buttonClassName={`col-span-3 ${_.isEqual(selectDetail, "Policy") ? "primary-btn" : "default-btn"} flex-row-reverse`}
            textClassName="font-size-normal disable-text"
            buttonText={t("propertyDetail.policy")}
            onClick={() => onClickSelectDetail("Policy")}
          />
        </div>

        {_.isEqual(showPolicy, true) ? (
          <div>
            <DetailFeatureSection
              t={t}
              rental={rental}
              bedType={bedType}
              bathroom={bathroom}
            />
            <Description t={t} description={description} />
            <Facilities t={t} facilitiesList={facilitiesList} />
            {/*<RoomzMap t={t} />*/}
            <RecommendSection
              t={t}
              recommendedList={recommendedList}
              onClickToPropertyOverview={onClickToPropertyOverview}
            />
          </div>
        ) : (
          <div>
            <PolicyDetail t={t} />
          </div>
        )}

        <AgentSection
          t={t}
          onClickBooking={onClickBooking}
          onClickToBookAppointment={onClickToBookAppointment}
          data={listingPropertyDetailData}
          onClickOpenMoveInCostModal={onClickOpenMoveInCostModal}
        />

        <LoadingOverlay loading={listingPropertyDetailDataLoading} />

        <MoveInCostModal
          openCharges={openCharges}
          onClickOpenCharges={onClickOpenCharges}
          lists={lists}
        />

        <CustomModal id="rent_charges_details">
          <CustomText textClassName="font-size-large font-bold pb-2">
            Rent Charges Details
          </CustomText>
          <CustomText textClassName="disable-text font-size-xsmall text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            dignissim, dui placerat dignissim vestibulum, dolor dui tempus ex,
            sit amet pulvinar lectus sapien at dui. Proin et lacus sed velit
            iaculis dictum porttitor quis nisi. Phasellus sodales tincidunt
            lacus, nec dignissim nulla blandit in. Donec vel turpis id augue
            dignissim hendrerit vitae eu nulla.  Should you have any inquiries,
            please contact the owner or agent before proceeding with your
            payment.
          </CustomText>
        </CustomModal>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(PropertyDetail);
