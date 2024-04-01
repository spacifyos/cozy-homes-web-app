import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const RoomzCoins = ({ t }) => {
  return (
    <div className="profile-coin-container">
      <CustomImage
        src={Images.moreIcon}
        height={25}
        width={25}
        className="absolute right-5 top-5"
      />

      <div className="profile-coin-icon-container">
        <CustomImage src={Images.logoImage} height={30} width={30} />
      </div>

      <CustomText textClassName="disable-text font-size-small">
        {t("account.roomzCoins")}
      </CustomText>

      <div className="flex items-center">
        <CustomText textClassName="primary-text font-size-xxlarge font-bold pr-2">
          5,123
        </CustomText>
        <CustomImage src={Images.refreshIcon} height={20} width={20} />
      </div>
    </div>
  );
};

export default RoomzCoins;
