import CustomText from "@/components/CustomText";
import { map, isEmpty, size, get } from "lodash";

const CustomDropdown = ({ items, top, onClickDownloadDocument }) => {
  return (
    <div
      className="absolute  right-4 global-border-radius global-box-shadow bg-white max-w-36 min-w-10 z-50 global-border"
      style={{ top: top }}
    >
      <div className="flex flex-col justify-center items-center w-36 ">
        {map(items, (item, index) => {
          const name = get(item, ["name"], "");
          const value = get(item, ["value"], "");

          return isEmpty(value) ? (
            false
          ) : (
            <CustomText
              key={index}
              textClassName="p-2 cursor-pointer w-full text-center xl:text-sm lg:text-sm md:text-sn sm:text-xs text-xs"
              onClick={() => onClickDownloadDocument(value)}
              styles={{
                borderBottom:
                  size(items) !== index + 1 ? "1px solid #CCE4E8" : "none",
              }}
            >
              {name}
            </CustomText>
          );
        })}
      </div>
    </div>
  );
};

export default CustomDropdown;
