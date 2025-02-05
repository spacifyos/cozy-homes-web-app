import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import { get, isEmpty, isEqual, map } from "lodash";

const CustomSelectWithIcon = ({
  option,
  required,
  title,
  value,
  placeholder = "Please select",
  onClickSelect,
  onClickOpenSelect,
  openSelectBank,
}) => {
  const selectedLabel = get(value, ["label"], "");
  const selectedValue = get(value, ["value"], "");
  const selectedIcon = get(value, ["logo"], "");

  return (
    <div className="w-full pb-4">
      <div className="flex items-center">
        {required ? (
          <CustomText textClassName="error-message pr-1">*</CustomText>
        ) : (
          false
        )}
        <CustomText textClassName="input-title">{title}</CustomText>
      </div>
      <div className="booking-select-container relative">
        <div
          className="booking-select bg-white flex justify-between cursor-pointer"
          onClick={onClickOpenSelect}
        >
          {isEmpty(value) ? (
            <CustomText
              textClassName={`${isEmpty(value) ? "disable-text" : "text-black"} text-xs`}
            >
              {placeholder}
            </CustomText>
          ) : (
            <div className="flex items-center">
              <CustomImage
                src={selectedIcon}
                imageStyle={{ width: 30, marginRight: 10 }}
              />
              <CustomText textClassName="text-sm">
                {selectedLabel}
              </CustomText>
            </div>
          )}

          <CustomImage src={Images.downIcon} imageStyle={{ width: 10 }} />
        </div>

        {openSelectBank ? (
          <div
            className="absolute bg-white w-full py-2 px-4 grid gap-2 overflow-y-auto z-10"
            style={{
              borderRadius: "0 0 10px 10px",
              bottom: "-31",
              border: "1px solid #94a1a6",
              height: 400,
            }}
          >
            {isEmpty(option)
              ? false
              : map(option, (item, index) => {
                  const label = get(item, ["label"], "");
                  const value = get(item, ["value"], "");
                  const icon = get(item, ["logo"], "");

                  return (
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => onClickSelect(item)}
                    >
                      <div className="flex items-center">
                        <CustomImage
                          src={icon}
                          imageStyle={{ width: 30, marginRight: 10 }}
                        />
                        <CustomText textClassName="text-sm">
                          {label}
                        </CustomText>
                      </div>

                      {isEqual(selectedValue, value) ? (
                        <CustomImage
                          src={Images.checkIcon}
                          imageStyle={{ width: 15 }}
                        />
                      ) : (
                        false
                      )}
                    </div>
                  );
                })}
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
};

export default CustomSelectWithIcon;
