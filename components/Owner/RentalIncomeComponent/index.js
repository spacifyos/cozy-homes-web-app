import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import RentalIncomeCard from "@/components/Owner/RentalIncomeCard";

const RentalIncomeComponent = ({ data, onClickViewMoreTransaction }) => {
  return (
    <div className="flex flex-col flex-1 ">
      {isEmpty(data) ? (
        <div className="flex items-center justify-center flex-1">
          <CustomEmptyBox emptyTitle="No transactions found" />
        </div>
      ) : (
        map(data, (item, index) => {
          return <RentalIncomeCard item={item} key={index} />;
        })
      )}
    </div>
  );
};

export default RentalIncomeComponent;
