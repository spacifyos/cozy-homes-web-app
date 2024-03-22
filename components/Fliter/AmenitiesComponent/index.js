import _ from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const AmenitiesComponent = ({ list, onClickSelectAmenities }) => {
  return (
    <div
      className="amenities-container grid grid-cols-1 gap-5 primaryWhite-bg-color px-3 py-6 global-box-shadow global-border-radius sticky overflow-y-scroll"
      style={{ height: 600, top: 10 }}
    >
      {_.map(list, (item) => {
        const name = _.get(item, ["name"], "");
        const icon = _.get(item, ["icon"], "");
        const iconActive = _.get(item, ["iconActive"], "");
        const isActive = _.get(item, ["isActive"], false);

        return (
          <div
            className="flex flex-col justify-center items-center"
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
