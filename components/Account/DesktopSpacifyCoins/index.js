import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const DesktopSpacifyCoins = ({ route, walletBalance }) => {
  return (
    <a
      // href={route}
      className="p-5 global-box-shadow global-border-radius primaryWhite-bg-color flex items-center relative cursor-pointer"
      style={{ minHeight: 140 }}
    >
      {/*<div className="absolute right-1 top-3 cursor-pointer">*/}
      {/*  <CustomImage src={Images.moreIcon} imageStyle={{ width: 22 }} />*/}
      {/*</div>*/}

      <div className="profile-coin-icon-container">
        <CustomImage src={Images.logoImage} imageStyle={{ width: 80 }} />
      </div>

      <div className="flex flex-col pl-4">
        <CustomText textClassName="disable-text font-size-small">
          My Wallet
        </CustomText>

        <div className="flex items-center justify-center">
          {/*<CustomText textClassName="primary-text font-size-small">*/}
          {/*  Coming Soon*/}
          {/*</CustomText>*/}
          <CustomText textClassName="primary-text font-size-xxlarge font-bold">
            {/*{`RM ${isEmpty(walletBalance) ? "0" : walletBalance}`}*/}
            Coming Soon
          </CustomText>
          {/*<CustomImage src={Images.refreshIcon} height={20} width={20} />*/}
        </div>
      </div>
    </a>
  );
};

export default DesktopSpacifyCoins;
