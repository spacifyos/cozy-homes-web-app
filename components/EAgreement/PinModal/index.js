import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import BookingInput from "@/components/Booking/BookingInput";

const PinModal = ({
  t,
  onClickSubmitSignature,
  onClickClosePinModal,
  pinNumberValue,
  onChangePinNumberValue,
  errorMessage,
}) => {
  return (
    <CustomModal id="mobile_pin_modal">
      <CustomText textClassName="font-size-large font-bold pb-5">
        {t("viewAgreement.insertPinNumber")}
      </CustomText>

      <BookingInput
        title={t("viewAgreement.pinNUmber")}
        placeholder={t("viewAgreement.enterSixDigitNumber")}
        bgColor="primaryWhite-bg-color"
        className="pb-3"
        value={pinNumberValue}
        onChange={onChangePinNumberValue}
        type="number"
        errorMessage={errorMessage}
      />

      <div className="grid grid-cols-2 gap-2 pt-6">
        <CustomButton
          buttonText={t("viewAgreement.cancel")}
          buttonClassName="default-btn-outline"
          onClick={() => onClickClosePinModal("mobile")}
        />
        <CustomButton
          buttonText={t("viewAgreement.submit")}
          buttonClassName="primary-btn"
          onClick={() => onClickSubmitSignature("mobile")}
        />
      </div>
    </CustomModal>
  );
};

export default PinModal;
