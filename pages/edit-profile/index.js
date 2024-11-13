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
import { isEmpty, isEqual } from "lodash";
import LoadingOverlay from "@/components/LoadingOverlay";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import ChangePasswordModal from "@/components/EditProfile/ChangePasswordModal";
import { NextSeo } from "next-seo";
import Helper from "@/src/utils/Helper";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopChangePasswordModal from "@/components/EditProfile/DesktopChangePasswordModal";

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

  const [nameValue, setNameValue] = useState("");
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [targetModalId, setTargetModalId] = useState("");

  useEffect(() => {
    if (!isEmpty(name)) {
      setNameValue(name);
    }
  }, [name]);

  useEffect(() => {
    fetchUserprofileData();
  }, []);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickOpenChangePasswordModal = (id) => {
    const checkId = isEmpty(id) ? targetModalId : id;

    setTargetModalId(checkId);
    Helper.documentGetElementById(checkId).showModal();
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

    if (isEmpty(currentPasswordValue)) {
      newErrors["current_password"] = "Current password is required.";
    }

    if (isEmpty(passwordValue)) {
      newErrors["password"] = "Password is required.";
    }

    if (isEmpty(confirmPasswordValue)) {
      newErrors["confirm_password"] = "Confirm password is required.";
    }

    setErrorMessage(newErrors);

    if (isEmpty(newErrors)) {
      if (!isEqual(passwordValue, confirmPasswordValue)) {
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

    Helper.documentGetElementById(targetModalId).close();
  };

  const onChangeNameValue = (e) => {
    setNameValue(e.target.value);
  };

  const onClickSubmit = async () => {
    if (isEmpty(nameValue)) {
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

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Edit Profile - Spacify Asia" />

      <DesktopLayout
        loading={
          userProfileLoading || changePasswordLoading || editProfileLoading
        }
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href={"/account"}>
                  <CustomText textClassName="font-size-normal disable-text">
                    Account
                  </CustomText>
                </a>
              </li>
              <li>
                <CustomText textClassName="font-size-xlarge font-bold">
                  Edit Profit
                </CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="grid grid-cols-1 flex-1">
          <div className="global-border-radius global-box-shadow p-5">
            <div className="flex justify-center items-center">
              <CustomImage
                src={Images.userIcon}
                className="my-2 xl:w-36 lg:w-36 md:w-32 sm:w-28 w-20"
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
              value={isEmpty(email) ? "-" : email}
              className="pb-4"
            />

            <CustomLabelValue
              label={t("editProfile.phoneNumber")}
              value={isEmpty(phoneNumber) ? "-" : phoneNumber}
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
              onClick={() =>
                onClickOpenChangePasswordModal("desktop_change_password_modal")
              }
            />

            <div className="grid grid-cols-2 gap-5 pt-10">
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
          </div>
        </div>

        <DesktopChangePasswordModal
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
      </DesktopLayout>

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
                imageStyle={{ width: 100 }}
                className="my-2"
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
              value={isEmpty(email) ? "-" : email}
              className="pb-4"
            />

            <CustomLabelValue
              label={t("editProfile.phoneNumber")}
              value={isEmpty(phoneNumber) ? "-" : phoneNumber}
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
              onClick={() =>
                onClickOpenChangePasswordModal("change_password_modal")
              }
            />

            {/*<CustomText textClassName="font-size-xxsmall mb-1">*/}
            {/*  {t("editProfile.pinNumber")}*/}
            {/*</CustomText>*/}

            {/*<CustomButton*/}
            {/*  buttonClassName="default-btn-outline btn-sm"*/}
            {/*  buttonStyles={{ paddingRight: 30, paddingLeft: 30, height: 40 }}*/}
            {/*  buttonText={t("editProfile.setPinNumber")}*/}
            {/*  onClick={onClickOpenSetPinNumberModal}*/}
            {/*/>*/}
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
        </div>
      </CustomHeader>
    </div>
  );
};

export default withTranslation("common")(EditProfile);
