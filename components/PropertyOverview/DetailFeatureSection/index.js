import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { isEmpty, map, get } from "lodash";
import Icons from "@/components/Icons";

const DetailFeatureSection = ({ rental, bedType, bathroom, squareFeet }) => {
  const lists = [
    {
      icon: Icons.bathroomIconDisable,
      title: "Bath Room",
      value: isEmpty(bathroom) ? "-" : bathroom,
    },
    {
      icon: Icons.bedIconDisable,
      title: "Bed",
      value: isEmpty(bedType) ? "-" : bedType,
    },
    {
      icon: Icons.squareIcon,
      title: "Sqft",
      value: `${isEmpty(squareFeet) ? "-" : squareFeet} Sqft`,
    },
    {
      icon: Icons.coinIconDisable,
      title: "Rental Fee",
      value: `RM ${isEmpty(rental) ? "0" : rental} / mth`,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 pb-5">
      {map(lists, (list, index) => {
        return (
          <div
            className={`detail-feature-container ${index === 3 ? "bg-secondary-background" : "bg-white"} flex flex-col`}
            key={index}
          >
            {/*<div>*/}
            <div style={{ width: 25, height: 25 }}>
              <CustomImage
                src={get(list, ["icon"], "")}
                imageStyle={{ width: 25 }}
              />
            </div>
            {/*<CustomText textClassName="text-disable text-xs max-h-9 leading-3 my-1">*/}
            {/*  {get(list, ["title"], "")}*/}
            {/*</CustomText>*/}
            {/*</div>*/}

            <div className="flex items-center pt-1" style={{ height: 36 }}>
              <CustomText
                textClassName={`text-primary text-xs font-bold`}
                lineClamp={2}
              >
                {get(list, ["value"], "")}
              </CustomText>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailFeatureSection;
