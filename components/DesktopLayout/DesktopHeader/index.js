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
  onClickLogout,
  onClickChat,
}) => {
  const name = authSelector.getName(data);

  return (
    <div
      className="primaryWhite-bg-color"
      style={{ borderBottom: "3px #f5f8fd solid" }}
    >
      <div className="container mx-auto flex xl:justify-between lg:justify-between md:justify-between sm:justify-center justify-center items-center">
        <CustomImage
          src={Image.logoHorizontalColor}
          onClick={onClickExplore}
          className="cursor-pointer xl:w-40 lg:w-36 md:w-36 sm:w-36 w-28"
        />

        {isEmpty(data) ? (
          <div className="flex gap-3 hidden xl:flex lg:flex md:flex">
            <CustomButton
              icon={loading ? "" : Image.registerIconActive}
              imageStyle={{ width: 13 }}
              buttonText={`Register`}
              buttonClassName={`default-btn min-w-44 min-h-10 h-10`}
              textClassName="font-size-small"
              reverse
              loading={loading}
              onClick={loading ? "" : onClickSignUp}
            />

            <CustomButton
              icon={Image.primaryLogoutIcon}
              buttonText={`Sign In`}
              buttonClassName="default-btn w-36 min-h-10 h-10"
              textClassName="font-size-small"
              reverse
              onClick={onClickSignIn}
            />
          </div>
        ) : (
          <div className="flex gap-3 hidden xl:flex lg:flex md:flex">
            <CustomButton
              icon={Image.homeIconActive}
              buttonText={`My Property`}
              buttonClassName="default-btn w-36"
              reverse
              onClick={onClickMyProperty}
            />

            <CustomButton
              icon={Image.registerIconActive}
              imageStyle={{ width: 13 }}
              buttonText={`Hi, ${name}`}
              buttonClassName={`default-btn min-w-44`}
              reverse
              loading={loading}
              onClick={onClickMyAccount}
            />

            <CustomButton
              icon={Image.primaryLogoutIcon}
              buttonText={`Log Out`}
              buttonClassName="default-btn w-36"
              reverse
              onClick={onClickLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopHeader;
