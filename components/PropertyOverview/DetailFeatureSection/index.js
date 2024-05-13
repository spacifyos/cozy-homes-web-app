import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";

const DetailFeatureSection = ({ t, rental, bedType, bathroom, squareFeet }) => {
  return (
    <div className="grid grid-cols-4 gap-2 pb-7">
      <div className="detail-feature-container">
        <CustomImage src={Images.bathAmenitiesIcon} width={20} />
        <CustomText textClassName="disable-text font-size-xxsmall h-8">
          {t("propertyDetail.bathRoom")}
        </CustomText>
        <CustomText textClassName="primary-text font-size-small font-bold">
          {_.isEmpty(bathroom) ? "-" : bathroom}
        </CustomText>
      </div>
      <div className="detail-feature-container">
        <CustomImage src={Images.bedInactiveIcon} width={20} />
        <CustomText textClassName="disable-text font-size-xxsmall h-8">
          {t("propertyDetail.bed")}
        </CustomText>
        <CustomText textClassName="primary-text font-size-small font-bold">
          {_.isEmpty(bedType) ? "-" : bedType}
        </CustomText>
      </div>
      <div className="detail-feature-container">
        <CustomImage src={Images.squareIcon} width={20} />
        <CustomText textClassName="disable-text font-size-xxsmall h-8">
          {t("propertyDetail.squareFt")}
        </CustomText>
        <CustomText textClassName="primary-text font-size-small font-bold">
          {_.isEmpty(squareFeet) ? "-" : squareFeet}
        </CustomText>
      </div>
      <div className="detail-feature-container secondary-bg-color">
        <CustomImage src={Images.rentalFeeIcon} width={20} />
        <CustomText textClassName="disable-text font-size-xxsmall h-8 leading-3">
          {t("propertyDetail.rentalFee")}
        </CustomText>
        <CustomText textClassName="primary-text font-size-small font-bold">
          RM{_.isEmpty(rental) ? "0" : rental}
        </CustomText>
      </div>
    </div>
  );
};

export default DetailFeatureSection;
