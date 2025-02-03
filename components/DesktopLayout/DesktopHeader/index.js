import CustomImage from "@/components/CustomImage";
import Image from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import { get, isEmpty, isEqual } from "lodash";
import { useRouter } from "next/router";
import * as authSelector from "@/src/selectors/auth";

const DesktopHeader = ({
  onClickSignIn,
  onClickSignUp,
  data,
  loading,
  onClickMyAccount,
  onClickExplore,
}) => {
  const name = authSelector.getName(data);
  const router = useRouter();

  const pathname = get(router, ["pathname"], "");

  return (
    <div
      className="primaryWhite-bg-color"
      style={{ borderBottom: "3px #f5f8fd solid" }}
    >
      {isEqual(pathname, "/") ? (
        <div className="container mx-auto py-2 flex xl:justify-between lg:justify-between md:justify-between sm:justify-between justify-between items-center">
          <CustomImage
            src={Image.logoHorizontalColor}
            onClick={onClickExplore}
            className="cursor-pointer xl:w-40 lg:w-36 md:w-36 sm:w-36 w-32"
          />

          {isEmpty(data) ? (
            <div className="flex gap-3 flex">
              {loading ? (
                false
              ) : (
                <div>
                  {/*<CustomButton*/}
                  {/*    icon={Image.registerIconActive}*/}
                  {/*    imageStyle={{ width: 13 }}*/}
                  {/*    buttonText={`Register`}*/}
                  {/*    buttonClassName={`default-btn min-w-44 min-h-10 h-10 xl:flex lg:flex md:hidden sm:hidden hidden`}*/}
                  {/*    textClassName="text-sm"*/}
                  {/*    reverse*/}
                  {/*    onClick={onClickSignUp}*/}
                  {/*/>*/}

                  {/*<CustomButton*/}
                  {/*    icon={Image.registerIconActive}*/}
                  {/*    imageStyle={{ width: 13 }}*/}
                  {/*    // buttonText={`Register`}*/}
                  {/*    buttonClassName={`default-btn min-h-10 h-10 xl:hidden lg:hidden w-16`}*/}
                  {/*    textClassName="text-sm"*/}
                  {/*    reverse*/}
                  {/*    onClick={onClickSignUp}*/}
                  {/*/>*/}
                </div>
              )}

              <CustomButton
                icon={loading ? "" : Image.primaryLogoutIcon}
                buttonText={`Sign In`}
                buttonClassName="default-btn w-36 min-h-10 h-10 xl:flex lg:flex md:hidden sm:hidden hidden"
                textClassName="text-sm"
                reverse
                loadingColor="primary-text"
                loading={loading}
                onClick={onClickSignIn}
              />

              <CustomButton
                  icon={loading ? "" : Image.primaryLogoutIcon}
                  buttonText={`Sign In`}
                  buttonClassName="default-btn min-h-10 h-10 xl:hidden lg:hidden"
                  textClassName="text-sm"
                  reverse
                  loadingColor="primary-text"
                  loading={loading}
                  onClick={onClickSignIn}
              />
            </div>
          ) : (
            <div className="flex gap-3 flex">
              <CustomButton
                icon={Image.registerIconActive}
                imageStyle={{ width: 13 }}
                textClassName="text-xs"
                buttonText={`Hi, ${name}`}
                buttonClassName={`default-btn min-w-40 xl:flex lg:flex md:hidden sm:hidden hidden`}
                reverse
                loading={loading}
                onClick={onClickMyAccount}
              />

              <CustomButton
                icon={Image.registerIconActive}
                imageStyle={{ width: 13 }}
                textClassName="text-xs"
                // buttonText={`Hi, ${name}`}
                buttonClassName={`default-btn xl:hidden lg:hidden w-16`}
                reverse
                loading={loading}
                onClick={onClickMyAccount}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="container mx-auto py-2 flex xl:justify-between lg:justify-between md:justify-between sm:justify-center justify-center items-center">
          <CustomImage
            src={Image.logoHorizontalColor}
            onClick={onClickExplore}
            className="cursor-pointer xl:w-40 lg:w-36 md:w-36 sm:w-36 w-32"
          />

          {isEmpty(data) ? (
            <div className="flex gap-3 hidden xl:flex lg:flex md:flex">
              {loading ? (
                false
              ) : (
                <CustomButton
                  icon={Image.registerIconActive}
                  imageStyle={{ width: 13 }}
                  buttonText={`Register`}
                  buttonClassName={`default-btn min-w-44 min-h-10 h-10`}
                  textClassName="text-sm"
                  reverse
                  onClick={onClickSignUp}
                />
              )}

              <CustomButton
                icon={loading ? "" : Image.primaryLogoutIcon}
                buttonText={`Sign In`}
                buttonClassName="default-btn w-36 min-h-10 h-10"
                textClassName="text-sm"
                reverse
                loadingColor="primary-text"
                loading={loading}
                onClick={onClickSignIn}
              />
            </div>
          ) : (
            <div className="flex gap-3 hidden xl:flex lg:flex md:flex">
              <CustomButton
                icon={Image.registerIconActive}
                imageStyle={{ width: 13 }}
                buttonText={`Hi, ${name}`}
                buttonClassName={`default-btn min-w-44`}
                reverse
                loading={loading}
                onClick={onClickMyAccount}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopHeader;
