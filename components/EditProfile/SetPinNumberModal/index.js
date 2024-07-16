import BookingInput from "@/components/Booking/BookingInput";
import _ from "lodash";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";

const SetPinNumberModal = ({
  pinNumberValue,
  confirmPinNumberValue,
  onChangePinNumber,
  onChangeConfirmPinNumber,
  errorMessage,
  setPinNumberLoading,
  onClickCloseSetPinNumberModal,
  onClickSetPinNumber,
  onChangeOtpValue,
  otpValue,
  onClickGenerateOtp,
  timeLeft,
  isResendEnabled,
  otpRequestLoading,
}) => {
  return (
    <CustomModal id="set_pin_number_modal" disableClose>
      <BookingInput
        title="Pin Number"
        placeholder="Pin Number"
        bgColor="primaryWhite-bg-color"
        className="pb-3"
        value={pinNumberValue}
        onChange={onChangePinNumber}
        type="password"
        errorMessage={_.get(errorMessage, ["pin_number"], "")}
      />

      <BookingInput
        title="Confirm Pin Number"
        placeholder={"Confirm Pin Number"}
        bgColor="primaryWhite-bg-color"
        className="pb-3"
        value={confirmPinNumberValue}
        onChange={onChangeConfirmPinNumber}
        type="password"
        errorMessage={_.get(errorMessage, ["confirm_pin_number"], "")}
      />

      <div className="grid grid-cols-2 flex items-end gap-4">
        <BookingInput
          title="Otp Number"
          placeholder={"Otp Number"}
          bgColor="primaryWhite-bg-color"
          className="pb-3"
          value={otpValue}
          onChange={onChangeOtpValue}
          type="number"
          errorMessage={_.get(errorMessage, ["otp"], "")}
        />

        <CustomButton
          buttonText={
            isResendEnabled
              ? "Request Otp"
              : `Resend OTP in ${timeLeft} seconds`
          }
          textClassName="font-size-small"
          buttonClassName={`${isResendEnabled ? "primary-btn" : "disable-btn"} mb-4`}
          onClick={onClickGenerateOtp}
          loading={otpRequestLoading}
          disable={otpRequestLoading || !isResendEnabled}
          buttonStyles={{ minHeight: 40, height: 40 }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <CustomButton
          buttonClassName={`${setPinNumberLoading ? "disable-btn" : "default-btn-outline"}`}
          buttonText="Cancel"
          disable={setPinNumberLoading}
          onClick={onClickCloseSetPinNumberModal}
        />

        <CustomButton
          buttonClassName={`${setPinNumberLoading ? "disable-btn" : "primary-btn"}`}
          buttonText="Submit"
          onClick={onClickSetPinNumber}
          loading={setPinNumberLoading}
          disable={setPinNumberLoading}
        />
      </div>
    </CustomModal>
  );
};

export default SetPinNumberModal;
