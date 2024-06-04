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
import _ from "lodash";
import LoadingOverlay from "@/components/LoadingOverlay";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import CustomAlertModal from "@/components/CustomAlertModal";
import ChangePasswordModal from "@/components/EditProfile/ChangePasswordModal";

export { getServerSideProps };

const EditProfile = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

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

  const [errorMessage, setErrorMessage] = useState([]);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);

  const [editProfileLoading, setEditProfileLoading] = useState(false);

  const [nameValue, setNameValue] = useState(name);
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  useEffect(() => {
    if (_.isEmpty(userProfileData)) {
      fetchUserprofileData();
    }
  }, [userProfileData]);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickOpenChangePasswordModal = (isClear = true) => {
    if (isClear) {
      setCurrentPasswordValue("");
      setPasswordValue("");
      setConfirmPasswordValue("");
    }

    document.getElementById("change_password_modal").showModal();
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
    closeChangePasswordModal();
  };

  const changePasswordFailure = () => {
    closeChangePasswordModal();

    setTimeout(() => {
      onClickOpenChangePasswordModal(false);
    }, 500);
  };

  const onClickCloseChangePasswordModal = () => {
    // if (changePasswordLoading) {
    //   onClickOpenChangePasswordAlert();
    // } else {
    closeChangePasswordModal();
    // }
  };

  const closeChangePasswordModal = () => {
    document.getElementById("change_password_modal").close();
  };

  // const onClickOpenChangePasswordAlert = () => {
  //   document.getElementById("change_password_alert").showModal();
  // };
  //
  // const onClickCloseChangePasswordAlert = () => {
  //   document.getElementById("change_password_alert").close();
  // };

  // const onClickCloseAllModal = () => {
  //   onClickCloseChangePasswordAlert();
  //   closeChangePasswordModal();
  // };

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

    await apiRequest.postEditProfileRequest(postData, setEditProfileLoading);
  };

  return (
    <CustomHeader
      hideRightButton
      hideBgImage
      pageTitle={t("pageTitle.editProfile")}
      onClickGoBack={onClickGoBack}
    >
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
            buttonClassName="default-btn-outline btn-sm mb-20"
            buttonStyles={{ paddingRight: 30, paddingLeft: 30, height: 40 }}
            buttonText="Change Password"
            onClick={() => onClickOpenChangePasswordModal()}
          />

          {/*<CustomText textClassName="font-size-xxsmall mb-1">*/}
          {/*  {t("editProfile.pinNumber")}*/}
          {/*</CustomText>*/}

          {/*<CustomButton*/}
          {/*  buttonClassName="default-btn-outline btn-sm mb-20"*/}
          {/*  buttonStyles={{ paddingRight: 30, paddingLeft: 30, height: 40 }}*/}
          {/*  buttonText={t("editProfile.setPinNumber")}*/}
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

        {/*<CustomAlertModal*/}
        {/*  id="change_password_alert"*/}
        {/*  alertTitle="Change password in processing, are you sure close it?"*/}
        {/*  onClickCancel={onClickCloseChangePasswordAlert}*/}
        {/*  onClickConfirm={onClickCloseAllModal}*/}
        {/*/>*/}

        <LoadingOverlay
          loading={
            userProfileLoading || changePasswordLoading || editProfileLoading
          }
        />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(EditProfile);
