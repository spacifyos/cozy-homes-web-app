import CustomText from "@/components/CustomText";
import _ from "lodash";
import * as tenancySelector from "@/src/selectors/tenancy";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const TenancyFeeComponent = ({ data }) => {
  return (
    <div className="flex flex-col justify-between items-center gap-2">
      {_.isEmpty(data) ? (
        <CustomEmptyBox emptyDesc="No fees in the moment." />
      ) : (
        _.map(data, (item, index) => {
          const name = tenancySelector.getName(item);
          const feeAmount = tenancySelector.getFeeAmount(item);

          return (
            <div className="flex w-full justify-between" key={index}>
              <CustomText textClassName="font-bold">{name}</CustomText>

              <CustomText>{`RM${_.isEmpty(feeAmount) ? "0" : feeAmount}`}</CustomText>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TenancyFeeComponent;
