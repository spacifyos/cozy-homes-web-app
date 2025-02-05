import { isEmpty, lowerCase, replace } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import * as authSelector from "@/src/selectors/auth";

const BankCard = ({ bankDetails }) => {
  const accountHolderName = authSelector.getAccountHolderName(bankDetails);
  const accountNumber = authSelector.getAccountNumber(bankDetails);
  const bankName = authSelector.getBankName(bankDetails);
  const bankLogo = authSelector.getBankLogo(bankDetails);

  return (
    <div className="mb-10 absolute top-16 w-full px-4 z-10">
      <div
        className="bg-white global-box-shadow global-border-radius p-4 relative flex items-center justify-center"
        style={{ height: 163 }}
      >
        {isEmpty(accountNumber) ? (
          <a
            href={"/user/owner/my-bank/add-bank"}
            className="flex flex-col justify-center items-center flex-1 cursor-pointer"
          >
            <CustomImage src={Images.addIcon} imageStyle={{ width: 30 }} />
            <CustomText textClassName="text-disable pt-2">Add Bank</CustomText>
          </a>
        ) : (
          <div className="flex-1">
            <a
              href={`/user/owner/my-bank/${replace(lowerCase(bankName), " ", "_")}`}
              className="bg-primary absolute p-2 rounded-2xl flex justify-center items-center cursor-pointer"
              style={{ width: 30, height: 30, right: -3, bottom: -3 }}
            >
              <CustomImage
                src={Images.editIconWhite}
                imageStyle={{ width: 15 }}
              />
            </a>

            <div className="flex justify-between items-center">
              <CustomText textClassName="text-base">
                {bankName}
              </CustomText>

              <CustomImage
                src={isEmpty(bankLogo) ? Images.logoImage : bankLogo}
                imageStyle={{ width: 60 }}
              />
            </div>

            <CustomText textClassName="font-bold text-base pb-4">
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
