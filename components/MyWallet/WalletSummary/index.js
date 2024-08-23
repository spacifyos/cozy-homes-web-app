import { get, isEmpty, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import * as walletSelector from "@/src/selectors/wallet";

const WalletSummary = ({ data }) => {
  const totalIncome = walletSelector.getTotalIncome(data);
  const totalExpense = walletSelector.getTotalExpense(data);
  const totalWithdraw = walletSelector.getTotalWithdrawal(data);

  const summaryList = [
    {
      name: "Total Income",
      value: totalIncome,
      icon: Images.rentalInIcon,
    },
    {
      name: "Total Expenses",
      value: totalExpense,
      icon: Images.rentalOutIcon,
    },
    {
      name: "Total Withdraw",
      value: totalWithdraw,
      icon: Images.withdrawIcon,
    },
  ];

  return (
    <div className="px-4 absolute top-36 w-full z-10">
      <div className="grid grid-cols-3 gap-3">
        {map(summaryList, (list) => {
          const name = get(list, ["name"], "");
          const value = get(list, ["value"], "");
          const icon = get(list, ["icon"], "");

          return (
            <div className="global-box-shadow global-border-radius p-2 flex flex-col items-center justify-center primaryWhite-bg-color">
              <CustomImage src={icon} imageStyle={{ width: 35 }} />

              <CustomText textClassName="font-size-xxlarge font-bold leading-4 py-1">
                {isEmpty(value) ? "RM0" : value}
              </CustomText>

              <CustomText textClassName="disable-text font-size-xxsmall">
                {name}
              </CustomText>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletSummary;
