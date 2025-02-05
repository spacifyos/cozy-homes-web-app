import DesktopModal from "@/components/DesktopModal";
import BookingInput from "@/components/Booking/BookingInput";
import { get } from "lodash";
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const DesktopChangePasswordModal = ({
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
    <DesktopModal id="desktop_change_password_modal">
      <div className="p-6">
        <form method="dialog" className={`flex justify-end`}>
          <button className="btn btn-sm btn-circle btn-ghost right-2">
            <CustomImage
              src={Images.cancelIcon}
              imageStyle={{ width: 20, height: 20 }}
            />
          </button>
        </form>
        <BookingInput
          title="Current Password"
          placeholder={"Current Password"}
          bgColor="bg-white"
          className="pb-3"
          value={currentPasswordValue}
          onChange={onChangeCurrentPassword}
          type="password"
          errorMessage={get(errorMessage, ["current_password"], "")}
        />

        <BookingInput
          title={"Password"}
          placeholder={"Password"}
          bgColor="bg-white"
          className="pb-3"
          value={passwordValue}
          onChange={onChangePassword}
          type="password"
          errorMessage={get(errorMessage, ["password"], "")}
        />

        <BookingInput
          title={"Confirm Password"}
          placeholder={"Confirm Password"}
          bgColor="bg-white"
          className="pb-3"
          value={confirmPasswordValue}
          onChange={onChangeConfirmPassword}
          type="password"
          errorMessage={get(errorMessage, ["confirm_password"], "")}
        />

        <div className="grid grid-cols-2 gap-4 pt-2">
          <CustomButton
            buttonClassName={`${changePasswordLoading ? "btn-disable" : "btn-primary-outline"}`}
            buttonText={"Cancel"}
            disable={changePasswordLoading}
            onClick={() =>
              onClickCloseChangePasswordModal("desktop_change_password_modal")
            }
          />

          <CustomButton
            buttonClassName={`${changePasswordLoading ? "btn-disable" : "btn-primary"}`}
            buttonText={"Submit"}
            onClick={onClickChangePassword}
            loading={changePasswordLoading}
            disable={changePasswordLoading}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopChangePasswordModal;
