import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";

const DetailFeatureSection = ({ t, rental, bedType, bathroom, squareFeet }) => {
  const lists = [
    {
      icon: Images.bathAmenitiesIcon,
      title: t("propertyDetail.bathRoom"),
      value: _.isEmpty(bathroom) ? "-" : bathroom,
    },
    {
      icon: Images.bedInactiveIcon,
      title: t("propertyDetail.bed"),
      value: _.isEmpty(bedType) ? "-" : bedType,
    },
    {
      icon: Images.squareIcon,
      title: t("propertyDetail.squareFt"),
      value: `${_.isEmpty(squareFeet) ? "-" : squareFeet} Sqft`,
    },
    {
      icon: Images.rentalFeeIcon,
      title: t("propertyDetail.rentalFee"),
      value: `RM ${_.isEmpty(rental) ? "0" : rental} / mth`,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 pb-5">
      {_.map(lists, (list, index) => {
        return (
          <div
            className={`detail-feature-container ${index === 3 ? "secondary-bg-color" : ""} flex flex-col`}
            key={index}
          >
            {/*<div>*/}
            <div style={{ width: 25, height: 25 }}>
              <CustomImage
                src={_.get(list, ["icon"], "")}
                imageStyle={{ width: 25 }}
              />
            </div>
            {/*<CustomText textClassName="disable-text font-size-xxsmall max-h-9 leading-3 my-1">*/}
            {/*  {_.get(list, ["title"], "")}*/}
            {/*</CustomText>*/}
            {/*</div>*/}

            <div className="flex items-center pt-1" style={{ height: 36 }}>
              <CustomText
                textClassName={`primary-text text-xs font-bold`}
                lineClamp={2}
              >
                {_.get(list, ["value"], "")}
              </CustomText>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailFeatureSection;
