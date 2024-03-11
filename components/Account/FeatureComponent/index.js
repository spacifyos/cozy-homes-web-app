import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const FeatureComponent = ({ icon, title, pb }) => {
  return (
    <div className={`flex justify-between items-center pb-${pb}`}>
      <div className="flex items-center">
        <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-3 mr-3">
          <CustomImage src={icon} height={20} width={20} />
        </div>
        <CustomText textClassName="font-size-large">{title}</CustomText>
      </div>

      <CustomImage className={"me-5 w-2.5"} src={Images.rightIcon} />
    </div>
  );
};

export default FeatureComponent;
