import _ from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import * as listingSelector from "@/src/selectors/listing";

const AmenitiesComponent = ({ list, onClickSelectAmenities }) => {
  return (
    <div
      className="amenities-nav-container"
      style={{ height: 500, top: 10, borderRadius: "0 10px 10px 0" }}
    >
      {_.map(list, (item, index) => {
        const name = listingSelector.getName(item);
        const icon = listingSelector.getImageUrl(item);
        const iconActive = _.get(item, ["iconActive"], "");
        const isActive = _.get(item, ["isActive"], false);

        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={() => onClickSelectAmenities(name)}
          >
            <CustomImage
              src={isActive ? iconActive : icon}
              width={25}
              height={25}
            />
            <CustomText
              textClassName={`${isActive ? "primary-text" : "disable-text"} text-center font-size-xxsmall`}
            >
              {name}
            </CustomText>
          </div>
        );
      })}
    </div>
  );
};

export default AmenitiesComponent;
