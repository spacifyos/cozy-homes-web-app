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
import { isEmpty, get, size, isEqual } from "lodash";
import { NextSeo } from "next-seo";
import SetPinNumberModal from "@/components/EditProfile/SetPinNumberModal";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Helper from "@/src/utils/Helper";
import BottomNavigate from "@/components/BottomNavigate";
import CustomButton from "@/components/CustomButton";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopProfileCard from "@/components/Account/DesktopProfileCard";
import DesktopSpacifyCoins from "@/components/Account/DesktopSpacifyCoins";
import Constant from "@/src/utils/Constant";

export { getServerSideProps };

const Account = () => {
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
  const type = authSelector.getType(userProfileData);
  const referralCode = authSelector.getReferralCode(userProfileData);
  const isTenant = isEqual(type, "tenant");
  const isBackOffice = isEqual(type, "back-office");

  const [signOutLoading, setSignOutLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const [setPinNumberLoading, setSetPinNumberLoading] = useState(false);
  const [pinNumberValue, setPinNumberValue] = useState("");
  const [confirmPinNumberValue, setConfirmPinNumberValue] = useState("");

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isRequestOtp, setIsRequestOtp] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const referralText = `🏠 Looking for a premium room? Here’s an exclusive offer! 🏠\n\nUse my referral code "${referralCode}" and enjoy 1 FREE month of rent on your next room with BeLive Co-Living! 🎉 Experience premium co-living in a welcoming community, and start saving right from the beginning.\n\nOr, simply click the link below to explore available rooms and claim your free month:\n\n👉 ${process.env.DOMAIN}?referral_code=${referralCode}\n\nDon’t miss out on this chance for a free month of rent! Join us, live in style, and start earning when you refer friends, too!`;
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
    if (isEmpty(userProfileData)) {
      fetchUserprofileData();
    }
  }, []);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const onClickLogoutModal = () => {
    Helper.documentGetElementById("logout_modal").showModal();
  };

  const onClickToCoinsTransaction = () => {
    router.push("/coins-transaction");
  };

  const onClickToInvoice = () => {
    router.push("/user/my-invoice");
  };

  const onClickToTnC = () => {
    window.open("https://tms.spacify.asia/privacy-policy");
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

    Helper.documentGetElementById("set_pin_number_mobile_modal").close();
  };

  const onClickOpenSetPinNumberModal = () => {
    Helper.documentGetElementById("set_pin_number_mobile_modal").showModal();
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

  const onClickChangeTab = (route) => {
    router.push(route);
  };

  const onClickCopy = () => {
    navigator.clipboard.writeText(referralText);

    Toast.success("Copied link to clipboard.");

    setIsCopy(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Account - Spacify Asia" />

      <DesktopLayout
        loading={userProfileLoading || signOutLoading || setPinNumberLoading}
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <CustomText textClassName="text-base">Account</CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="grid grid-cols-7 xl:gap-8 lg:gap-8 md:gap-6 sm:gap-4 gap-4 flex-1">
          <div className="xl:col-span-4 lg:col-span-4 md:col-span-7 sm:col-span-4 col-span-4">
            <DesktopProfileCard data={userProfileData} />
          </div>

          <div className="xl:col-span-3 lg:col-span-3 md:col-span-7 sm:col-span-3 col-span-3">
            <DesktopSpacifyCoins
              t={t}
              onClickToCoinsTransaction={onClickToCoinsTransaction}
            />
          </div>
        </div>

        <div className="divider-line"></div>

        <div className="">
          <CustomText textClassName="text-base">Referral Code</CustomText>
          <CustomText textClassName="text-xs text-disable pb-1">
            Share and Earn, Don’t Miss the Opportunity
          </CustomText>
          <div className="bg-white mt-2 p-2 px-4 global-border-radius global-box-shadow flex justify-between items-center">
            <div className="flex items-center">
              <CustomText textClassName="pr-2 text-sm">
                {isEmpty(referralCode) ? "" : referralCode}
              </CustomText>
              <CustomButton
                textClassName="text-xs"
                buttonClassName={`${isCopy ? "btn-disable" : "btn-primary"} btn-sm`}
                buttonText={isCopy ? "Copied" : "Copy"}
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

        <div className="xl:hidden lg:hidden md:hidden">
          <div className="divider-line"></div>

          {!isEmpty(userProfileData) && !isBackOffice ? (
            <FeatureComponent
              title="My Property"
              icon={Images.homeActiveOutline}
              pb={3}
              onClick={() => {
                return router.push(
                  isTenant ? "/user/my-property" : "/user/owner",
                );
              }}
              imageWidth={18}
            />
          ) : (
            false
          )}

          <FeatureComponent
            title="My Account"
            icon={Images.registerIconActiveOutline}
            pb={3}
            onClick={() => {
              return router.push("/user/account");
            }}
            imageWidth={18}
          />

          {!isEmpty(userProfileData) && isTenant ? (
            <FeatureComponent
              title="Help Center"
              icon={Images.helpIcon}
              pb={3}
              onClick={() => {
                return router.push("/user/help-center");
              }}
              imageWidth={25}
            />
          ) : (
            false
          )}

          {!isEmpty(userProfileData) && isBackOffice ? (
            <FeatureComponent
              title="Help Center"
              icon={Images.helpIcon}
              pb={3}
              onClick={() => {
                return router.push("/agency/help-center");
              }}
              imageWidth={25}
            />
          ) : (
            false
          )}

          {!isEmpty(userProfileData) && !isBackOffice ? (
            <FeatureComponent
              title="My Invoice"
              icon={Images.primaryInvoiceIcon}
              imageWidth={23}
              pb={3}
              onClick={() => {
                return router.push("/user/my-invoice");
              }}
            />
          ) : (
            false
          )}

          {!isEmpty(userProfileData) && !isBackOffice ? (
            <FeatureComponent
              title={"My E-Agreement"}
              icon={Images.agreementIconActive}
              imageWidth={23}
              pb={3}
              onClick={() => {
                return router.push("/user/e-agreement");
              }}
            />
          ) : (
            false
          )}

          {!isEmpty(userProfileData) && isTenant && !isBackOffice ? (
            <FeatureComponent
              title={"My Meter"}
              icon={Images.primaryMeterIcon}
              imageWidth={13}
              pb={3}
              onClick={() => {
                return router.push("/user/my-meter");
              }}
            />
          ) : (
            false
          )}

          {!isEmpty(userProfileData) && !isTenant && !isBackOffice ? (
            <FeatureComponent
              title={"My Report"}
              icon={Images.paperIcon}
              imageWidth={16}
              pb={3}
              onClick={() => {
                return router.push("/user/owner/my-report");
              }}
            />
          ) : (
            false
          )}

          {!isEmpty(userProfileData) && !isTenant && !isBackOffice ? (
            <FeatureComponent
              title={"RenoXpert"}
              icon={Images.renoExpertIconActive}
              imageWidth={16}
              pb={3}
              onClick={() => {
                return router.push("/user/reno-expert");
              }}
            />
          ) : (
            false
          )}

          {!isEmpty(userProfileData) && !isBackOffice ? (
            <FeatureComponent
              title="Set Pin Number"
              icon={Images.primaryLockIcon}
              imageWidth={23}
              pb={3}
              onClick={onClickOpenSetPinNumberModal}
            />
          ) : (
            false
          )}

          {!isEmpty(userProfileData) && isBackOffice ? (
            <FeatureComponent
              title="Property Listing"
              icon={Images.listIconActive}
              imageWidth={23}
              pb={3}
              onClick={() => {
                return router.push("/agency/card-listing");
              }}
            />
          ) : (
            false
          )}

          {!isEmpty(userProfileData) && !isBackOffice ? (
            <FeatureComponent
              title="Chat"
              icon={Images.chatOutlineIcon}
              imageWidth={18}
              pb={3}
              onClick={() => {
                return router.push(
                  isTenant ? "/user/chat" : "/user/owner/chat",
                );
              }}
            />
          ) : (
            false
          )}

          <div className="divider-line"></div>

          <FeatureComponent
            title={"Term And Condition"}
            icon={Images.primaryTermAndConditionIcon}
            imageWidth={23}
            pb={3}
            route={"https://tms.spacify.asia/privacy-policy"}
            target="_blank"
          />

          <div className="divider-line"></div>

          <div className="flex justify-between items-center pb-3">
            <div
              className="logout-container cursor-pointer"
              onClick={onClickLogoutModal}
            >
              <CustomImage
                src={Images.primaryLogoutIcon}
                className="mr-2 w-5"
              />
              <CustomText textClassName="text-xs">{"Logout"}</CustomText>
            </div>

            <CustomText textClassName="text-disable text-xs">
              {`Version ${Constant.VERSION}`}
            </CustomText>
          </div>
        </div>
      </DesktopLayout>

      <SetPinNumberModal
        id="set_pin_number_mobile_modal"
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
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(Account));
