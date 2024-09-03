import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import { isEmpty, map, get, isEqual } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const InvoiceSection = ({
  t,
  selectedCategory,
  onClickSelectCategory,
  data,
  hideTitle = false,
  type,
}) => {
  const invoiceBtn = [
    {
      value: "HomeAll",
      name: "All",
    },
    {
      value: "HomeUnpaid",
      name: "Unpaid",
    },
    {
      value: "HomePaid",
      name: "Paid",
    },
  ];
  return (
    <div>
      {hideTitle ? (
        false
      ) : (
        <CustomText textClassName="section-title">
          {t("myStay.myInvoice")}
        </CustomText>
      )}

      <div className="flex justify-between items-end pb-3">
        <div className="flex items-center">
          {map(invoiceBtn, (item, index) => {
            const value = get(item, ["value"], "");
            const name = get(item, ["name"], "");

            return (
              <CustomButton
                key={index}
                buttonText={name}
                buttonClassName={`btn-sm ${isEqual(selectedCategory, value) ? "primary-btn" : "default-btn"} mr-2`}
                textClassName="font-size-xsmall"
                onClick={() => onClickSelectCategory(value)}
              />
            );
          })}
        </div>

        <a href={`${isEmpty(type) ? "" : "/owner"}/my-invoice`}>
          <CustomText textClassName="font-size-small cursor-pointer">
            {t("myStay.viewMore")}
          </CustomText>
        </a>
      </div>

      <div className="flex flex-col gap-3">
        {isEmpty(data) ? (
          <div style={{ height: 351 }} className="flex justify-center">
            <CustomEmptyBox emptyTitle="No invoice found" />
          </div>
        ) : (
          <InvoiceComponent t={t} data={data} type={type} />
        )}
      </div>
    </div>
  );
};

export default InvoiceSection;
