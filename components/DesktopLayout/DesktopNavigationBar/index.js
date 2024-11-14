import FeatureComponent from "@/components/Account/FeatureComponent";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEqual } from "lodash";

const DesktopNavigationBar = ({ userType, onClickLogout }) => {
  const isTenant = isEqual(userType, "tenant");

  return (
    <div>
      <FeatureComponent
        title="My Property"
        icon={Images.homeActiveOutline}
        pb={3}
        route={`${isTenant ? "/my-property" : "/owner"}`}
        imageWidth={18}
      />

      <FeatureComponent
        title="My Invoice"
        icon={Images.primaryInvoiceIcon}
        imageWidth={23}
        pb={3}
        route={`/my-invoice`}
      />

      <FeatureComponent
        title={"My Agreement"}
        icon={Images.agreementIconActive}
        imageWidth={23}
        pb={3}
        route={`/e-agreement`}
      />

      {isTenant ? (
        <FeatureComponent
          title={"My Meter"}
          icon={Images.primaryMeterIcon}
          imageWidth={25}
          pb={3}
          route={`/my-meter`}
        />
      ) : (
        false
      )}

      {isTenant ? (
        false
      ) : (
        <FeatureComponent
          title={"My Report"}
          icon={Images.paperIcon}
          imageWidth={16}
          pb={3}
          route={"/owner/my-report"}
        />
      )}

      <FeatureComponent
        title="Set Pin Number"
        icon={Images.primaryLockIcon}
        imageWidth={23}
        pb={3}
        route={"/my-invoice"}
      />

      <div className="divider-line"></div>

      <FeatureComponent
        title="Terms & Conditions"
        icon={Images.primaryTermAndConditionIcon}
        imageWidth={23}
        pb={3}
        route={"https://tms.spacify.asia/privacy-policy"}
        target="_blank"
      />

      <div className="divider-line"></div>

      <FeatureComponent
        title="Logout"
        icon={Images.primaryLogoutIcon}
        imageWidth={23}
        pb={3}
        onClick={onClickLogout}
      />

      <div className="divider-line"></div>
    </div>
  );
};

export default DesktopNavigationBar;
