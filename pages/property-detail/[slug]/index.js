import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import RoomPicCarousel from "@/components/Detail/RoomPicCarousel";
import DetailComponent from "@/components/Detail/DetailComponent";
import DetailFeatureSection from "@/components/Detail/DetailFeatureSection";
import Facilities from "@/components/Detail/Facilities";
import AgentSection from "@/components/Detail/AgentSection";
import RoomzMap from "@/components/Detail/RoomzMap";
import RecommendSection from "@/components/Detail/RecommendSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import PolicyDetail from "@/components/Detail/PolicyDetail";
import _ from "lodash";
import Description from "@/components/Detail/Description";

export { getServerSideProps };

const Detail = ({}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectDetail, setSelectedDetail] = useState("Tenancy");
  const [showPolicy, setShowPolicy] = useState(true);

  const onClickGoBack = () => {
    router.back();
  };

  const [isBookMarks, setIsBookMarks] = useState(true);

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
            <DetailFeatureSection t={t} />
            <Description t={t}/>
            <Facilities t={t} />
            <RoomzMap t={t} />
            <RecommendSection t={t} />
          </div>
        ) : (
          <div>
            <PolicyDetail t={t} />
          </div>
        )}

        <AgentSection t={t} onClickBooking={onClickBooking} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Detail);
