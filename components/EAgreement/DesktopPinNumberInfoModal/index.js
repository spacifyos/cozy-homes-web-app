import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import DesktopModal from "@/components/DesktopModal";

const DesktopPinNumberInfoModal = ({
  onClickCloseModal,
  onClickToSetPinNumber,
}) => {
  return (
    <DesktopModal id="desktop_pin_number_info_modal">
      <div className="p-6">
        <form method="dialog" className={`flex justify-end`}>
          <button className="btn btn-sm btn-circle btn-ghost right-2">
            <CustomImage
              src={Images.cancelIcon}
              imageStyle={{ width: 20, height: 20 }}
            />
          </button>
        </form>
        <CustomText textClassName="font-bold font-size-large pb-5">
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
            buttonClassName="default-btn-outline"
            onClick={() => onClickCloseModal("desktop")}
          />
          <CustomButton
            buttonText={"Set pin number"}
            buttonClassName="primary-btn"
            onClick={() => onClickToSetPinNumber("desktop")}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopPinNumberInfoModal;
