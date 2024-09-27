import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";

const DesktopHeader = () => {
  return (
    <div className="container mx-auto py-4 primaryWhite-bg-color flex justify-between items-center">
      <CustomImage
        src={Image.logoHorizontalColor}
        imageStyle={{ width: 130 }}
      />

      <div className="flex gap-3">
        <CustomButton
          icon={Image.registerIcon}
          imageStyle={{ width: 15 }}
          buttonText="Register"
          buttonClassName="primary-btn"
        />
        <CustomButton
          icon={Image.primaryLogoutIcon}
          buttonText="Sign In"
          buttonClassName="default-btn"
        />
      </div>
    </div>
  );
};

export default DesktopHeader;
