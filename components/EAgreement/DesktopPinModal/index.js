import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import BookingInput from "@/components/Booking/BookingInput";
import DesktopModal from "@/components/DesktopModal";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const DesktopPinModal = ({
  onClickSubmitSignature,
  onClickClosePinModal,
  pinNumberValue,
  onChangePinNumberValue,
  errorMessage,
}) => {
  return (
    <DesktopModal id="desktop_pin_modal">
      <div className="p-6">
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center text-base font-bold">
            Insert Pin Number
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

        <BookingInput
          required
          title={"Pin Number"}
          placeholder={"Enter Six Digit Number"}
          bgColor="bg-white border border-disable"
          inputClassName="border-none"
          className="pb-3"
          value={pinNumberValue}
          onChange={onChangePinNumberValue}
          type="number"
          errorMessage={errorMessage}
        />

        <div className="grid grid-cols-2 gap-2 pt-6">
          <CustomButton
            buttonText={"Cancel"}
            buttonClassName="btn-primary-outline"
            onClick={() => onClickClosePinModal("desktop")}
          />
          <CustomButton
            buttonText={"Submit"}
            buttonClassName="btn-primary"
            onClick={() => onClickSubmitSignature("desktop")}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopPinModal;
