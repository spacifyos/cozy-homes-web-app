import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";

const DesktopHeader = ({ onClickSignIn, onClickSignUp }) => {
  return (
    <div
      className="py-4 primaryWhite-bg-color"
      style={{ height: 100, borderBottom: "3px #f5f8fd solid" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href={"/explore"}>
          <CustomImage
            src={Image.logoHorizontalColor}
            imageStyle={{ width: 130 }}
          />
        </a>

        <div className="flex gap-3">
          <CustomButton
            icon={Image.registerIcon}
            imageStyle={{ width: 13 }}
            buttonText="Register"
            buttonClassName="primary-btn w-32"
            reverse
            onClick={onClickSignUp}
          />

          <CustomButton
            icon={Image.primaryLogoutIcon}
            buttonText="Sign In"
            buttonClassName="default-btn w-32"
            reverse
            onClick={onClickSignIn}
          />

          <CustomButton
            icon={Image.chatOutlineIcon}
            buttonText="Chat"
            imageStyle={{ width: 18 }}
            buttonClassName="default-btn w-32"
            reverse
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
