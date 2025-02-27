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
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center text-base font-bold">
            Pin Number Unset
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
              <CustomImage
                className="xl:w-4 lg:w-4 md:w-4 sm:w-3 w-3"
                src={Images.closeIconBlack}
              />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <div className="flex flex-col justify-center items-center p-6">
          <CustomImage src={Images.alertIconActive} className="w-20" />
          <CustomText textClassName="text-base pt-4 text-center">
            You may set pin number before you sign agreement.
          </CustomText>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-6">
          <CustomButton
            buttonText={"Cancel"}
            buttonClassName="btn-primary-outline"
            onClick={() => onClickCloseModal("desktop")}
          />
          <CustomButton
            buttonText={"Set pin number"}
            buttonClassName="btn-primary"
            onClick={() => onClickToSetPinNumber("desktop")}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopPinNumberInfoModal;
