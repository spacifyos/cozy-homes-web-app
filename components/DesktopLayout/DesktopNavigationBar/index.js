import FeatureComponent from "@/components/Account/FeatureComponent";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const DesktopNavigationBar = ({}) => {
  return (
    <div>
      <FeatureComponent
        title="My Property"
        icon={Images.homeActiveOutline}
        pb={3}
        route={"/my-property"}
        imageHeight={20}
        imageWidth={20}
      />

      <FeatureComponent
        title="My Invoice"
        icon={Images.primaryInvoiceIcon}
        pb={3}
        route={"/my-invoice"}
      />

      <FeatureComponent
        title="Set Pin Number"
        icon={Images.primaryLockIcon}
        pb={3}
        route={"/my-invoice"}
      />

      <div className="divider-line"></div>

      <FeatureComponent
        title="Terms & Conditions"
        icon={Images.primaryTermAndConditionIcon}
        pb={3}
        route={"https://tms.spacify.asia/privacy-policy"}
        target="_blank"
      />

      <div className="divider-line"></div>
    </div>
  );
};

export default DesktopNavigationBar;
