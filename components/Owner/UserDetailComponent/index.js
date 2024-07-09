import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";

const UserDetailComponent = ({ name, phoneNumber, email }) => {
  return (
    <div className="px-4 absolute top-20 w-full">
      <div className="p-3 relative w-full primaryWhite-bg-color global-border-radius global-box-shadow z-10 flex justify-between">
        <div className="flex">
          <CustomImage src={Images.userIcon} height={60} width={60} />

          <div className="user-info-content">
            <CustomText textClassName="user-name">
              {isEmpty(name) ? "-" : name}
            </CustomText>

            <div className="flex items-center">
              <CustomImage src={Images.phoneIcon} height={15} width={15} />
              <CustomText textClassName="user-info">
                {isEmpty(phoneNumber) ? "-" : phoneNumber}
              </CustomText>
            </div>
            <div className="flex items-center">
              <CustomImage src={Images.emailIcon} height={15} width={15} />
              <CustomText textClassName="user-info">
                {isEmpty(email) ? "-" : email}
              </CustomText>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <CustomText textClassName="disable-text font-size-xsmall">
            My Wallet
          </CustomText>
          <CustomText textClassName="primary-text font-size-xlarge font-bold">
            RM99,999
          </CustomText>
        </div>
      </div>
    </div>
  );
};

export default UserDetailComponent;
