import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const TenancyUserSection = ({ t }) => {
  return (
    <div className="flex justify-between pb-4">
      <div className="user-info-container">
        <CustomImage src={Images.profilePic} height={60} width={60} />

        <div className="user-info-content">
          <CustomText textClassName="user-name primary-text">John Doe</CustomText>

          <div className="flex items-center">
            <CustomImage src={Images.blackPhoneIcon} height={15} width={15} />
            <CustomText textClassName="user-info">+6012-3456789</CustomText>
          </div>

          <div className="flex items-center">
            <CustomImage src={Images.blackMailIcon} height={15} width={15} />
            <CustomText textClassName="user-info">user@gmail.com</CustomText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenancyUserSection;
