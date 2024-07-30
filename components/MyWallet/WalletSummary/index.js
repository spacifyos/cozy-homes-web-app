import { get, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";

const data = [
  {
    name: "total income",
    value: 999,
    icon: Images.rentalInIcon,
  },
  {
    name: "total expenses",
    value: 999,
    icon: Images.rentalOutIcon,
  },
  {
    name: "total withdraw",
    value: 999,
    icon: Images.withdrawIcon,
  },
];

const WalletSummary = () => {
  return (
    <div className="px-4 absolute top-40 w-full z-10">
      <div className="grid grid-cols-3 gap-3">
        {map(data, (list) => {
          const name = get(list, ["name"], "");
          const value = get(list, ["value"], "");
          const icon = get(list, ["icon"], "");

          return (
            <div className="global-box-shadow global-border-radius px-2 py-5 flex items-center justify-center primaryWhite-bg-color">
              <CustomImage src={icon} width={22} height={22}/>

              <div className="pl-2">
                <CustomText textClassName="font-size-xxlarge font-bold leading-4">
                  {value}
                </CustomText>
                <CustomText textClassName="disable-text font-size-xxsmall">
                  {name}
                </CustomText>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletSummary;
