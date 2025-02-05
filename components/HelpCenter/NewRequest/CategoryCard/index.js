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
  subType,
}) => {
  return (
    <div className="col-span-2 pb-4">
      <div className=" flex flex-col justify-center items-center">
        <div
          className={`${isEqual(selectedValue, value) ? "bg-primary" : "bg-primary-background"} p-2 mb-2`}
          style={{ borderRadius: 100 }}
        >
          <CustomImage
            className="cursor-pointer"
            src={`${isEqual(selectedValue, value) ? icon : iconActive}`}
            imageStyle={{ width: 30, height: 30 }}
            onClick={() => onClickChangeSection(value, subType)}
          />
        </div>

        <CustomText textClassName="font-bold text-xs">{btnText}</CustomText>
        <CustomText textClassName="disable-text text-xs text-center">
          {btnDescription}
        </CustomText>
      </div>
    </div>
  );
};

export default CategoryCard;
