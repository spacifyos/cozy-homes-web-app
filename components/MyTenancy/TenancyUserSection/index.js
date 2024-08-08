import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as authSelector from "@/src/selectors/auth";
import _ from "lodash";

const TenancyUserSection = ({ t, data }) => {
  const name = authSelector.getName(data);
  const email = authSelector.getEmail(data);
  const phoneNumber = authSelector.getPhoneNumber(data);

  return (
    <div className="flex justify-between pb-4">
      <div className="user-info-container">
        <CustomImage src={Images.userIcon} imageStyle={{ width: 60 }} />

        <div className="user-info-content">
          <CustomText textClassName="user-name primary-text">
            {_.isEmpty(name) ? "-" : name}
          </CustomText>

          <div className="flex items-center">
            <CustomImage
              src={Images.blackPhoneIcon}
              imageStyle={{ width: 15 }}
            />
            <CustomText textClassName="user-info">
              {" "}
              {_.isEmpty(phoneNumber) ? "-" : phoneNumber}
            </CustomText>
          </div>

          <div className="flex items-center">
            <CustomImage
              src={Images.blackMailIcon}
              imageStyle={{ width: 15 }}
            />
            <CustomText textClassName="user-info">
              {_.isEmpty(email) ? "-" : email}
            </CustomText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenancyUserSection;
