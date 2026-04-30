import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import RentalIncomeCard from "@/components/Owner/RentalIncomeCard";

const RentalIncomeComponent = ({ data }) => {
  return (
    <div className="flex flex-col flex-1 gap-3 justify-start">
      {isEmpty(data) ? (
        <div className="flex items-center justify-center flex-1">
          <CustomEmptyBox
          variant="transaction"
          emptyTitle="No income yet"
          emptyDesc="Rental income will appear here once your tenants make payments."
        />
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
