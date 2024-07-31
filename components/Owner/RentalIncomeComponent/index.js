import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import RentalIncomeCard from "@/components/Owner/RentalIncomeCard";

const RentalIncomeComponent = ({ data, onClickViewMoreTransaction }) => {
  return (
    <div className="">
      <div className="flex justify-between items-end pb-3">
        <CustomText textClassName="font-bold">
          Rental Income
        </CustomText>

        {/*<CustomText textClassName="font-size-small cursor-pointer" onClick={onClickViewMoreTransaction}>*/}
        {/*  View More*/}
        {/*</CustomText>*/}
      </div>

      <div className="flex flex-col gap-3">
        {isEmpty(data) ? (
          <div style={{ height: 351 }} className="flex justify-center">
            <CustomEmptyBox />
          </div>
        ) : (
          map(data, (item) => {
            return <RentalIncomeCard item={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default RentalIncomeComponent;
