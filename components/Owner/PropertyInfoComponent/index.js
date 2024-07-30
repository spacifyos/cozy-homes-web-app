import { get, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const PropertyInfoComponent = ({ paddingTop = "4.5rem", lists }) => {
  return (
    <div className="grid grid-cols-4 gap-3" style={{ paddingTop: paddingTop }}>
      {map(lists, (list) => {
        const name = get(list, ["name"], "");
        const value = get(list, ["value"], "");
        const icon = get(list, ["icon"], "");

        return (
          <div className="global-box-shadow global-border-radius p-2 flex flex-col items-center justify-center primaryWhite-bg-color">
            <CustomImage src={icon} imageStyle={{ width: 20, height: 20 }} />

            <div className="pt-1">
              <CustomText textClassName="font-size-xlarge font-bold text-center">
                {value}
              </CustomText>
              <CustomText
                textClassName="disable-text font-size-xxsmall text-center"
                lineClamp={1}
              >
                {name}
              </CustomText>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyInfoComponent;
