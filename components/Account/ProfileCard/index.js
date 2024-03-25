import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const ProfileCard = () => {
  return (
    <div className="user-info-container">
      <CustomImage
        src={Images.editIcon}
        height={25}
        width={25}
        className="absolute right-5 top-5"
      />

      <CustomImage src={Images.userIcon} height={40} width={40} className="" />

      <CustomText textClassName="font-sizs-xxlarge font-bold primary-text pb-2">
        John Doe
      </CustomText>

      <CustomText textClassName="font-size-small leading-3 line-clamp-1">
        +6012-345 6789
      </CustomText>

      <CustomText textClassName="font-size-small line-clamp-1">
        john.doe@gmail.com
      </CustomText>
    </div>
  );
};

export default ProfileCard;
