import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";

const DetailFeatureSection = ({ t, rental, bedType, bathroom, squareFeet }) => {
  const lists = [
    {
      icon: Images.bathAmenitiesIcon,
      isRentalFee: false,
      title: t("propertyDetail.bathRoom"),
      value: _.isEmpty(bathroom) ? "-" : bathroom,
    },
    {
      icon: Images.bedInactiveIcon,
      isRentalFee: false,
      title: t("propertyDetail.bed"),
      value: _.isEmpty(bedType) ? "-" : bedType,
    },
    {
      icon: Images.squareIcon,
      isRentalFee: false,
      title: t("propertyDetail.squareFt"),
      value: _.isEmpty(squareFeet) ? "-" : squareFeet,
    },
    {
      icon: Images.rentalFeeIcon,
      isRentalFee: true,
      title: t("propertyDetail.rentalFee"),
      value: _.isEmpty(rental) ? "0" : rental,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 pb-7">
      {_.map(lists, (list) => {
        const isRentalFee = _.get(list, ["isRentalFee"], false);
        return (
          <div
            className={`detail-feature-container ${isRentalFee ? "secondary-bg-color" : ""}`}
          >
            <CustomImage src={_.get(list, ["icon"], "")} width={20} />
            <CustomText textClassName="disable-text font-size-xxsmall h-9 leading-3 mb-1">
              {_.get(list, ["title"], "")}
            </CustomText>
            <CustomText
              textClassName={`primary-text font-size-small font-bold`}
              lineClamp={2}
            >
              {isRentalFee ? "RM" : ""} {_.get(list, ["value"], "")}
            </CustomText>
          </div>
        );
      })}
    </div>
  );
};

export default DetailFeatureSection;
