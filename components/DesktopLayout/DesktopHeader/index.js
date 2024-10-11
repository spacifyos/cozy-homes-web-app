import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import { isEmpty } from "lodash";
import CustomText from "@/components/CustomText";
import * as authSelector from "@/src/selectors/auth";

const DesktopHeader = ({
  onClickSignIn,
  onClickSignUp,
  data,
  loading,
  onClickMyProperty,
  onClickMyAccount,
  onClickExplore,
}) => {
  const name = authSelector.getName(data);

  return (
    <div
      className="py-4 primaryWhite-bg-color"
      style={{ height: 100, borderBottom: "3px #f5f8fd solid" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <CustomImage
          src={Image.logoHorizontalColor}
          imageStyle={{ width: 130 }}
          onClick={onClickExplore}
          className="cursor-pointer"
        />

        <div className="flex gap-3">
          <CustomButton
            icon={
              loading
                ? ""
                : isEmpty(data)
                  ? Image.registerIcon
                  : Image.registerIconActive
            }
            imageStyle={{ width: 13 }}
            buttonText={`${loading ? "" : isEmpty(data) ? "Register" : `Hi, ${name}`}`}
            buttonClassName={`${loading ? "primary-btn" : isEmpty(data) ? "primary-btn" : "default-btn"} w-44`}
            reverse
            loading={loading}
            onClick={
              loading ? "" : isEmpty(data) ? onClickSignUp : onClickMyAccount
            }
          />

          <CustomButton
            icon={
              isEmpty(data) ? Image.primaryLogoutIcon : Image.homeIconActive
            }
            buttonText={`${isEmpty(data) ? "Sign In" : "My Property"}`}
            buttonClassName="default-btn w-36"
            reverse
            onClick={isEmpty(data) ? onClickSignIn : onClickMyProperty}
          />

          <CustomButton
            icon={
              isEmpty(data)
                ? Image.chatOutlineIcon
                : Image.navigateChatIconActive
            }
            buttonText="Chat"
            imageStyle={{ width: isEmpty(data) ? 18 : 26 }}
            buttonClassName="default-btn w-32"
            reverse
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
