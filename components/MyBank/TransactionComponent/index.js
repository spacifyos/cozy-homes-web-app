import CustomButton from "@/components/CustomButton";
import { isEmpty, isEqual } from "lodash";
import RentalIncomeComponent from "@/components/Owner/RentalIncomeComponent";
import CustomText from "@/components/CustomText";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const TransactionComponent = ({
  data,
  selectedCategory,
  onClickSelectCategory,
  onClickToTransactionOverview,
}) => {
  return (
    <div className="pt-16 flex flex-col flex-1">
      <div className="flex justify-between items-end pb-3 pt-2">
        <CustomText textClassName="font-bold">Transactions</CustomText>

        {/*<CustomText textClassName="text-sm cursor-pointer" onClick={onClickViewMoreTransaction}>*/}
        {/*  View More*/}
        {/*</CustomText>*/}
      </div>

      {/*<div className="pb-4">*/}
      {/*  <CustomButton*/}
      {/*    buttonText="All"*/}
      {/*    buttonClassName={`btn-sm ${isEqual(selectedCategory, "All") ? "btn-primary" : "default-btn"} mr-2`}*/}
      {/*    textClassName="text-xs"*/}
      {/*    onClick={() => onClickSelectCategory("All")}*/}
      {/*  />*/}
      {/*  <CustomButton*/}
      {/*    buttonText="Cash Out"*/}
      {/*    buttonClassName={`btn-sm ${isEqual(selectedCategory, "Cash Out") ? "btn-primary" : "default-btn"} mr-2`}*/}
      {/*    textClassName="text-xs"*/}
      {/*    onClick={() => onClickSelectCategory("Cash Out")}*/}
      {/*  />*/}
      {/*</div>*/}

      <RentalIncomeComponent
        data={data}
        onClickToTransactionOverview={onClickToTransactionOverview}
      />
    </div>
  );
};

export default TransactionComponent;
