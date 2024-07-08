import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const OwnerHome = () => {
  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className="body-container py-9">
        <div className="flex items-center">
          <CustomText textClassName="white-text font-bold font-size-large">
            Welcome to{" "}
          </CustomText>
          <CustomImage
            src={Images.blackLogo}
            width={20}
            height={20}
            className="mx-1.5"
          />
          <CustomText textClassName="white-text font-bold font-size-large">
            Spacify
          </CustomText>
        </div>
      </div>

      <div className="px-4 absolute top-20 w-full">
        <div className="p-2 relative w-full primaryWhite-bg-color global-border-radius global-box-shadow z-10">
          <CustomImage src={Images.userIcon} />
        </div>
      </div>

      <div className="body-container primaryWhite-bg-color flex-1"></div>
    </div>
  );
};

export default OwnerHome;
