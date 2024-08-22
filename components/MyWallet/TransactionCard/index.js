import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as walletSelector from "@/src/selectors/wallet";
import { isEmpty } from "lodash";
import moment from "moment";
import Constant from "@/src/utils/Constant";
import StatusLabel from "@/components/StatusLabel";

const TransactionCard = ({ onClickToTransactionOverview, data }) => {
  const updatedAt = walletSelector.getUpdatedAt(data);
  const remarks = walletSelector.getRemarks(data);
  const typeLabel = walletSelector.getTypeLabel(data);
  const typeValue = walletSelector.getTypeValue(data);
  const amount = walletSelector.getAmountLabel(data);
  const transactionNumber = walletSelector.getTransactionNumber(data);
  const isAdd = walletSelector.getIsAdd(data);
  const withdraw = walletSelector.getRequestStatus(data);

  const renderIcon = (type) => {
    switch (type) {
      case Constant.WALLET_RENTAL_INCOME:
        return Images.rentalInIcon;
      case Constant.WALLET_MANUAL_PAID_INVOICE_REVERT_PAYMENT:
        return Images.rentalInIcon;
      case Constant.WALLET_EXPENSE:
        return Images.rentalOutIcon;
      case Constant.WALLET_INVOICE_PAYMENT:
        return Images.rentalOutIcon;
      case Constant.WALLET_WITHDRAWAL:
        return Images.withdrawIcon;
    }
  };

  return (
    <div
      className="global-box-shadow global-border-radius p-4 flex justify-between items-center cursor-pointer grid grid-cols-4 primaryWhite-bg-color"
      onClick={() => onClickToTransactionOverview(transactionNumber)}
    >
      <div className="flex col-span-3">
        <div className="flex items-center" style={{ width: 35 }}>
          <CustomImage src={renderIcon(typeValue)} imageStyle={{ width: 40 }} />
        </div>

        <div className="px-3">
          {/*<CustomText textClassName="disable-text font-size-xxsmall pr-2">*/}
          {/*  {isEmpty(typeLabel) ? "-" : typeLabel}*/}
          {/*</CustomText>*/}
          {typeValue === Constant.WALLET_WITHDRAWAL ? (
            <StatusLabel status={withdraw} />
          ) : (
            false
          )}

          <CustomText
            textClassName="font-bold font-size-small pt-1"
            lineClamp={2}
          >
            {isEmpty(remarks) ? "-" : remarks}
          </CustomText>

          <CustomText textClassName="disable-text italic font-size-xxsmall">
            {isEmpty(updatedAt)
              ? moment().format("DD MMM YYYY, HH:mmm")
              : updatedAt}
          </CustomText>
        </div>
      </div>

      <CustomText
        textClassName={`font-bold ${isAdd ? "primary-text" : "black-text"} font-size-small col-span-1 text-right`}
      >
        {isEmpty(amount) ? "RM0" : amount}
      </CustomText>
    </div>
  );
};

export default TransactionCard;
