import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const RoomzCoins = () => {
  return (
    <div className="p-5 global-box-shadow global-border-radius primaryWhite-bg-color flex flex-col justify-content items-center relative">
      <CustomImage
        src={Images.moreIcon}
        height={10}
        width={5}
        className="absolute right-5 top-5"
      />

      <div className="primary-bg-color p-2 global-box-shadow global-border-radius mb-2">
        <CustomImage src={Images.logoImage} height={30} width={30} />
      </div>

      <CustomText textClassName="disable-text font-size-small">
        Roomz Coins
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
