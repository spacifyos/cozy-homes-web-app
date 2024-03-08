import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const UserSection = () => {
  return (
    <div className="flex justify-between pb-5">
      <div className="flex items-center pr-3">
        <CustomImage src={Images.userIcon} height={25} width={55} />

        <div className="flex flex-col justify-center pl-2">
          <CustomText textClassName="font-size-xlarge font-bold line-clamp-1 pb-1">
            John Doe
          </CustomText>

          <div className="flex items-center">
            <CustomImage src={Images.phoneIcon} height={15} width={15} />
            <CustomText textClassName="disable-text font-size-xsmall pl-2 line-clamp-1">
              +6012-3456789
            </CustomText>
          </div>
          <div className="flex items-center">
            <CustomImage src={Images.emailIcon} height={15} width={15} />
            <CustomText textClassName="disable-text font-size-xsmall pl-2 line-clamp-1">
              user@gmail.com
            </CustomText>
          </div>
        </div>
      </div>

      <div className="primaryWhite-bg-color global-box-shadow p-3 flex items-center justify-center global-border-radius">
        <div className="p-2 primary-bg-color rounded-md">
          <CustomImage src={Images.logoImage} height={30} width={30} />
        </div>
        <div className="pl-2">
          <CustomText textClassName="disable-text font-size-small line-clamp-1">
            Roomz Coins
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
