import CustomText from "@/components/CustomText";
import RecommendComponent from "@/components/PropertyOverview/RecommendComponent";
import { isEmpty } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";

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
        <div className="flex justify-center flex-1 py-10">
          <CustomEmptyBox
            emptyTitle="No recommend property found"
            emptyDesc="Recommend property not available for now. "
          />
        </div>
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
