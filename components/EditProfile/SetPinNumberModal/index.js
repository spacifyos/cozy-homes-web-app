import BookingInput from "@/components/Booking/BookingInput";
import _ from "lodash";
import CustomButton from "@/components/CustomButton";
import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

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
  id,
}) => {
  return (
    <DesktopModal id={id} disableClose>
      <div className="p-6">
        <div className="flex justify-between items-center pb-4">
          <CustomText textClassName="font-bold text-base">
            Set Pin Number
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
              <CustomImage
                src={Images.cancelIcon}
                imageStyle={{ width: 18, height: 18 }}
              />
            </button>
          </form>
        </div>
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
            textClassName="text-sm"
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
      </div>
    </DesktopModal>
  );
};

export default SetPinNumberModal;
