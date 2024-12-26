import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as authSelector from "@/src/selectors/auth";
import { isEmpty } from "lodash";

const UserSection = ({ data }) => {
  const name = authSelector.getName(data);
  const email = authSelector.getEmail(data);
  const phoneNumber = authSelector.getPhoneNumber(data);

  return (
    <div className="flex justify-between pb-5">
      <div className="user-info-container">
        <CustomImage src={Images.userIcon} imageStyle={{ width: 55 }} />

        <div className="user-info-content">
          <CustomText textClassName="user-name">
            {isEmpty(name) ? "-" : name}
          </CustomText>

          <div className="flex items-center">
            <CustomImage src={Images.phoneIcon} imageStyle={{ width: 16 }} />
            <CustomText textClassName="user-info">
              {isEmpty(phoneNumber) ? "-" : phoneNumber}
            </CustomText>
          </div>
          <div className="flex items-center">
            <CustomImage src={Images.emailIcon} imageStyle={{ width: 16 }} />
            <CustomText textClassName="user-info">
              {isEmpty(email) ? "-" : email}
            </CustomText>
          </div>
        </div>
      </div>

      {/*<div className="coin-container">*/}
      {/*  <div className="p-2 primary-bg-color rounded-md">*/}
      {/*    <CustomImage src={Images.logoImage} height={30} width={30} />*/}
      {/*  </div>*/}
      {/*  <div className="pl-2">*/}
      {/*    <CustomText textClassName="disable-text text-sm line-clamp-1">*/}
      {/*      {t("myStay.spacifyCoins")}*/}
      {/*    </CustomText>*/}
      {/*    <div className="flex items-center justify-start">*/}
      {/*      <CustomText textClassName="primary-text font-bold text-lg pr-2">*/}
      {/*        99,999*/}
      {/*      </CustomText>*/}
      {/*      <CustomImage src={Images.refreshIcon} height={18} width={18} />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default UserSection;
