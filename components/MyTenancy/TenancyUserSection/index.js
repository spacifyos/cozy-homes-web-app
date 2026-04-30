import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as authSelector from "@/src/selectors/auth";
import { isEmpty } from "lodash";
import Icons from "@/components/Icons";

const TenancyUserSection = ({ t, data }) => {
  const name = authSelector.getName(data);
  const email = authSelector.getEmail(data);
  const phoneNumber = authSelector.getPhoneNumber(data);

  return (
    <div className="flex justify-between">
      <div className="user-info-container">
        <CustomImage src={Icons.userIconActive} imageStyle={{ width: 60 }} />

        <div className="user-info-content">
          <CustomText textClassName="user-name text-primary">
            {isEmpty(name) ? "-" : name}
          </CustomText>

          <div className="flex items-center">
            <CustomImage
              src={Icons.phoneIconBlack}
              imageStyle={{ width: 15 }}
            />
            <CustomText textClassName="user-info">
              {isEmpty(phoneNumber) ? "-" : phoneNumber}
            </CustomText>
          </div>

          <div className="flex items-center">
            <CustomImage
              src={Icons.emailIconBlack}
              imageStyle={{ width: 15 }}
            />
            <CustomText textClassName="user-info">
              {isEmpty(email) ? "-" : email}
            </CustomText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenancyUserSection;
