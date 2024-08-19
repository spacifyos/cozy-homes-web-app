import { isEmpty } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import * as authSelector from "@/src/selectors/auth";

const BankCard = ({ bankDetails, onClickToAddBank, onClickEditBankInfo }) => {
  const accountHolderName = authSelector.getAccountHolderName(bankDetails);
  const accountNumber = authSelector.getAccountNumber(bankDetails);
  const bankName = authSelector.getBankName(bankDetails);
  const bankLogo = authSelector.getBankLogo(bankDetails);

  return (
    <div className="mb-10 absolute top-16 w-full px-4 z-10">
      <div
        className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 relative flex items-center justify-center"
        style={{ height: 163 }}
      >
        {isEmpty(bankDetails) ? (
          <div
            className="flex flex-col justify-center items-center flex-1 cursor-pointer"
            onClick={onClickToAddBank}
          >
            <CustomImage src={Images.addIcon} imageStyle={{ width: 30 }} />
            <CustomText textClassName="disable-text pt-2">Add Bank</CustomText>
          </div>
        ) : (
          <div className="flex-1">
            <div
              onClick={() => onClickEditBankInfo(bankName)}
              className="primary-bg-color absolute p-2 rounded-2xl flex justify-center items-center cursor-pointer"
              style={{ width: 30, height: 30, right: -3, bottom: -3 }}
            >
              <CustomImage
                src={Images.editIconWhite}
                imageStyle={{ width: 15 }}
              />
            </div>

            <div className="flex justify-between items-center">
              <CustomText textClassName="font-size-large">
                {bankName}
              </CustomText>

              <CustomImage
                src={isEmpty(bankLogo) ? Images.logoImage : bankLogo}
                imageStyle={{ width: 60 }}
              />
            </div>

            <CustomText textClassName="font-bold font-size-large pb-4">
              {accountNumber}
            </CustomText>

            <CustomLabelValue
              label="Bank Holder"
              highlight
              value={accountHolderName}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BankCard;
