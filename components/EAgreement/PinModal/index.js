import CustomText from "@/components/CustomText";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import Helper from "@/src/utils/Helper";

const PinModal = ({ t }) => {
  return (
    <CustomModal id="pin_modal">
      <CustomText textClassName="font-size-large font-bold pb-5">
        {t("viewAgreement.insertPinNumber")}
      </CustomText>

      <CustomInput
        label={t("viewAgreement.pinNUmber")}
        required
        labelClassName="font-bold"
        placeholder={t("viewAgreement.enterSixDigitNumber")}
      />

      <div className="grid grid-cols-2 gap-2 pt-10">
        <CustomButton
          buttonText={t("viewAgreement.cancel")}
          buttonClassName="default-btn-outline"
        />
        <CustomButton
          buttonText={t("viewAgreement.submit")}
          buttonClassName="primary-btn"
          onClick={() => {
            Helper.documentGetElementById("canvas_modal").showModal();
            Helper.documentGetElementById("pin_modal").close();
          }}
        />
      </div>
    </CustomModal>
  );
};

export default PinModal;
