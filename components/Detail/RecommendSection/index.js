import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import FacilitiesComponent from "@/components/Detail/FacilitiesComponent";
import _ from "lodash";
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