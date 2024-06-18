import CustomHeader from "@/components/CustomHeader";
import ProfileCard from "@/components/Account/ProfileCard";
import SpacifyCoins from "@/components/Account/SpacifyCoins";
import FeatureComponent from "@/components/Account/FeatureComponent";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import AuthWrapper from "@/components/AuthWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "@/src/actions/auth";
import * as authSelector from "@/src/selectors/auth";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import _ from "lodash";

export { getServerSideProps };

const Account = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const signOutAccountRequest = () =>
    dispatch(authAction.signOutAccountRequest());

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const [signOutLoading, setSignOutLoading] = useState(false);

  useEffect(() => {
    if (_.isEmpty(userProfileData)) {
      fetchUserprofileData();
    }
  }, [userProfileData]);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const onClickLogout = () => {
    setSignOutLoading(true);

    setTimeout(() => {
      setSignOutLoading(false);
      signOutAccountRequest();
    }, 2000);
  };

  const onClickToEditProfile = () => {
    router.push("/edit-profile");
  };

  const onClickToMyAppointment = () => {
    router.push("/my-appointment");
  };

  const onClickToCoinsTransaction = () => {
    router.push("/coins-transaction");
  };

  const onClickToLatestUpdate = () => {
    router.push("/latest-update");
  };

  const onClickToInvoice = () => {
    router.push("/my-invoice");
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.account")}
      hideGoBackButton
      hideRightButton
      hideRightSecondButton
      padding
    >
      <div className="body-container pb-24">
        <div className="grid grid-cols-5 gap-3 flex-1 mb-10">
          <ProfileCard
            onClickToEditProfile={onClickToEditProfile}
            data={userProfileData}
          />

          <SpacifyCoins
            t={t}
            onClickToCoinsTransaction={onClickToCoinsTransaction}
          />
        </div>

        {/*<FeatureComponent*/}
        {/*  title={t("account.smartMeterPairing")}*/}
        {/*  icon={Images.primaryMeterIcon}*/}
        {/*/>*/}

        {/*<FeatureComponent*/}
        {/*  title="Transfer Lock"*/}
        {/*  icon={Images.lockIcon}*/}
        {/*/>*/}

        {/*<div className="divider-line"></div>*/}

        <FeatureComponent
          title={t("account.myInvoice")}
          icon={Images.primaryInvoiceIcon}
          pb={3}
          onClick={onClickToInvoice}
        />

        {/*<FeatureComponent*/}
        {/*  title={t("account.myAppointment")}*/}
        {/*  icon={Images.appointmentIconActive}*/}
        {/*  imageHeight={23}*/}
        {/*  imageWidth={23}*/}
        {/*  pb={3}*/}
        {/*  onClick={onClickToMyAppointment}*/}
        {/*/>*/}

        {/*<FeatureComponent*/}
        {/*  title={t("account.latestUpdate")}*/}
        {/*  icon={Images.primaryRingIcon}*/}
        {/*  pb={3}*/}
        {/*  onClickToLatestUpdate={onClickToLatestUpdate}*/}
        {/*/>*/}

        {/*<FeatureComponent*/}
        {/*  title={t("account.setPinNumber")}*/}
        {/*  icon={Images.primaryLockIcon}*/}
        {/*/>*/}

        {/*<div className="divider-line"></div>*/}

        <FeatureComponent
          title={t("account.termAndCondition")}
          icon={Images.primaryTermAndConditionIcon}
        />

        <div className="divider-line"></div>

        <div className="flex justify-between items-center pb-3">
          <div
            className="logout-container cursor-pointer"
            onClick={onClickLogout}
          >
            <CustomImage
              src={Images.primaryLogoutIcon}
              width={25}
              height={25}
              className="mr-2"
            />
            <CustomText textClassName="font-size-small">
              {t("account.logout")}
            </CustomText>
          </div>

          <CustomText textClassName="disable-text font-size-small">
            {t("account.version")} 1.0.0
          </CustomText>
        </div>

        <LoadingOverlay loading={userProfileLoading || signOutLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(AuthWrapper(Account));
