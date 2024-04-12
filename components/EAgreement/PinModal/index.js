import CustomText from "@/components/CustomText";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";

const PinModal = ({ t }) => {
  return (
    <CustomModal id="pin_modal">
      <CustomText textClassName="font-size-large font-bold pb-5">
        Insert Pin Number
      </CustomText>

      <CustomInput
        label="Pin Number"
        required
        labelClassName="font-bold"
        placeholder="Enter the 6-digit pin number"
      />

      <div className="grid grid-cols-2 gap-2 pt-10">
        <CustomButton
          buttonText="Cancel"
          buttonClassName="default-btn-outline"
        />
        <CustomButton
          buttonText="Submit"
          buttonClassName="primary-btn"
          onClick={() => {
            document.getElementById("canvas_modal").showModal();
            document.getElementById("pin_modal").close();
          }}
        />
      </div>
    </CustomModal>
  );
};

export default PinModal;
