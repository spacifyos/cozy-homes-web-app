import CustomHeader from "@/components/CustomHeader";
import ProfileCard from "@/components/Account/ProfileCard";
import RoomzCoins from "@/components/Account/RoomzCoins";
import FeatureComponent from "@/components/Account/FeatureComponent";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };

const Account = () => {
  return (
    <CustomHeader pageTitle={"Account"} hideGoBackButton padding>
      <div className="body-container">
        <div className="grid grid-cols-2 gap-3 flex-1 mb-10">
          <ProfileCard />
          <RoomzCoins />
        </div>

        <FeatureComponent
          title="Smart Meter Pairing"
          icon={Images.primaryMeterIcon}
        />

        {/*<FeatureComponent*/}
        {/*  title="Transfer Lock"*/}
        {/*  icon={Images.lockIcon}*/}
        {/*/>*/}

        <div className="divider-line"></div>

        <FeatureComponent
          title="My Invoice"
          icon={Images.primaryInvoiceIcon}
          pb={3}
        />

        <FeatureComponent
          title="Latest Update"
          icon={Images.primaryRingIcon}
          pb={3}
        />

        <FeatureComponent
          title="Set Pin Number"
          icon={Images.primaryLockIcon}
        />

        <div className="divider-line"></div>

        <FeatureComponent
          title="Term & Conditions"
          icon={Images.primaryTermAndConditionIcon}
        />

        <div className="divider-line"></div>

        <div className="flex justify-between items-center pb-3">
          <div className="logout-container">
            <CustomImage
              src={Images.primaryLogoutIcon}
              width={25}
              height={25}
              className="mr-2"
            />
            <CustomText textClassName="font-size-small">Logout</CustomText>
          </div>

          <CustomText textClassName="disable-text font-size-small">
            Version 1.0.0
          </CustomText>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Account);
