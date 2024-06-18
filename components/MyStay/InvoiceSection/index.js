import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import _, { isEmpty } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const InvoiceSection = ({
  t,
  selectedCategory,
  onClickSelectCategory,
  onClickToInvoiceList,
  data,
  onClickToOverviewPage,
}) => {
  const invoiceBtn = [
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
      <CustomText textClassName="section-title">
        {t("myStay.myInvoice")}
      </CustomText>

      <div className="flex justify-between items-end pb-3">
        <div className="flex items-center">
          {_.map(invoiceBtn, (item, index) => {
            const value = _.get(item, ["value"], "");
            const name = _.get(item, ["name"], "");

            return (
              <CustomButton
                key={index}
                buttonText={name}
                buttonClassName={`btn-sm ${_.isEqual(selectedCategory, value) ? "primary-btn" : "default-btn"} mr-2`}
                textClassName="font-size-xsmall"
                onClick={() => onClickSelectCategory(value)}
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

      <div className="flex flex-col gap-3">
        {isEmpty(data) ? (
          <div style={{ height: 351 }} className="flex justify-center">
            <CustomEmptyBox />
          </div>
        ) : (
          <InvoiceComponent
            t={t}
            data={data}
            onClickToOverView={onClickToOverviewPage}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceSection;
