import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";


const DetailFeatureSection = ({ t }) => {

    return (
        <div className="grid grid-cols-4 gap-2 pb-5">
            <div className="detail-feature-container">

                    <CustomImage
                        src={Images.bathAmenitiesIcon}
                        width={20}
                    />
                    <CustomText textClassName="disable-text font-size-xxsmall h-8">   {t("property-detail.bathRoom")}</CustomText>
                <CustomText textClassName="primary-text font-size-small font-bold">{t("property-detail.shared")}</CustomText>

            </div>
            <div className="detail-feature-container">

                    <CustomImage
                        src={Images.bedInactiveIcon}
                        width={20}
                    />
                    <CustomText textClassName="disable-text font-size-xxsmall h-8">{t("property-detail.bed")}</CustomText>
                <CustomText textClassName="primary-text font-size-small font-bold">{t("property-detail.queen")}</CustomText>

            </div>
            <div className="detail-feature-container">

                    <CustomImage
                        src={Images.squareIcon}
                        width={20}
                    />
                    <CustomText textClassName="disable-text font-size-xxsmall h-8">{t("property-detail.squareFt")}</CustomText>
                <CustomText textClassName="primary-text font-size-small font-bold">150</CustomText>

            </div>
            <div className="detail-feature-container">

                    <CustomImage
                        src={Images.rentalFeeIcon}
                        width={20}
                    />
                    <CustomText textClassName="disable-text font-size-xxsmall h-8">{t("property-detail.rentalFee")}</CustomText>
                <CustomText textClassName="primary-text font-size-small font-bold">RM750</CustomText>

            </div>
        </div>
    );
};

export default DetailFeatureSection;

