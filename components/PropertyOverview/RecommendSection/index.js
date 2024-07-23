import CustomText from "@/components/CustomText";
import RecommendComponent from "@/components/PropertyOverview/RecommendComponent";
import { isEmpty } from "lodash";

const RecommendSection = ({
  t,
  recommendedList,
  onClickToPropertyOverview,
}) => {
  return (
    <div className="mb-5 content-container">
      <CustomText textClassName="section-title">
        {t("propertyDetail.recommend")}
      </CustomText>
      {isEmpty(recommendedList) ? (
        <CustomText>Recommend property not available for now. </CustomText>
      ) : (
        <RecommendComponent
          t={t}
          recommendedList={recommendedList}
          onClickToPropertyOverview={onClickToPropertyOverview}
        />
      )}
    </div>
  );
};
export default RecommendSection;
