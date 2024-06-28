import CustomText from "@/components/CustomText";
import CustomModal from "@/components/CustomModal";

const RentChargeModal = () => {
  return (
    <CustomModal id="rent_charges_details">
      <CustomText textClassName="font-size-large font-bold pb-2">
        Rent Charges Details
      </CustomText>
      <CustomText textClassName="disable-text font-size-xsmall text-justify">
        Rent Charges provide a premium, all-inclusive living experience for a
        modest monthly fee. Covering maintenance, utilities, insurance,
        appliance upkeep, and accidental event protection, these charges ensure
        a hassle-free and comfortable stay. Enjoy seamless convenience with
        essential services bundled into one simple payment, giving you peace of
        mind and exceptional value.
      </CustomText>
    </CustomModal>
  );
};

export default RentChargeModal;
