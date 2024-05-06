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

export { getServerSideProps };

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
  const [isBookMarks, setIsBookMarks] = useState(true);

  const description = listingSelector.getDescription(listingPropertyDetailData);
  const rental = listingSelector.getRental(listingPropertyDetailData);
  const fees = listingSelector.getFees(listingPropertyDetailData);
  const recommendedList = listingSelector.getRecommended(listingPropertyDetailData);
  const facilitiesList = listingSelector.getFacilities(
    listingPropertyDetailData,
  );
  const bedType = listingSelector.getBedType(listingPropertyDetailData);
  const bathroom = listingSelector.getBathroom(listingPropertyDetailData);

  useEffect(() => {
    fetchListingPropertyDetail(1);
  }, []);

  const fetchListingPropertyDetail = (id) => {
    getListingPropertyDetailRequest(id);
  };

  const onClickToBookAppointment = () => {
    router.push("/property-overview/1/book-appointment");
  };
  const onClickGoBack = () => {
    router.back();
  };

  const onClickRightButton = () => {
    setIsBookMarks(!isBookMarks);
  };

  const onClickSelectDetail = (select) => {
    setSelectedDetail(select);
  };

  useEffect(() => {
    setShowPolicy(selectDetail === "Tenancy");
  }, [selectDetail]);

  const onClickBooking = () => {
    router.push(`/booking/1`);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.propertyDetail")}
      hideBgImage
      onClickGoBack={onClickGoBack}
      onClickRightButton={onClickRightButton}
      HeaderImageStyle={{ width: "30px", height: "30px" }}
      rightButtonIcon={
        isBookMarks ? Images.bookMarksIcon : Images.bookMarksIconActive
      }
    >
      <div className="body-container pb-32">
        <RoomPicCarousel t={t} />
        <DetailComponent
          t={t}
          onClickSelectDetail={onClickSelectDetail}
          selectDetail={selectDetail}
        />

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
            <RecommendSection t={t} recommendedList={recommendedList} />
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
        />

        <LoadingOverlay loading={listingPropertyDetailDataLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(PropertyDetail);
