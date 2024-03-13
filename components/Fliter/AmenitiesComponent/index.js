import _ from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const AmenitiesComponent = ({ list }) => {
  return (
    <div className="grid grid-cols-1 gap-6 primaryWhite-bg-color px-3 py-6 global-box-shadow global-border-radius">
      {_.map(list, (item) => {
        const name = _.get(item, ["name"], "");
        const icon = _.get(item, ["icon"], "");
        const isActive = _.get(item, ["isActive"], false);

        return (
          <div className="flex flex-col justify-center items-center">
            <CustomImage src={icon} width={25} height={25} className="mb-1" />
            <CustomText
              textClassName={`${isActive ? "primary-text" : "disable-text"} text-center font-size-xxsmall `}
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
