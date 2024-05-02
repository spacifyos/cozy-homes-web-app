import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import RoomPicCarousel from "@/components/PropertyDetail/RoomPicCarousel";
import DetailComponent from "@/components/PropertyDetail/DetailComponent";
import DetailFeatureSection from "@/components/PropertyDetail/DetailFeatureSection";
import Facilities from "@/components/PropertyDetail/Facilities";
import AgentSection from "@/components/PropertyDetail/AgentSection";
import RoomzMap from "@/components/PropertyDetail/RoomzMap";
import RecommendSection from "@/components/PropertyDetail/RecommendSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import PolicyDetail from "@/components/PropertyDetail/PolicyDetail";
import _ from "lodash";
import Description from "@/components/Detail/Description";

export { getServerSideProps };

const Detail = ({}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectDetail, setSelectedDetail] = useState("Tenancy");
  const [isBookMarks, setIsBookMarks] = useState(true);
  const FeatureLists = [
    {
      icon: Images.bathAmenitiesIcon,
      name: t("propertyDetail.bathRoom"),
      detail: t("propertyDetail.shared"),
    },
    {
      icon: Images.bedInactiveIcon,
      name: t("propertyDetail.bed"),
      detail: t("propertyDetail.queen"),
    },
    {
      icon: Images.squareIcon,
      name: t("propertyDetail.squareFt"),
      detail: "150",
    },
    {
      icon: Images.rentalFeeIcon,
      name: t("propertyDetail.rentalFee"),
      detail: "RM750",
      bgColor: "secondary-bg-color",
    },
  ];
  const onClickToBookAppointment = (id) => {
    router.push(`/property-overview/${id}/book-appointment`);
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

  const onClickBooking = (id) => {
    router.push(`/booking/${id}`);
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

        {_.isEqual(selectDetail, "Tenancy") ? (
          <div>
            <div className="grid grid-cols-4 gap-2 pb-7">
              {_.map(FeatureLists, (item, index) => {
                return <DetailFeatureSection t={t} item={item} key={index} />;
              })}
            </div>
            <Description t={t} />
            <Facilities t={t} />
            <RoomzMap t={t} />
            <RecommendSection t={t} />
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
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Detail);
