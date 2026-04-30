import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty, isString } from "lodash";
import { ChevronRightIcon } from "@/components/Icons";

const FeatureComponent = ({
  icon,
  title,
  pb,
  imageWidth = 30,
  imageHeight = 30,
  onClick,
  route,
  target = "_self",
}) => {
  const isSvgIcon = !isString(icon) && icon != null;
  const IconComponent = isSvgIcon ? icon : null;
  const iconSize = Math.max(imageWidth, imageHeight);

  const renderIcon = () =>
    isSvgIcon ? (
      <IconComponent size={iconSize} className="text-primary" />
    ) : (
      <CustomImage
        src={icon}
        imageStyle={{ width: imageWidth, height: imageHeight }}
      />
    );

  return isEmpty(route) ? (
    <div
      className={`flex justify-between items-center cursor-pointer pb-${pb}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div
          className="bg-white global-box-shadow global-border-radius p-2 mr-3 flex justify-center items-center"
          style={{ width: 46, height: 46 }}
        >
          {renderIcon()}
        </div>
        <CustomText textClassName="xl:text-sm lg:text-sm md:text-xs text-xs">{title}</CustomText>
      </div>

      <ChevronRightIcon size={10} className="text-black" />
    </div>
  ) : (
    <a
      target={target}
      href={route}
      className={`flex justify-between items-center cursor-pointer pb-${pb}`}
    >
      <div className="flex items-center pr-2">
        <div
          className="bg-white global-box-shadow global-border-radius p-2 mr-3 flex justify-center items-center"
          style={{ width: 46, height: 46 }}
        >
          {renderIcon()}
        </div>
        <CustomText textClassName="xl:text-sm lg:text-sm md:text-xs text-xs">{title}</CustomText>
      </div>

      <ChevronRightIcon size={10} className="text-black" />
    </a>
  );
};

export default FeatureComponent;
