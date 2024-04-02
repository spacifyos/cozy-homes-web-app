import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const DetailFeatureSection = ({ t }) => {
  return (
    <div className="grid grid-cols-4 gap-2 pb-7">
      <div className="detail-feature-container">
        <CustomImage src={Images.bathAmenitiesIcon} width={20} />
        <CustomText textClassName="disable-text font-size-xxsmall h-8">
          {" "}
          {t("propertyDetail.bathRoom")}
        </CustomText>
        <CustomText textClassName="primary-text font-size-small font-bold">
          {t("propertyDetail.shared")}
        </CustomText>
      </div>
      <div className="detail-feature-container">
        <CustomImage src={Images.bedInactiveIcon} width={20} />
        <CustomText textClassName="disable-text font-size-xxsmall h-8">
          {t("propertyDetail.bed")}
        </CustomText>
        <CustomText textClassName="primary-text font-size-small font-bold">
          {t("propertyDetail.queen")}
        </CustomText>
      </div>
      <div className="detail-feature-container">
        <CustomImage src={Images.squareIcon} width={20} />
        <CustomText textClassName="disable-text font-size-xxsmall h-8">
          {t("propertyDetail.squareFt")}
        </CustomText>
        <CustomText textClassName="primary-text font-size-small font-bold">
          150
        </CustomText>
      </div>
      <div className="detail-feature-container">
        <CustomImage src={Images.rentalFeeIcon} width={20} />
        <CustomText textClassName="disable-text font-size-xxsmall h-8 leading-3">
          {t("propertyDetail.rentalFee")}
        </CustomText>
        <CustomText textClassName="primary-text font-size-small font-bold">
          RM750
        </CustomText>
      </div>
    </div>
  );
};

export default DetailFeatureSection;
