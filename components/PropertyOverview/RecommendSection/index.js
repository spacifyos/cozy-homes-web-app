import CustomText from "@/components/CustomText";
import RecommendComponent from "@/components/PropertyOverview/RecommendComponent";

const RecommendSection = ({ t, recommendedList }) => {
  return (
    <div className="pb-2">
      <CustomText textClassName="section-title">
        {t("propertyDetail.recommend")}
      </CustomText>
      <RecommendComponent t={t} recommendedList={recommendedList} />
    </div>
  );
};
export default RecommendSection;
