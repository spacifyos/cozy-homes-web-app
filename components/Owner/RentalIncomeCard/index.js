import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import * as ownerSelector from "@/src/selectors/owner";
import { isEmpty } from "lodash";
import moment from "moment";

const RentalIncomeCard = ({ item }) => {
  const unitRoomName = ownerSelector.getUnitRoomName(item);
  const paidAt = ownerSelector.getPaidAt(item);
  const amount = ownerSelector.getAmount(item);

  return (
    <div className="global-box-shadow global-border-radius p-4 flex justify-between items-center bg-white w-full">
      <div className="flex">
        <CustomImage src={Images.incomeIconActive} imageStyle={{ width: 35 }} />

        <div className="px-3">
          <CustomText textClassName="text-disable italic text-xs">
            {isEmpty(paidAt)
              ? "-"
              : moment(paidAt).format("DD MMM YYYY, HH:mm")}
          </CustomText>
          <CustomText textClassName="font-bold text-sm">
            {isEmpty(unitRoomName) ? "-" : unitRoomName}
          </CustomText>
          <CustomText textClassName="text-disable text-xs">
            {/*Transferred to Wallet*/}
          </CustomText>
        </div>
      </div>

      <CustomText textClassName="font-bold text-primary text-base">
        {`+RM${isEmpty(amount) ? "0" : amount}`}
      </CustomText>
    </div>
  );
};

export default RentalIncomeCard;
