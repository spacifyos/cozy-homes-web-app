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
    <div className="global-box-shadow global-border-radius p-4 flex justify-between items-center">
      <div className="flex">
        <CustomImage src={Images.rentalInIcon} width={30} height={30} />

        <div className="px-3">
          <CustomText textClassName="disable-text italic font-size-xxsmall">
            {isEmpty(paidAt)
              ? "-"
              : moment(paidAt).format("DD MMM YYYY, HH:mm")}
          </CustomText>
          <CustomText textClassName="font-bold font-size-small">
            {isEmpty(unitRoomName) ? "-" : unitRoomName}
          </CustomText>
          <CustomText textClassName="disable-text font-size-xxsmall">
            Transfer to Wallet
          </CustomText>
        </div>
      </div>

      <CustomText textClassName="font-bold primary-text font-size-large">
        {`+RM${isEmpty(amount) ? "0" : amount}`}
      </CustomText>
    </div>
  );
};

export default RentalIncomeCard;
