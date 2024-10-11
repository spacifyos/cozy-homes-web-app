import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import BookingInput from "@/components/Booking/BookingInput";
import DesktopModal from "@/components/DesktopModal";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const DesktopPinModal = ({
  t,
  onClickSubmitSignature,
  onClickClosePinModal,
  pinNumberValue,
  onChangePinNumberValue,
  errorMessage,
}) => {
  return (
    <DesktopModal id="desktop_pin_modal">
      <div className="p-6">
        <form method="dialog" className={`flex justify-end`}>
          <button className="btn btn-sm btn-circle btn-ghost right-2">
            <CustomImage
              src={Images.cancelIcon}
              imageStyle={{ width: 20, height: 20 }}
            />
          </button>
        </form>
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
            onClick={() => onClickClosePinModal("desktop")}
          />
          <CustomButton
            buttonText={t("viewAgreement.submit")}
            buttonClassName="primary-btn"
            onClick={() => onClickSubmitSignature("desktop")}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopPinModal;
