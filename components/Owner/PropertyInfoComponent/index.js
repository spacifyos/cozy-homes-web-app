import { get, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const PropertyInfoComponent = ({ lists }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {map(lists, (list, index) => {
        const name = get(list, ["name"], "");
        const value = get(list, ["value"], "");
        const icon = get(list, ["icon"], "");

        return (
          <div
            className="global-box-shadow global-border-radius p-2 flex flex-col items-center justify-center primaryWhite-bg-color"
            key={index}
          >
            <div imageStyle={{ width: 22, height: 22 }}>
              <CustomImage src={icon} imageStyle={{ width: 22, height: 22 }} />
            </div>

            <div className="pt-1">
              <CustomText textClassName="text-base font-bold text-center">
                {value}
              </CustomText>
              <CustomText
                styles={{ height: 30 }}
                textClassName="disable-text text-xs text-center flex items-center"
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
