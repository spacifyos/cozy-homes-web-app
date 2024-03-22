import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const FeatureComponent = ({ icon, title, pb }) => {
  return (
    <div className={`flex justify-between items-center pb-${pb}`}>
      <div className="flex items-center">
        <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-2 mr-3">
          <CustomImage src={icon} imageStyle={{ width: 30, height: 30 }} />
        </div>
        <CustomText textClassName="font-size-small">{title}</CustomText>
      </div>

      <CustomImage
        src={Images.rightIcon}
        imageStyle={{ width1: 16, height: 16 }}
      />
    </div>
  );
};

export default FeatureComponent;
