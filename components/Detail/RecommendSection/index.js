import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import FacilitiesComponent from "@/components/Detail/FacilitiesComponent";



const RecommendSection = ({t}) =>{

    return(
        <div className="py-5">
            <div>
                <CustomText textClassName="font-size-xxlarge font-bold pt-5 pb-4">
                    {t("detail.recommend")}
                </CustomText>




            </div>

        </div>





    )}
export default RecommendSection;