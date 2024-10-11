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

const DesktopLayout = ({ children, page, hideNav = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [userType, setUserType] = useState("");

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  useEffect(() => {
    if (isEmpty(userProfileData)) {
      console.log(userProfileData);
      fetchUserprofileData();
    }
  }, []);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
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

  return (
    <div className="flex flex-col primaryWhite-bg-color w-full min-h-screen relative desktop-responsive">
      <DesktopHeader
        onClickSignIn={onClickSignIn}
        onClickSignUp={onClickSignUp}
        loading={userProfileLoading}
        data={userProfileData}
        onClickMyProperty={onClickMyProperty}
        onClickMyAccount={onClickMyAccount}
        onClickExplore={onClickExplore}
      />

      {hideNav ? (
        <div className="flex-1 h-full">{children}</div>
      ) : (
        <div className="flex-1 h-full flex flex-col container mx-auto py-10">
          <CustomText textClassName="font-size-xxlarge font-bold pb-5">
            {isEmpty(page) ? "-" : page}
          </CustomText>

          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-1">
              <DesktopNavigationBar />
            </div>

            <div className="col-span-3"> {children}</div>
          </div>
        </div>
      )}

      <DesktopFooter />

      <SignInModal userType={userType} setUserType={setUserType} />
      <SignUpModal userType={userType} setUserType={setUserType} />
    </div>
  );
};

export default DesktopLayout;
