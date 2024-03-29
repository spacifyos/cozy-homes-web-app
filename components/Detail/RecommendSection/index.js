import CustomText from "@/components/CustomText";
import RecommendComponent from "@/components/Detail/RecommendComponent";

const RecommendSection = ({t}) => {
    return (
        <div className="pb-2">
            <CustomText textClassName="section-title">
                {t("property-detail.recommend")}
            </CustomText>
            <RecommendComponent t={t}/>
        </div>


    )
}
export default RecommendSection;