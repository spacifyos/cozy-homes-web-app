import DesktopHeader from "@/components/DesktopLayout/DesktopHeader";
import DesktopFooter from "@/components/DesktopLayout/DesktopFooter";
import DesktopNavigationBar from "@/components/DesktopLayout/DesktopNavigationBar";
import { isEmpty, isEqual } from "lodash";
import Helper from "@/src/utils/Helper";
import SignInModal from "@/components/Explore/SignInModal";
import SignUpModal from "@/components/Explore/SignUpModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as authAction from "@/src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "@/src/selectors/auth";
import CustomImage from "@/components/CustomImage";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import AuthManager from "@/src/utils/AuthManager";

const DesktopLayout = ({
  children,
  hideNav = false,
  rightSecondButtonIcon,
  onClickRightSecondButton,
  onClickRightButton,
  rightButtonIcon,
  rightContent,
  isFiltered,
  loading,
  pageBreadcrumbs,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedUserType, setSelectedUserType] = useState("");

  const [userProfileData, setUserProfileData] = useState(false);
  const [userProfileLoading, setUserProfileLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  const userType = authSelector.getType(userProfileData);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AuthManager.retrieveToken();
      const type = await AuthManager.retrieveType();

      if (!isEmpty(token) && !isEmpty(type)) {
        if (isEmpty(userProfileData)) {
          await fetchUserprofileData();
        }
      }
    };

    checkAuthentication();
  }, []);

  const signOutAccountRequest = () =>
    dispatch(authAction.signOutAccountRequest());

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
    if (isEqual(userType, "tenant")) {
      return router.replace("/my-property");
    } else {
      return router.replace("/owner");
    }
  };

  const onClickMyAccount = () => {
    return router.replace("/account");
  };

  const onClickChat = () => {
    if (isEqual(userType, "tenant")) {
      return router.replace("/chat");
    } else {
      return router.replace("/owner/chat");
    }
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
        onClickChat={onClickChat}
      />

      {hideNav ? (
        <div className="flex-1 h-full">
          {isEmpty(pageBreadcrumbs) ? (
            false
          ) : (
            <div className="pb-5 container mx-auto xl:pt-6 lg:pt-6 md:pt-6 sm:pt-6 pt-4">
              {pageBreadcrumbs}
            </div>
          )}
          {children}
        </div>
      ) : (
        <div className="flex-1 h-full flex flex-col container mx-auto py-4 xl:py-6 lg:py-6 md:py-6 sm:py-6">
          <div className="flex justify-between items-center pb-5">
            {pageBreadcrumbs}

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
              <DesktopNavigationBar
                userData={userProfileData}
                onClickLogout={onClickLogout}
              />
            </div>

            <div className="col-span-4 xl:col-span-3 lg:col-span-3 md:col-span-3 md:col-span-3 sm:col-span-4">
              {children}
            </div>
          </div>
        </div>
      )}

      <DesktopFooter />

      <SignInModal
        userType={selectedUserType}
        setUserType={setSelectedUserType}
      />
      <SignUpModal
        userType={selectedUserType}
        setUserType={setSelectedUserType}
      />

      <LoadingOverlay loading={loading || signOutLoading} />
    </div>
  );
};

export default DesktopLayout;
