import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const SpacifyCoins = ({ t, onClickToCoinsTransaction }) => {
  return (
    <div className="profile-coin-container col-span-2">
      <CustomImage
        src={Images.moreIcon}
        height={22}
        width={22}
        className="absolute right-1 top-3 cursor-pointer"
      />

      <div className="profile-coin-icon-container cursor-pointer">
        <CustomImage
          src={Images.logoImage}
          height={30}
          width={30}
          onClick={onClickToCoinsTransaction}
        />
      </div>

      <div>
        <CustomText textClassName="disable-text font-size-small">
          {t("account.spacifyCoins")}
        </CustomText>

        <div className="flex items-center">
          <CustomText textClassName="primary-text font-size-small">
            Coming Soon
          </CustomText>
          {/*<CustomText textClassName="primary-text font-size-xxlarge font-bold pr-2">*/}
          {/*  5,123*/}
          {/*</CustomText>*/}
          {/*<CustomImage src={Images.refreshIcon} height={20} width={20} />*/}
        </div>
      </div>
    </div>
  );
};

export default SpacifyCoins;
