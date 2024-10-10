import * as authSelector from "@/src/selectors/auth";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";

const DesktopProfileCard = ({ data }) => {
  const name = authSelector.getName(data);
  const email = authSelector.getEmail(data);
  const phoneNumber = authSelector.getPhoneNumber(data);

  return (
    <div
      className="p-5 global-box-shadow global-border-radius primaryWhite-bg-color flex items-center relative"
      style={{ minHeight: 140 }}
    >
      <a
        href={"/edit-profile"}
        className="absolute right-5 top-5 cursor-pointer"
      >
        <CustomImage src={Images.editIcon} imageStyle={{ width: 23 }} />
      </a>

      <CustomImage
        src={Images.userIcon}
        imageStyle={{ width: 80 }}
        className="rounded-2xl"
      />

      <div className="pl-2">
        <CustomText textClassName="font-sizs-xxlarge font-bold primary-text pb-2">
          {isEmpty(name) ? "-" : name}
        </CustomText>

        <CustomText textClassName="font-size-small leading-3 line-clamp-1">
          {isEmpty(phoneNumber) ? "-" : phoneNumber}
        </CustomText>

        <CustomText textClassName="font-size-small line-clamp-1">
          {isEmpty(email) ? "-" : email}
        </CustomText>
      </div>
    </div>
  );
};

export default DesktopProfileCard;
