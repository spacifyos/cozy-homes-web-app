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
      <CustomText textClassName="text-base font-bold pb-5">
        {t("viewAgreement.insertPinNumber")}
      </CustomText>

      <BookingInput
        title={t("viewAgreement.pinNUmber")}
        placeholder={t("viewAgreement.enterSixDigitNumber")}
        bgColor="bg-white"
        className="pb-3"
        value={pinNumberValue}
        onChange={onChangePinNumberValue}
        type="number"
        errorMessage={errorMessage}
      />

      <div className="grid grid-cols-2 gap-2 pt-6">
        <CustomButton
          buttonText={t("viewAgreement.cancel")}
          buttonClassName="btn-primary-outline"
          onClick={() => onClickClosePinModal("mobile")}
        />
        <CustomButton
          buttonText={t("viewAgreement.submit")}
          buttonClassName="btn-primary"
          onClick={() => onClickSubmitSignature("mobile")}
        />
      </div>
    </CustomModal>
  );
};

export default PinModal;
