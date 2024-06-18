import BookingInput from "@/components/Booking/BookingInput";
import _ from "lodash";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";

const ChangePasswordModal = ({
  t,
  currentPasswordValue,
  onChangeCurrentPassword,
  errorMessage,
  passwordValue,
  onChangePassword,
  confirmPasswordValue,
  onChangeConfirmPassword,
  changePasswordLoading,
  onClickCloseChangePasswordModal,
  onClickChangePassword,
}) => {
  return (
    <CustomModal id="change_password_modal" disableClose={true}>
      <BookingInput
        title="Current Password"
        placeholder={t("editProfile.password")}
        bgColor="primaryWhite-bg-color"
        className="pb-3"
        value={currentPasswordValue}
        onChange={onChangeCurrentPassword}
        type="password"
        errorMessage={_.get(errorMessage, ["current_password"], "")}
      />

      <BookingInput
        title={t("editProfile.password")}
        placeholder={t("editProfile.password")}
        bgColor="primaryWhite-bg-color"
        className="pb-3"
        value={passwordValue}
        onChange={onChangePassword}
        type="password"
        errorMessage={_.get(errorMessage, ["password"], "")}
      />

      <BookingInput
        title={t("editProfile.confirmPassword")}
        placeholder={t("editProfile.confirmPassword")}
        bgColor="primaryWhite-bg-color"
        className="pb-3"
        value={confirmPasswordValue}
        onChange={onChangeConfirmPassword}
        type="password"
        errorMessage={_.get(errorMessage, ["confirm_password"], "")}
      />

      <div className="grid grid-cols-2 gap-4 pt-2">
        <CustomButton
          buttonClassName={`${changePasswordLoading ? "disable-btn" : "default-btn-outline"}`}
          buttonText={t("myTenancy.cancel")}
          disable={changePasswordLoading}
          onClick={onClickCloseChangePasswordModal}
        />

        <CustomButton
          buttonClassName={`${changePasswordLoading ? "disable-btn" : "primary-btn"}`}
          buttonText={t("myTenancy.submit")}
          onClick={onClickChangePassword}
          loading={changePasswordLoading}
          disable={changePasswordLoading}
        />
      </div>
    </CustomModal>
  );
};

export default ChangePasswordModal;
