import CustomButton from "@/components/CustomButton";
import {isEmpty, isEqual} from "lodash";
import RentalIncomeComponent from "@/components/Owner/RentalIncomeComponent";
import CustomText from "@/components/CustomText";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const TransactionComponent = ({
  data,
  selectedCategory,
  onClickSelectCategory,
}) => {
  return (
    <div className="pt-20 flex flex-col flex-1">
      <div className="flex justify-between items-end pb-3 pt-2">
        <CustomText textClassName="font-bold">Transactions</CustomText>

        {/*<CustomText textClassName="font-size-small cursor-pointer" onClick={onClickViewMoreTransaction}>*/}
        {/*  View More*/}
        {/*</CustomText>*/}
      </div>

      <div className="pb-4">
        <CustomButton
          buttonText="All"
          buttonClassName={`btn-sm ${isEqual(selectedCategory, "All") ? "primary-btn" : "default-btn"} mr-2`}
          textClassName="font-size-xsmall"
          onClick={() => onClickSelectCategory("All")}
        />
        <CustomButton
          buttonText="Cash Out"
          buttonClassName={`btn-sm ${isEqual(selectedCategory, "Cash Out") ? "primary-btn" : "default-btn"} mr-2`}
          textClassName="font-size-xsmall"
          onClick={() => onClickSelectCategory("Cash Out")}
        />
      </div>

      <RentalIncomeComponent data={data} />
    </div>
  );
};

export default TransactionComponent;
