import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as authSelector from "@/src/selectors/auth";
import { isEmpty } from "lodash";
import Icons from "@/components/Icons";

const UserSection = ({ data }) => {
  const name = authSelector.getName(data);
  const email = authSelector.getEmail(data);
  const phoneNumber = authSelector.getPhoneNumber(data);

  return (
    <div className="flex justify-between pb-5">
      <div className="user-info-container">
        <CustomImage src={Icons.userIconActive} imageStyle={{ width: 55 }} />

        <div className="user-info-content">
          <CustomText textClassName="user-name">
            {isEmpty(name) ? "-" : name}
          </CustomText>

          <div className="flex items-center">
            <CustomImage src={Icons.phoneIconBlack} imageStyle={{ width: 16 }} />
            <CustomText textClassName="user-info">
              {isEmpty(phoneNumber) ? "-" : phoneNumber}
            </CustomText>
          </div>
          <div className="flex items-center">
            <CustomImage src={Icons.emailIconBlack} imageStyle={{ width: 16 }} />
            <CustomText textClassName="user-info">
              {isEmpty(email) ? "-" : email}
            </CustomText>
          </div>
        </div>
      </div>

      {/*<div className="coin-container">*/}
      {/*  <div className="p-2 bg-primary rounded-md">*/}
      {/*    <CustomImage src={Images.logo} height={30} width={30} />*/}
      {/*  </div>*/}
      {/*  <div className="pl-2">*/}
      {/*    <CustomText textClassName="text-disable text-sm line-clamp-1">*/}
      {/*      {t("myStay.spacifyCoins")}*/}
      {/*    </CustomText>*/}
      {/*    <div className="flex items-center justify-start">*/}
      {/*      <CustomText textClassName="text-primary font-bold text-lg pr-2">*/}
      {/*        99,999*/}
      {/*      </CustomText>*/}
      {/*      <CustomImage src={Icons.refreshIcon} height={18} width={18} />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default UserSection;
