import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const TenancyUserSection = ({ t }) => {
  return (
    <div className="flex justify-between pb-7">
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
    </div>
  );
};

export default TenancyUserSection;
