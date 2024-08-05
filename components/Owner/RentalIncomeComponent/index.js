import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import RentalIncomeCard from "@/components/Owner/RentalIncomeCard";

const RentalIncomeComponent = ({ data, onClickViewMoreTransaction }) => {
  return (
    <div className="flex flex-col gap-3 flex-1">
      {isEmpty(data) ? (
        <CustomEmptyBox />
      ) : (
        map(data, (item, index) => {
          return <RentalIncomeCard item={item} key={index} />;
        })
      )}
    </div>
  );
};

export default RentalIncomeComponent;
