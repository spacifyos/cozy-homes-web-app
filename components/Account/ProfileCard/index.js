import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as authSelector from "@/src/selectors/auth";
import _ from "lodash";

const ProfileCard = ({ onClickToEditProfile, data }) => {
  const name = authSelector.getName(data);
  const email = authSelector.getEmail(data);
  const phoneNumber = authSelector.getPhoneNumber(data);

  return (
    <div className="profile-user-info-container col-span-3">
      <CustomImage
        src={Images.editIcon}
        height={23}
        width={23}
        className="absolute right-3 top-3 cursor-pointer"
        onClick={onClickToEditProfile}
      />

      <CustomImage
        src={Images.userIcon}
        height={46}
        width={46}
        className="rounded-2xl"
      />

      <CustomText textClassName="font-sizs-xxlarge font-bold primary-text pb-2 text-center">
        {_.isEmpty(name) ? "-" : name}
      </CustomText>

      <CustomText textClassName="font-size-small leading-3 line-clamp-1 text-center">
        {_.isEmpty(phoneNumber) ? "-" : phoneNumber}
      </CustomText>

      <CustomText textClassName="font-size-small line-clamp-1 text-center">
        {_.isEmpty(email) ? "-" : email}
      </CustomText>
    </div>
  );
};

export default ProfileCard;
