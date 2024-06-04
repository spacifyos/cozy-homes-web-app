import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";

const CustomAlertModal = ({
  alertTitle,
  id,
  onClickCancel,
  onClickConfirm,
  cancelText = "No",
  confirmText = "Yes",
}) => {
  return (
    <CustomModal id={id}>
      <div className="flex flex-col justify-center items-center p-6">
        <CustomImage src={Images.dangerIcon} width={60} />
        <CustomText textClassName="font-bold font-size-normal pt-4">
          {alertTitle}
        </CustomText>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <CustomButton
          buttonClassName="default-btn-outline"
          buttonText={cancelText}
          onClick={onClickCancel}
        />
        <CustomButton
          buttonClassName="primary-btn"
          buttonText={confirmText}
          onClick={onClickConfirm}
        />
      </div>
    </CustomModal>
  );
};

export default CustomAlertModal;
