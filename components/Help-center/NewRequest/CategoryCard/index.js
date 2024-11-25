import { isEqual } from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const CategoryCard = ({
  selectedValue,
  value,
  icon,
  iconActive,
  onClickChangeSection,
  btnText,
  btnDescription,
}) => {
  return (
    <div className="col-span-2 pb-4">
      <div className=" flex flex-col justify-center items-center">
        <div
          className={`${isEqual(selectedValue, value) ? "primary-bg-color" : "bg-color"} p-2 mb-2`}
          style={{ borderRadius: 100 }}
        >
          <CustomImage
            className="cursor-pointer"
            src={`${isEqual(selectedValue, value) ? icon : iconActive}`}
            imageStyle={{ width: 30, height: 30 }}
            onClick={() => onClickChangeSection(value)}
          />
        </div>

        <CustomText textClassName="font-bold text-xs">
          {btnText}
        </CustomText>
        <CustomText textClassName="disable-text font-size-xxsmall text-center ">
          {btnDescription}
        </CustomText>
      </div>
    </div>
  );
};

export default CategoryCard;
