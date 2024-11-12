import DesktopHeader from "@/components/DesktopLayout/DesktopHeader";
import DesktopFooter from "@/components/DesktopLayout/DesktopFooter";
import DesktopNavigationBar from "@/components/DesktopLayout/DesktopNavigationBar";
import CustomText from "@/components/CustomText";
import { isEmpty, isEqual } from "lodash";
import Helper from "@/src/utils/Helper";
import SignInModal from "@/components/Explore/SignInModal";
import SignUpModal from "@/components/Explore/SignUpModal";
import UserTypeSelectModal from "@/components/Explore/UserTypeSelectSection";
import { useEffect, useState } from "react";
import AuthManager from "@/src/utils/AuthManager";
import { useRouter } from "next/router";
import * as authAction from "@/src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "@/src/selectors/auth";
import CustomImage from "@/components/CustomImage";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";

const DesktopLayout = ({
  children,
  page,
  hideNav = false,
  rightSecondButtonIcon,
  onClickRightSecondButton,
  onClickRightButton,
  rightButtonIcon,
  rightContent,
  isFiltered,
  loading,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [userType, setUserType] = useState("");

  const [userProfileData, setUserProfileData] = useState(false);
  const [userProfileLoading, setUserProfileLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  const signOutAccountRequest = () =>
    dispatch(authAction.signOutAccountRequest());

  useEffect(() => {
    if (isEmpty(userProfileData)) {
      fetchUserprofileData();
    }
  }, []);

  const fetchUserprofileData = async () => {
    await apiRequest.getUChatUserRequest(
      setUserProfileLoading,
      getUserSuccessCallback,
    );
  };

  const getUserSuccessCallback = (res) => {
    setUserProfileData(res);
  };

  const onClickSignIn = () => {
    Helper.documentGetElementById("sign_in_modal").showModal();
  };

  const onClickSignUp = () => {
    Helper.documentGetElementById("sign_up_modal").showModal();
  };

  const onClickMyProperty = () => {
    router.push("/my-property");
  };

  const onClickMyAccount = () => {
    router.push("/account");
  };

  const onClickExplore = () => {
    router.push("/explore");
  };

  const onClickLogout = () => {
    setSignOutLoading(true);

    setTimeout(() => {
      setSignOutLoading(false);
      signOutAccountRequest();
    }, 2000);
  };

  return (
    <div className="flex flex-col primaryWhite-bg-color w-full min-h-screen relative">
      <DesktopHeader
        onClickSignIn={onClickSignIn}
        onClickSignUp={onClickSignUp}
        loading={userProfileLoading}
        data={userProfileData}
        onClickMyProperty={onClickMyProperty}
        onClickMyAccount={onClickMyAccount}
        onClickExplore={onClickExplore}
        onClickLogout={onClickLogout}
      />

      {hideNav ? (
        <div className="flex-1 h-full">{children}</div>
      ) : (
        <div className="flex-1 h-full flex flex-col container mx-auto py-4 xl:py-8 lg:py-8 md:py-8 sm:py-8">
          <div className="flex justify-between items-center pb-5">
            <CustomText textClassName="font-size-xxlarge font-bold">
              {isEmpty(page) ? "-" : page}
            </CustomText>

            <div className="flex justify-center items-center gap-4">
              {isEmpty(rightSecondButtonIcon) ? (
                false
              ) : (
                <CustomImage
                  src={rightSecondButtonIcon}
                  imageStyle={{ width: 23, height: 23 }}
                  onClick={onClickRightSecondButton}
                  className="cursor-pointer"
                />
              )}

              <div
                style={{ width: 23, height: 23 }}
                onClick={onClickRightButton}
                className="relative"
              >
                {isEmpty(rightButtonIcon) ? (
                  rightContent
                ) : (
                  <CustomImage
                    src={rightButtonIcon}
                    imageStyle={{ width: 23, height: 23 }}
                    onClick={onClickRightButton}
                    className="cursor-pointer"
                  />
                )}
                {isFiltered ? (
                  <div
                    className="w-2.5 h-2.5 rounded-2xl error-bg-color absolute "
                    style={{ top: -10, right: -10 }}
                  ></div>
                ) : (
                  false
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-1 sticky top-10 hidden xl:block lg:block md:block sm:hidden">
              <DesktopNavigationBar />
            </div>

            <div className="col-span-4 xl:col-span-3 lg:col-span-3 md:col-span-3 md:col-span-3 sm:col-span-4">
              {children}
            </div>
          </div>
        </div>
      )}

      <DesktopFooter />

      <SignInModal userType={userType} setUserType={setUserType} />
      <SignUpModal userType={userType} setUserType={setUserType} />

      <LoadingOverlay loading={loading || signOutLoading} />
    </div>
  );
};

export default DesktopLayout;
