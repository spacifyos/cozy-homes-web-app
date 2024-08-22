import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";

const SpacifyCoins = ({ t, onClickToMyWallet = () => {}, walletBalance }) => {
  return (
    <div
      className="profile-coin-container col-span-2 cursor-pointer"
      onClick={onClickToMyWallet}
    >
      {/*<div className="absolute right-1 top-3 cursor-pointer">*/}
      {/*  <CustomImage src={Images.moreIcon} imageStyle={{ width: 22 }} />*/}
      {/*</div>*/}

      <div className="profile-coin-icon-container">
        <CustomImage src={Images.logoImage} imageStyle={{ width: 30 }} />
      </div>

      <div>
        <CustomText textClassName="disable-text font-size-small">
          My Wallet
        </CustomText>

        <div className="flex items-center justify-center">
          {/*<CustomText textClassName="primary-text font-size-small">*/}
          {/*  Coming Soon*/}
          {/*</CustomText>*/}
          <CustomText textClassName="primary-text font-size-xxlarge font-bold">
            {`RM ${isEmpty(walletBalance) ? "0" : walletBalance}`}
          </CustomText>
          {/*<CustomImage src={Images.refreshIcon} height={20} width={20} />*/}
        </div>
      </div>
    </div>
  );
};

export default SpacifyCoins;
