import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as walletSelector from "@/src/selectors/wallet";
import { isEmpty, isEqual } from "lodash";
import moment from "moment";
import Constant from "@/src/utils/Constant";
import StatusLabel from "@/components/StatusLabel";

const TransactionCard = ({ data }) => {
  const updatedAt = walletSelector.getUpdatedAt(data);
  const remarks = walletSelector.getRemarks(data);
  const typeLabel = walletSelector.getTypeLabel(data);
  const typeValue = walletSelector.getTypeValue(data);
  const amount = walletSelector.getAmountLabel(data);
  const transactionNumber = walletSelector.getTransactionNumber(data);
  const isAdd = walletSelector.getIsAdd(data);
  const withdrawStatus = walletSelector.getRequestStatus(data);

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
      case Constant.WALLET_WITHDRAWAL_REFUND:
        return Images.refundIcon;
      case Constant.WALLET_REVERT_INVOICE_PAYMENT:
        return Images.refundIcon;
    }
  };

  const renderTextColor = (typeValue) => {
    switch (typeValue) {
      case Constant.WALLET_RENTAL_INCOME:
        return "power-on-text";
      case Constant.WALLET_MANUAL_PAID_INVOICE_REVERT_PAYMENT:
        return "power-on-text";
      case Constant.WALLET_EXPENSE:
        return "primary-text";
      case Constant.WALLET_INVOICE_PAYMENT:
        return "primary-text";
      case Constant.WALLET_WITHDRAWAL:
        if (
          isEqual(withdrawStatus, "Pending") ||
          isEqual(withdrawStatus, "Confirmed")
        ) {
          return "pending-text";
        } else if (isEqual(withdrawStatus, "Approved")) {
          return "primary-text";
        } else if (isEqual(withdrawStatus, "Cancelled")) {
          return "error-text";
        } else {
          return "black-text";
        }
      case Constant.WALLET_WITHDRAWAL_REFUND:
        return "power-on-text";
      case Constant.WALLET_REVERT_INVOICE_PAYMENT:
        return "power-on-text";
    }
  };

  return (
    <a
      href={`/owner/my-wallet/transaction-overview/${transactionNumber}`}
      className="global-box-shadow global-border-radius p-4 flex justify-between items-center cursor-pointer grid grid-cols-4 primaryWhite-bg-color"
    >
      <div className="flex col-span-3">
        <div className="flex items-center" style={{ width: 35 }}>
          <CustomImage src={renderIcon(typeValue)} imageStyle={{ width: 40 }} />
        </div>

        <div className="px-3">
          {typeValue === Constant.WALLET_WITHDRAWAL ? (
            <StatusLabel status={withdrawStatus} />
          ) : (
            <CustomText textClassName="disable-text text-xs pr-2">
              {isEmpty(typeLabel) ? "-" : typeLabel}
            </CustomText>
          )}

          <CustomText
            textClassName="font-bold text-sm pt-1"
            lineClamp={2}
          >
            {isEmpty(remarks) ? "-" : remarks}
          </CustomText>

          <CustomText textClassName="disable-text italic text-xs">
            {isEmpty(updatedAt)
              ? moment().format("DD MMM YYYY, HH:mmm")
              : updatedAt}
          </CustomText>
        </div>
      </div>

      <CustomText
        textClassName={`font-bold ${renderTextColor(typeValue)} text-sm col-span-1 text-right`}
      >
        {isEmpty(amount) ? "RM0" : amount}
      </CustomText>
    </a>
  );
};

export default TransactionCard;
