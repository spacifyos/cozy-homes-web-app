import CustomText from "@/components/CustomText";
import _, { isEmpty, map } from "lodash";
import CustomButton from "@/components/CustomButton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import TransactionCard from "@/components/MyWallet/TransactionCard";

const btn = [
  {
    value: "All",
    name: "All",
  },
  {
    value: "Withdraw",
    name: "Withdraw",
  },
];

const TransactionComponent = ({
  selectedCategory,
  onClickSelectCategory,
  onClickToInvoiceList,
  data,
  onClickToTransactionOverview,
}) => {
  return (
    <div>
      <CustomText textClassName="section-title">Transactions</CustomText>

      <div className="flex items-center pb-3">
        {_.map(btn, (item, index) => {
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

      <div className="flex flex-col gap-3">
        {isEmpty(data) ? (
          <div style={{ height: 351 }} className="flex justify-center">
            <CustomEmptyBox />
          </div>
        ) : (
          map(data, (item, index) => {
            return (
              <TransactionCard
                key={index}
                onClickToTransactionOverview={onClickToTransactionOverview}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TransactionComponent;
