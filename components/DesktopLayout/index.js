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
import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";

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
  footerPaddingBottom,
  isMinHeight = true,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const [selectedUserType, setSelectedUserType] = useState("");

  // const [userProfileData, setUserProfileData] = useState(false);
  // const [userProfileLoading, setUserProfileLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  const userType = authSelector.getType(userProfileData);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AuthManager.retrieveToken();
      const type = await AuthManager.retrieveType();

      if (!isEmpty(token) && !isEmpty(type) && isEmpty(userProfileData)) {
        fetchUserprofileData();
      }
    };

    checkAuthentication();
  }, []);

  const signOutAccountRequest = () =>
    dispatch(authAction.signOutAccountRequest());

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };
  //
  // const getUserSuccessCallback = (res) => {
  //   setUserProfileData(res);
  // };

  const onClickSignIn = () => {
    Helper.documentGetElementById("sign_in_modal").showModal();
  };

  const onClickSignUp = () => {
    Helper.documentGetElementById("sign_up_modal").showModal();
  };

  const onClickMyProperty = () => {
    if (isEqual(userType, "tenant")) {
      return router.replace("/user/my-property");
    } else {
      return router.replace("/user/owner");
    }
  };

  const onClickMyAccount = () => {
    return router.push("/user/account");
  };

  const onClickChat = () => {
    if (isEqual(userType, "tenant")) {
      return router.replace("/user/chat");
    } else {
      return router.replace("/user/owner/chat");
    }
  };

  const onClickExplore = () => {
    router.push("/");
  };

  const onClickLogoutModal = () => {
    Helper.documentGetElementById("logout_modal").showModal();
  };

  const onClickLogout = () => {
    onClickCancelLogout();
    setSignOutLoading(true);

    setTimeout(() => {
      setSignOutLoading(false);
      signOutAccountRequest();
    }, 2000);
  };

  const onClickCancelLogout = () => {
    Helper.documentGetElementById("logout_modal").close();
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
        onClickLogout={onClickLogoutModal}
        onClickChat={onClickChat}
      />

      {hideNav ? (
        <div
          className={`flex-1 h-full relative ${isMinHeight ? "min-h-screen" : ""}`}
        >
          {isEmpty(pageBreadcrumbs) ? (
            false
          ) : (
            <div className="pb-5 container mx-auto xl:pt-6 lg:pt-6 md:pt-6 sm:pt-6 pt-4">
              {pageBreadcrumbs}
            </div>
          )}
          {children}

          {loading ? (
            <div
              className={
                "absolute top-0 flex justify-center items-center h-full w-full"
              }
              style={{
                backgroundColor: "rgba(256,256,256,0.5)",
                zIndex: 9999,
              }}
            >
              <span className="loading loading-dots xl:loading-lg lg:loading-lg md:loading-md sm:loading-md loading-md primary-text"></span>
            </div>
          ) : (
            false
          )}
        </div>
      ) : (
        <div className="flex-1 h-full flex flex-col container mx-auto pb-4 xl:pb-8 lg:pb-8 md:pb-8 sm:pb-8 pt-4 xl:pt-6 lg:pt-6 md:pt-6 sm:pt-6">
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
                onClickLogout={onClickLogoutModal}
              />
            </div>

            <div
              className="col-span-4 xl:col-span-3 lg:col-span-3 md:col-span-3 md:col-span-3 sm:col-span-4 relative"
              style={{ minHeight: "80vh" }}
            >
              {children}

              {loading ? (
                <div
                  className={
                    "absolute top-0 left-0 flex justify-center items-center h-full w-full"
                  }
                  style={{
                    backgroundColor: "rgba(256,256,256,0.5)",
                    zIndex: 9999,
                  }}
                >
                  <span className="loading loading-dots xl:loading-lg lg:loading-lg md:loading-md sm:loading-md loading-md primary-text"></span>
                </div>
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      )}

      <DesktopFooter paddingBottom={footerPaddingBottom} />

      <SignInModal
        selectedUserType={selectedUserType}
        setSelectedUserType={setSelectedUserType}
        onClickSignUp={onClickSignUp}
      />

      <SignUpModal
        selectedUserType={selectedUserType}
        setSelectedUserType={setSelectedUserType}
      />

      <DesktopModal id="logout_modal">
        <div className="p-6">
          <div className="flex flex-col">
            <CustomText textClassName="text-xl font-bold pb-2">
              Confirm Logout
            </CustomText>
            <CustomText textClassName="text-sm pb-2">
              Are you sure want to logout?
            </CustomText>

            <div className=" pt-2 flex justify-end gap-4">
              <CustomButton
                buttonClassName={`primary-btn min-h-10 h-10 min-w-24 w-24`}
                buttonText="Cancel"
                onClick={onClickCancelLogout}
              />

              <CustomButton
                buttonClassName={`default-btn-outline min-h-10 h-10 min-w-24 w-24`}
                buttonText="Logout"
                onClick={onClickLogout}
              />
            </div>
          </div>
        </div>
      </DesktopModal>

      <LoadingOverlay loading={signOutLoading} />
    </div>
  );
};

export default DesktopLayout;
