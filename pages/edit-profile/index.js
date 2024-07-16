import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/router";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import BookingInput from "@/components/Booking/BookingInput";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import * as authAction from "@/src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "@/src/selectors/auth";
import { useEffect, useState } from "react";
import _, { get, isEmpty, size } from "lodash";
import LoadingOverlay from "@/components/LoadingOverlay";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import ChangePasswordModal from "@/components/EditProfile/ChangePasswordModal";
import { NextSeo } from "next-seo";
import Helper from "@/src/utils/Helper";
import SetPinNumberModal from "@/components/EditProfile/SetPinNumberModal";

export { getServerSideProps };

const EditProfile = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const initialTime = 60;

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const name = authSelector.getName(userProfileData);
  const email = authSelector.getEmail(userProfileData);
  const phoneNumber = authSelector.getPhoneNumber(userProfileData);
  const type = authSelector.getType(userProfileData);

  const [errorMessage, setErrorMessage] = useState([]);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [setPinNumberLoading, setSetPinNumberLoading] = useState(false);

  const [editProfileLoading, setEditProfileLoading] = useState(false);

  const [nameValue, setNameValue] = useState();
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [pinNumberValue, setPinNumberValue] = useState("");
  const [confirmPinNumberValue, setConfirmPinNumberValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const [isRequestOtp, setIsRequestOtp] = useState(false);

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
    if (!isEmpty(name)) {
      setNameValue(name);
    }
  }, []);

  useEffect(() => {
    fetchUserprofileData();
  }, []);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickOpenChangePasswordModal = () => {
    Helper.documentGetElementById("change_password_modal").showModal();
  };

  const onChangeCurrentPassword = (e) => {
    setCurrentPasswordValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPasswordValue(e.target.value);
  };

  const onClickChangePassword = async () => {
    const newErrors = {};

    if (_.isEmpty(currentPasswordValue)) {
      newErrors["current_password"] = "Current password is required.";
    }

    if (_.isEmpty(passwordValue)) {
      newErrors["password"] = "Password is required.";
    }

    if (_.isEmpty(confirmPasswordValue)) {
      newErrors["confirm_password"] = "Confirm password is required.";
    }

    setErrorMessage(newErrors);

    if (_.isEmpty(newErrors)) {
      if (!_.isEqual(passwordValue, confirmPasswordValue)) {
        newErrors["password"] = "Password and Confirm Password do not match.";
        newErrors["confirm_password"] =
          "Password and Confirm Password do not match.";
        return;
      }

      closeChangePasswordModal();

      const postData = {
        current_password: currentPasswordValue,
        password: passwordValue,
        password_confirmation: confirmPasswordValue,
      };

      await apiRequest.postChangePasswordRequest(
        postData,
        setChangePasswordLoading,
        changePasswordSuccess,
        changePasswordFailure,
      );
    }
  };

  const changePasswordSuccess = () => {
    setCurrentPasswordValue("");
    setPasswordValue("");
    setConfirmPasswordValue("");
  };

  const changePasswordFailure = () => {
    setTimeout(() => {
      onClickOpenChangePasswordModal();
    }, 500);
  };

  const onClickCloseChangePasswordModal = () => {
    closeChangePasswordModal();
  };

  const closeChangePasswordModal = () => {
    setErrorMessage([]);

    Helper.documentGetElementById("change_password_modal").close();
  };

  const onChangeNameValue = (e) => {
    setNameValue(e.target.value);
  };

  const onClickSubmit = async () => {
    if (_.isEmpty(nameValue)) {
      return Toast.error("Name is required.");
    }

    const postData = {
      name: nameValue,
    };

    await apiRequest.postEditProfileRequest(
      postData,
      setEditProfileLoading,
      editProfileSuccess,
    );
  };

  const editProfileSuccess = () => {
    fetchUserprofileData();
  };

  const onClickSetPinNumber = async () => {
    if (!isRequestOtp) {
      return Toast.error("You must request otp.");
    }

    const newErrors = {};

    if (_.isEmpty(pinNumberValue)) {
      newErrors["pin_number"] = "Password is required.";
    }

    if (_.isEmpty(confirmPinNumberValue)) {
      newErrors["confirm_pin_number"] = "Confirm password is required.";
    }

    if (_.isEmpty(otpValue)) {
      newErrors["otp"] = "Otp is required.";
    }

    setErrorMessage(newErrors);

    if (_.isEmpty(newErrors)) {
      if (!_.isEqual(pinNumberValue, confirmPinNumberValue)) {
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
    setPinNumberValue(e.target.value);
  };

  const onChangeConfirmPinNumber = (e) => {
    setConfirmPinNumberValue(e.target.value);
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
    setIsResendEnabled(false);
  };

  const onChangeOtpValue = (e) => {
    if (size(e.target.value) <= 6) {
      setOtpValue(e.target.value);
    }
  };

  return (
    <CustomHeader
      hideRightButton
      hideBgImage
      pageTitle={t("pageTitle.editProfile")}
      onClickGoBack={onClickGoBack}
    >
      <NextSeo title="Edit Profile - Spacify Asia" />
      <div
        className="body-container pb-3 flex flex-col grow"
        style={{ height: "calc(100vh - 67px)" }}
      >
        <div className="grow">
          <div className="flex justify-center items-center">
            <CustomImage
              src={Images.userIcon}
              width={100}
              height={100}
              className="rounded-2xl my-2"
            />
          </div>

          <BookingInput
            bgColor="primaryWhite-bg-color"
            title={t("editProfile.name")}
            placeholder={t("editProfile.name")}
            className="pb-3"
            value={nameValue}
            onChange={onChangeNameValue}
          />

          <CustomLabelValue
            label={t("editProfile.email")}
            value={_.isEmpty(email) ? "-" : email}
            className="pb-4"
          />

          <CustomLabelValue
            label={t("editProfile.phoneNumber")}
            value={_.isEmpty(phoneNumber) ? "-" : phoneNumber}
            className="pb-0"
          />

          <CustomText textClassName="primary-text font-size-xxsmall pb-4">
            Use this phone number to login system
          </CustomText>

          <CustomText textClassName="font-size-xxsmall mb-1">
            Change Password
          </CustomText>

          <CustomButton
            buttonClassName="default-btn-outline btn-sm mb-4"
            buttonStyles={{ paddingRight: 30, paddingLeft: 30, height: 40 }}
            buttonText="Change Password"
            onClick={onClickOpenChangePasswordModal}
          />

          <CustomText textClassName="font-size-xxsmall mb-1">
            {t("editProfile.pinNumber")}
          </CustomText>

          <CustomButton
            buttonClassName="default-btn-outline btn-sm"
            buttonStyles={{ paddingRight: 30, paddingLeft: 30, height: 40 }}
            buttonText={t("editProfile.setPinNumber")}
            onClick={onClickOpenSetPinNumberModal}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomButton
            buttonClassName="default-btn-outline"
            buttonText={t("myTenancy.cancel")}
            onClick={onClickGoBack}
          />

          <CustomButton
            buttonClassName=" primary-btn"
            buttonText={t("myTenancy.submit")}
            onClick={onClickSubmit}
          />
        </div>

        <ChangePasswordModal
          t={t}
          currentPasswordValue={currentPasswordValue}
          onChangeCurrentPassword={onChangeCurrentPassword}
          errorMessage={errorMessage}
          passwordValue={passwordValue}
          onChangePassword={onChangePassword}
          confirmPasswordValue={confirmPasswordValue}
          onChangeConfirmPassword={onChangeConfirmPassword}
          changePasswordLoading={changePasswordLoading}
          onClickCloseChangePasswordModal={onClickCloseChangePasswordModal}
          onClickChangePassword={onClickChangePassword}
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

        <LoadingOverlay
          loading={
            userProfileLoading ||
            changePasswordLoading ||
            editProfileLoading ||
            setPinNumberLoading
          }
        />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(EditProfile);
