import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { NextSeo } from "next-seo";
import ProfileCard from "@/components/Account/ProfileCard";
import SpacifyCoins from "@/components/Account/SpacifyCoins";
import FeatureComponent from "@/components/Account/FeatureComponent";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import LoadingOverlay from "@/components/LoadingOverlay";
import SetPinNumberModal from "@/components/EditProfile/SetPinNumberModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "@/src/actions/auth";
import * as authSelector from "@/src/selectors/auth";
import { useEffect, useState } from "react";
import Toast from "@/src/utils/Toast";
import { get, isEmpty, isEqual, size } from "lodash";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Helper from "@/src/utils/Helper";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";
import BottomNavigate from "@/components/BottomNavigate";
import CustomButton from "@/components/CustomButton";

export { getServerSideProps };

const OwnerAccount = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const initialTime = 60;
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");

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

  const phoneNumber = authSelector.getPhoneNumber(userProfileData);
  const walletBalance = authSelector.getWalletBalance(userProfileData);
  const type = authSelector.getType(userProfileData);

  const [signOutLoading, setSignOutLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const [setPinNumberLoading, setSetPinNumberLoading] = useState(false);
  const [pinNumberValue, setPinNumberValue] = useState("");
  const [confirmPinNumberValue, setConfirmPinNumberValue] = useState("");
  const referralCode = authSelector.getReferralCode(userProfileData);

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isRequestOtp, setIsRequestOtp] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const referralText = `🏠 Looking for a premium room? Here’s an exclusive offer! 🏠\n\nUse my referral code "${referralCode}" and enjoy 1 FREE month of rent on your next room with BeLive Co-Living! 🎉 Experience premium co-living in a welcoming community, and start saving right from the beginning.\n\nOr, simply click the link below to explore available rooms and claim your free month:\n\n👉 ${process.env.DOMAIN}/explore?referral_code=${referralCode}\n\nDon’t miss out on this chance for a free month of rent! Join us, live in style, and start earning when you refer friends, too!`;
  const whatsAppReferralText = `%F0%9F%8F%A0+Looking+for+a+premium+room%3F+Here%E2%80%99s+an+exclusive+offer%21+%F0%9F%8F%A0%0D%0A%0D%0AUse+my+referral+code+%22${referralCode}%22+and+enjoy+1+FREE+month+of+rent+on+your+next+room+with+BeLive+Co-Living%21+%F0%9F%8E%89+Experience+premium+co-living+in+a+welcoming+community%2C+and+start+saving+right+from+the+beginning.%0D%0A%0D%0AOr%2C+simply+click+the+link+below+to+explore+available+rooms+and+claim+your+free+month%3A%0D%0A%0D%0A%F0%9F%91%89+${process.env.DOMAIN}%2Fexplore%3Freferral_code%3D${referralCode}%0D%0A%0D%0ADon%E2%80%99t+miss+out+on+this+chance+for+a+free+month+of+rent%21+Join+us%2C+live+in+style%2C+and+start+earning+when+you+refer+friends%2C+too%21`;

  useEffect(() => {
    if (timeLeft > 0 && !isResendEnabled) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setTimeLeft(60);
      setIsResendEnabled(true);
    }
  }, [timeLeft, isResendEnabled]);

  useEffect(() => {
    fetchUserprofileData();
  }, []);

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

  const onClickSetPinNumber = async () => {
    if (!isRequestOtp) {
      return Toast.error("You must request otp.");
    }

    const newErrors = {};

    if (isEmpty(pinNumberValue)) {
      newErrors["pin_number"] = "Password is required.";
    }

    if (isEmpty(confirmPinNumberValue)) {
      newErrors["confirm_pin_number"] = "Confirm password is required.";
    }

    if (isEmpty(otpValue)) {
      newErrors["otp"] = "Otp is required.";
    }

    setErrorMessage(newErrors);

    if (isEmpty(newErrors)) {
      if (!isEqual(pinNumberValue, confirmPinNumberValue)) {
        newErrors["pin_number"] =
          "Pin Number and Confirm Pin Number do not match.";
        newErrors["confirm_pin_number"] =
          "Pin Number and Confirm Pin Number do not match.";
        return;
      }

      onClickCloseSetPinNumberModal();

      const postData = {
        pin_number: pinNumberValue,
        pin_number_confirmation: confirmPinNumberValue,
        otp: otpValue,
        token: otpToken,
      };

      await apiRequest.patchUserPinNumber(
        postData,
        setSetPinNumberLoading,
        setPinNumberSuccessCallback,
        setPinNumberFailureCallback,
      );
    }
  };

  const setPinNumberSuccessCallback = () => {
    setPinNumberValue("");
    setConfirmPinNumberValue("");
    setOtpValue("");
    setIsRequestOtp(false);
  };

  const setPinNumberFailureCallback = () => {
    setTimeout(() => {
      onClickOpenSetPinNumberModal();
    }, 500);
  };

  const onChangePinNumber = (e) => {
    if (size(e.target.value) <= 6) {
      setPinNumberValue(e.target.value);
    }
  };

  const onChangeConfirmPinNumber = (e) => {
    if (size(e.target.value) <= 6) {
      setConfirmPinNumberValue(e.target.value);
    }
  };

  const onClickCloseSetPinNumberModal = () => {
    setErrorMessage([]);

    Helper.documentGetElementById("set_pin_number_modal").close();
  };

  const onClickOpenSetPinNumberModal = () => {
    Helper.documentGetElementById("set_pin_number_modal").showModal();
  };

  const onClickGenerateOtp = async () => {
    const postData = {
      case: "reset_pin_number",
      destination: phoneNumber,
      type: type,
    };

    await apiRequest.postOtpRequest(
      postData,
      setOtpRequestLoading,
      otpRequestSuccess,
    );

    setIsRequestOtp(true);
  };

  const otpRequestSuccess = (res) => {
    setOtpToken(get(res, ["token"], ""));
    setIsResendEnabled(false);
  };

  const onChangeOtpValue = (e) => {
    if (size(e.target.value) <= 6) {
      setOtpValue(e.target.value);
    }
  };

  const onClickToReport = () => {
    router.push();
  };

  const onClickChangeTab = (route) => {
    router.push(route);
  };

  const onClickCopy = () => {
    navigator.clipboard.writeText(referralText);

    Toast.success("Copied link to clipboard.");

    setIsCopy(true);
  };

  return (
    <CustomOwnerHeader title="Account" hideGoBackButton className="pb-16">
      <NextSeo title="Account | Owner - Spacify Asia" />

      <div className="grid grid-cols-5 gap-3 flex-1 mb-10 absolute top-16 w-full px-4 z-10">
        <ProfileCard data={userProfileData} />

        <SpacifyCoins
          route={"/owner/my-wallet"}
          t={t}
          walletBalance={walletBalance}
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
      <div className="body-container bg-color flex-1 pb-24">
        <div className="pt-20">
          <div className="divider-line"></div>

          <div className="">
            <CustomText textClassName="pb-1">Referral Code</CustomText>
            <CustomText textClassName="font-size-xxsmall disable-text pb-1">
              Share and Earn, Don’t Miss the Opportunity
            </CustomText>
            <div className="primaryWhite-bg-color p-2 px-4 global-border-radius global-box-shadow flex justify-between items-center">
              <div className="flex items-center">
                <CustomText textClassName="pr-2">
                  {isEmpty(referralCode) ? "" : referralCode}
                </CustomText>
                <CustomButton
                  textClassName="font-size-xsmall"
                  buttonClassName={`${isCopy ? "disable-btn" : "primary-btn"} btn-sm`}
                  buttonText={isCopy ? "Copies" : "Copy"}
                  onClick={onClickCopy}
                />
              </div>

              <a
                href={`https://api.whatsapp.com/send/?text=${whatsAppReferralText}`}
                target="_blank"
              >
                <CustomImage src={Images.whatsappIcon} className="w-8" />
              </a>
            </div>
          </div>

          <div className="divider-line"></div>

          {/*<FeatureComponent*/}
          {/*  title="My Bank"*/}
          {/*  icon={Images.bankIcon}*/}
          {/*  imageWidth={20}*/}
          {/*  imageHeight={20}*/}
          {/*  pb={3}*/}
          {/*  route={"/owner/my-bank"}*/}
          {/*/>*/}

          <FeatureComponent
            title={t("account.myInvoice")}
            icon={Images.primaryInvoiceIcon}
            imageWidth={25}
            pb={3}
            route={"/owner/my-invoice"}
          />

          <FeatureComponent
            title={"My Report"}
            icon={Images.paperIcon}
            imageWidth={16}
            pb={3}
            route={"/owner/my-report"}
          />

          <FeatureComponent
            title={"My Agreement"}
            icon={Images.agreementIconActive}
            imageWidth={25}
            pb={3}
            route={"/owner/e-agreement"}
          />

          {/*<FeatureComponent*/}
          {/*  title={t("account.latestUpdate")}*/}
          {/*  icon={Images.primaryRingIcon}*/}
          {/*  pb={3}*/}
          {/*  onClickToLatestUpdate={onClickToLatestUpdate}*/}
          {/*/>*/}

          <FeatureComponent
            title={t("account.setPinNumber")}
            icon={Images.primaryLockIcon}
            imageWidth={25}
            onClick={onClickOpenSetPinNumberModal}
          />

          <div className="divider-line"></div>

          <FeatureComponent
            title={t("account.termAndCondition")}
            icon={Images.primaryTermAndConditionIcon}
            imageWidth={25}
            route={"https://tms.spacify.asia/privacy-policy"}
            target="_blank"
          />

          <div className="divider-line"></div>

          <div className="flex justify-between items-center pb-3">
            <div
              className="logout-container cursor-pointer"
              onClick={onClickLogout}
            >
              <CustomImage
                src={Images.primaryLogoutIcon}
                imageStyle={{ width: 25 }}
                className="mr-2"
              />
              <CustomText textClassName="font-size-small">
                {t("account.logout")}
              </CustomText>
            </div>

            <CustomText textClassName="disable-text font-size-small">
              {t("account.version")} 1.6.0
            </CustomText>
          </div>
        </div>
      </div>

      <LoadingOverlay
        loading={userProfileLoading || signOutLoading || setPinNumberLoading}
      />

      <SetPinNumberModal
        pinNumberValue={pinNumberValue}
        confirmPinNumberValue={confirmPinNumberValue}
        onChangePinNumber={onChangePinNumber}
        onChangeConfirmPinNumber={onChangeConfirmPinNumber}
        errorMessage={errorMessage}
        setPinNumberLoading={setPinNumberLoading}
        onClickCloseSetPinNumberModal={onClickCloseSetPinNumberModal}
        onClickSetPinNumber={onClickSetPinNumber}
        onChangeOtpValue={onChangeOtpValue}
        otpValue={otpValue}
        onClickGenerateOtp={onClickGenerateOtp}
        timeLeft={timeLeft}
        isResendEnabled={isResendEnabled}
        otpRequestLoading={otpRequestLoading}
      />

      <BottomNavigate
        t={t}
        routeName={routeName}
        routeQuery={routeQuery}
        onClickChangeTab={onClickChangeTab}
      />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(OwnerAccount));
