import CustomText from "@/components/CustomText";
import CustomModal from "@/components/CustomModal";

const RentChargeModal = () => {
  return (
    <CustomModal id="rent_charges_details">
      <CustomText textClassName="font-size-large font-bold pb-2">
        Rent Charges Details
      </CustomText>
      <CustomText textClassName="disable-text font-size-xsmall text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim,
        dui placerat dignissim vestibulum, dolor dui tempus ex, sit amet
        pulvinar lectus sapien at dui. Proin et lacus sed velit iaculis dictum
        porttitor quis nisi. Phasellus sodales tincidunt lacus, nec dignissim
        nulla blandit in. Donec vel turpis id augue dignissim hendrerit vitae eu
        nulla.  Should you have any inquiries, please contact the owner or agent
        before proceeding with your payment.
      </CustomText>
    </CustomModal>
  );
};

export default RentChargeModal;
