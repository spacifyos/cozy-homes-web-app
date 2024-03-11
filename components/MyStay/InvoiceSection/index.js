import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import _ from "lodash";

const InvoiceSection = () => {
  return (
    <div>
      <CustomText textClassName="font-size-xxlarge font-bold pb-2">
        My Invoice
      </CustomText>

      <div className="flex items-center pb-3">
        <CustomButton
          buttonText="Unpaid"
          buttonClassName="btn-sm primary-btn mr-2"
          textClassName="font-size-xsmall"
        />
        <CustomButton
          buttonText="Paid"
          buttonClassName="btn-sm default-btn mr-2"
          textClassName="font-size-xsmall"
        />
        <CustomButton
          buttonText="All"
          buttonClassName="btn-sm default-btn"
          textClassName="font-size-xsmall"
        />
      </div>

      {_.map(Array(3), (item) => (
        <InvoiceComponent />
      ))}
    </div>
  );
};

export default InvoiceSection;
