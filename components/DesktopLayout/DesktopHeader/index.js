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
      className="py-4 primaryWhite-bg-color"
      style={{ minHeight: 100, borderBottom: "3px #f5f8fd solid" }}
    >
      <div className="container mx-auto flex xl:justify-between lg:justify-between md:justify-between sm:justify-center justify-center items-center">
        <CustomImage
          src={Image.logoHorizontalColor}
          imageStyle={{ width: 130 }}
          onClick={onClickExplore}
          className="cursor-pointer"
        />

        {isEmpty(data) ? (
          <div className="flex gap-3 hidden xl:flex lg:flex md:flex">
            <CustomButton
              icon={loading ? "" : Image.registerIcon}
              imageStyle={{ width: 13 }}
              buttonText={`Register`}
              buttonClassName={`${loading ? "primary-btn" : "primary-btn"} min-w-44`}
              textClassName="font-size-small"
              reverse
              loading={loading}
              onClick={loading ? "" : onClickSignUp}
            />

            <CustomButton
              icon={Image.primaryLogoutIcon}
              buttonText={`Sign In`}
              buttonClassName="default-btn w-36"
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
