import CustomModal from "@/components/CustomModal";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const PinNumberInfoModal = ({ onClickCloseModal, onClickToSetPinNumber }) => {
  return (
    <CustomModal id="mobile_pin_number_info_modal">
      <CustomText textClassName="font-bold text-base pb-5">
        Pin Number Unset
      </CustomText>

      <div className="flex flex-col justify-center items-center p-6">
        <CustomImage src={Images.dangerIcon} width={60} />
        <CustomText textClassName="font-bold text-base pt-4 text-center">
          You may set pin number before you sign agreement.
        </CustomText>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-6">
        <CustomButton
          buttonText={"Cancel"}
          buttonClassName="btn-primary-outline"
          onClick={() => onClickCloseModal("mobile")}
        />
        <CustomButton
          buttonText={"Set pin number"}
          buttonClassName="btn-primary"
          onClick={() => onClickToSetPinNumber("mobile")}
        />
      </div>
    </CustomModal>
  );
};

export default PinNumberInfoModal;
