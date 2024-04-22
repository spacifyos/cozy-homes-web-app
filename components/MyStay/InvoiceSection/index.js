import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import _ from "lodash";

const InvoiceSection = ({
  t,
  selectedCategory,
  onClickSelectCategory,
  onClickToInvoiceList,
  list,
}) => {
  return (
    <div>
      <CustomText textClassName="section-title">
        {t("myStay.myInvoice")}
      </CustomText>

      <div className="flex justify-between items-end pb-3">
        <div className="flex items-center">
          <CustomButton
            buttonText="Unpaid"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Unpaid") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Unpaid")}
          />
          <CustomButton
            buttonText="Paid"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Paid") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Paid")}
          />
          <CustomButton
            buttonText="All"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "All") ? "primary-btn" : "default-btn"}`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("All")}
          />
        </div>

        <CustomText
          textClassName="font-size-small cursor-pointer"
          onClick={onClickToInvoiceList}
        >
          {"View more"}
        </CustomText>
      </div>

      {_.map(list, (item) => (
        <InvoiceComponent t={t} item={item} />
      ))}
    </div>
  );
};

export default InvoiceSection;
