import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const ProfileCard = ({ onClickToEditProfile }) => {
  return (
    <div className="profile-user-info-container col-span-3">
      <CustomImage
        src={Images.editIcon}
        height={23}
        width={23}
        className="absolute right-3 top-3 cursor-pointer"
        onClick={onClickToEditProfile}
      />

      <CustomImage src={Images.profilePic} height={46} width={46} className="rounded-2xl" />

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
