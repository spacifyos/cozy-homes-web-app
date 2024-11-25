import CustomText from "@/components/CustomText";
import { isEmpty, map, isEqual, get } from "lodash";
import CustomButton from "@/components/CustomButton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import TransactionCard from "@/components/MyWallet/TransactionCard";

const btn = ["All", "Income", "Expense", "Withdraw", "Refund"];

const TransactionComponent = ({
  selectedCategory,
  onClickSelectCategory,
  data,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        <CustomText textClassName="font-size-xlarge font-bold">
          Transactions
        </CustomText>
        <a href={"/owner/my-report"}>
          <CustomText textClassName="primary-text cursor-pointer text-sm">
            View Report
          </CustomText>
        </a>
      </div>

      <div className="flex items-center pb-3 overflow-x-scroll hide-scroll-bar">
        {map(btn, (item, index) => (
          <CustomButton
            key={index}
            buttonText={item}
            buttonClassName={`btn-sm ${isEqual(selectedCategory, item) ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="text-xs"
            onClick={() => onClickSelectCategory(item)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {isEmpty(data) ? (
          <div style={{ height: 351 }} className="flex justify-center">
            <CustomEmptyBox />
          </div>
        ) : (
          map(data, (item, index) => {
            return <TransactionCard data={item} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default TransactionComponent;
