import DesktopHeader from "@/components/DesktopLayout/DesktopHeader";
import DesktopFooter from "@/components/DesktopLayout/DesktopFooter";
import DesktopNavigationBar from "@/components/DesktopLayout/DesktopNavigationBar";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";
import Helper from "@/src/utils/Helper";
import SignInModal from "@/components/Explore/SignInModal";
import SignUpModal from "@/components/Explore/SignUpModal";
import UserTypeSelectModal from "@/components/Explore/UserTypeSelectSection";
import { useEffect, useState } from "react";

const DesktopLayout = ({ children, page, hideNav = false }) => {
  const [userType, setUserType] = useState("");

  const onClickSignIn = () => {
    Helper.documentGetElementById("sign_in_modal").showModal();
  };

  const onClickSignUp = () => {
    Helper.documentGetElementById("sign_up_modal").showModal();
  };

  return (
    <div className="flex flex-col primaryWhite-bg-color w-full min-h-screen relative desktop-responsive">
      <DesktopHeader
        onClickSignIn={onClickSignIn}
        onClickSignUp={onClickSignUp}
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
