import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";

const DetailFeatureSection = ({ rental, bedType, bathroom, squareFeet }) => {
  const lists = [
    {
      icon: Images.bathAmenitiesIcon,
      title: "Bath Room",
      value: _.isEmpty(bathroom) ? "-" : bathroom,
    },
    {
      icon: Images.bedInactiveIcon,
      title: "Bed",
      value: _.isEmpty(bedType) ? "-" : bedType,
    },
    {
      icon: Images.squareIcon,
      title: "Sqft",
      value: `${_.isEmpty(squareFeet) ? "-" : squareFeet} Sqft`,
    },
    {
      icon: Images.rentalFeeIcon,
      title: "Rental Fee",
      value: `RM ${_.isEmpty(rental) ? "0" : rental} / mth`,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 pb-5">
      {_.map(lists, (list, index) => {
        return (
          <div
            className={`detail-feature-container ${index === 3 ? "bg-secondary-background" : "bg-white"} flex flex-col`}
            key={index}
          >
            {/*<div>*/}
            <div style={{ width: 25, height: 25 }}>
              <CustomImage
                src={_.get(list, ["icon"], "")}
                imageStyle={{ width: 25 }}
              />
            </div>
            {/*<CustomText textClassName="text-disable text-xs max-h-9 leading-3 my-1">*/}
            {/*  {_.get(list, ["title"], "")}*/}
            {/*</CustomText>*/}
            {/*</div>*/}

            <div className="flex items-center pt-1" style={{ height: 36 }}>
              <CustomText
                textClassName={`text-primary text-xs font-bold`}
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
