import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import RentalIncomeCard from "@/components/Owner/RentalIncomeCard";
import * as ownerSelector from "@/src/selectors/owner";

const RentalIncomeComponent = ({ data }) => {
  return (
    <div className="pt-6">
      <div className="flex justify-between items-end pb-3">
        <CustomText textClassName="section-title" styles={{ paddingBottom: 0 }}>
          Rental Income
        </CustomText>

        <CustomText textClassName="font-size-small cursor-pointer">
          View All
        </CustomText>
      </div>

      <div className="flex flex-col gap-3">
        {isEmpty(data) ? (
          <div style={{ height: 351 }} className="flex justify-center">
            <CustomEmptyBox />
          </div>
        ) : (
          map(data, (item) => {
            return <RentalIncomeCard />;
          })
        )}
      </div>
    </div>
  );
};

export default RentalIncomeComponent;
