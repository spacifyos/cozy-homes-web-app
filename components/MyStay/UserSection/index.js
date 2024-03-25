import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const UserSection = ({ t }) => {
  return (
    <div className="flex justify-between pb-5">
      <div className="user-info-container">
        <CustomImage src={Images.userIcon} height={25} width={55} />

        <div className="user-info-content">
          <CustomText textClassName="user-name">John Doe</CustomText>

          <div className="flex items-center">
            <CustomImage src={Images.phoneIcon} height={15} width={15} />
            <CustomText textClassName="user-info">+6012-3456789</CustomText>
          </div>
          <div className="flex items-center">
            <CustomImage src={Images.emailIcon} height={15} width={15} />
            <CustomText textClassName="user-info">user@gmail.com</CustomText>
          </div>
        </div>
      </div>

      <div className="coin-container">
        <div className="p-2 primary-bg-color rounded-md">
          <CustomImage src={Images.logoImage} height={30} width={30} />
        </div>
        <div className="pl-2">
          <CustomText textClassName="disable-text font-size-small line-clamp-1">
            {t("myStay.roomzCoins")}
          </CustomText>
          <div className="flex items-center justify-start">
            <CustomText textClassName="primary-text font-bold font-size-xxlarge pr-2">
              99,999
            </CustomText>
            <CustomImage src={Images.refreshIcon} height={18} width={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
