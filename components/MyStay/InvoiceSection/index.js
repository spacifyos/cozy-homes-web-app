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
  onClickToOverviewPage,
}) => {
  const invoiceBtn = [
    {
      btnText: "Unpaid",
    },
    {
      btnText: "Paid",
    },
    {
      btnText: "All",
    },
  ];
  return (
    <div>
      <CustomText textClassName="section-title">
        {t("myStay.myInvoice")}
      </CustomText>

      <div className="flex justify-between items-end pb-3">
        <div className="flex items-center">
          {_.map(invoiceBtn, (item, index) => {
            const btnText = _.get(item, ["btnText"], "");
            return (
              <CustomButton
                buttonText={btnText}
                buttonClassName={`btn-sm ${_.isEqual(selectedCategory, btnText) ? "primary-btn" : "default-btn"} mr-2`}
                textClassName="font-size-xsmall"
                onClick={() => onClickSelectCategory(btnText)}
              />
            );
          })}
        </div>

        <CustomText
          textClassName="font-size-small cursor-pointer"
          onClick={onClickToInvoiceList}
        >
          {t("myStay.viewMore")}
        </CustomText>
      </div>

      {_.map(list, (item, index) => (
        <InvoiceComponent
          key={index}
          t={t}
          item={item}
          onClick={onClickToOverviewPage}
        />
      ))}
    </div>
  );
};

export default InvoiceSection;
