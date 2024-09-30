import DesktopHeader from "@/components/DesktopLayout/DesktopHeader";
import DesktopFooter from "@/components/DesktopLayout/DesktopFooter";
import DesktopNavigationBar from "@/components/DesktopLayout/DesktopNavigationBar";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";
import Helper from "@/src/utils/Helper";
import SignInModal from "@/components/Explore/SignInModal";
import SignUpModal from "@/components/Explore/SignUpModal";
import UserTypeSelectModal from "@/components/Explore/UserTypeSelectModal";
import {useEffect, useState} from "react";

const DesktopLayout = ({ children, page, hideNav = false }) => {
  const [userType, setUserType] = useState("Tenant");

  const onClickSignIn = () => {
    Helper.documentGetElementById("sign_in_modal").showModal();
  };

  const onClickSignUp = () => {
    openUserTypeSelectModal();
    // Helper.documentGetElementById("sign_up_modal").showModal();
  };

  const openUserTypeSelectModal = () => {
    Helper.documentGetElementById("user_type_modal").showModal();
  };

  return (
    <div className="flex flex-col primaryWhite-bg-color w-full h-full relative">
      <DesktopHeader
        onClickSignIn={onClickSignIn}
        onClickSignUp={onClickSignUp}
      />

      {hideNav ? (
        <div className="flex-1 h-full">{children}</div>
      ) : (
        <div className="flex-1 h-full flex flex-col container mx-auto">
          <CustomText textClassName="font-size-xxlarge font-bold pb-5">
            {isEmpty(page) ? "-" : page}
          </CustomText>

          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <DesktopNavigationBar />
            </div>

            <div className="col-span-3"> {children}</div>
          </div>
        </div>
      )}

      <DesktopFooter />

      <UserTypeSelectModal />
      <SignInModal />
      <SignUpModal />
    </div>
  );
};

export default DesktopLayout;
