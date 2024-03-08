import CustomText from "@/components/CustomText";

const InvoiceSection = () => {
  return (
    <div>
      <CustomText textClassName="font-size-xxlarge font-bold pb-3">
        My Invoice
      </CustomText>

      <div className="primaryWhite-bg-color global-box-shadow global-border-radius px-4 pt-3 pb-4 flex flex-col justify-between relative"></div>
    </div>
  );
};

export default InvoiceSection;
