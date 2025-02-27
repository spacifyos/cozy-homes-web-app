import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";
import * as ownerSelector from "@/src/selectors/owner";
import * as authSelector from "@/src/selectors/auth";

const UserDetailComponent = ({ data }) => {
  const name = authSelector.getName(data);
  const email = authSelector.getEmail(data);
  const phoneNumber = authSelector.getPhoneNumber(data);
  const walletBalance = authSelector.getWalletBalance(data);

  return (
    <div className="p-3 relative w-full bg-white global-border-radius global-box-shadow flex justify-between items-end mb-6">
      <div className="flex items-end">
        <CustomImage src={Images.userIconActive} imageStyle={{ width: 50 }} />

        <div className="user-info-content">
          <CustomText textClassName="font-bold pb-1" lineClamp={1}>
            {isEmpty(name) ? "-" : name}
          </CustomText>

          <div className="flex items-center">
            <CustomImage src={Images.phoneIconBlack} imageStyle={{ width: 12 }} />
            <CustomText
              textClassName="text-xs pl-2 text-disable"
              lineClamp={1}
            >
              {isEmpty(phoneNumber) ? "-" : phoneNumber}
            </CustomText>
          </div>
          <div className="flex items-center">
            <CustomImage src={Images.emailIconBlack} imageStyle={{ width: 12 }} />
            <CustomText
              textClassName="text-xs pl-2 text-disable"
              lineClamp={1}
            >
              {isEmpty(email) ? "-" : email}
            </CustomText>
          </div>
        </div>
      </div>

      {/*<a*/}
      {/*  href={"/user/owner/my-wallet"}*/}
      {/*  className="flex justify-end items-center cursor-pointer"*/}
      {/*>*/}
      {/*  <CustomImage*/}
      {/*    className="bg-primary-background global-box-shadow global-border-radius"*/}
      {/*    src={Images.logo}*/}
      {/*    imageStyle={{ width: 40, height: 40 }}*/}
      {/*  />*/}

      {/*  <div className="flex flex-col pl-2">*/}
      {/*    <CustomText textClassName="text-disable text-xs">*/}
      {/*      My Wallet*/}
      {/*    </CustomText>*/}
      {/*    <CustomText textClassName="text-primary text-base font-bold">*/}
      {/*      {`RM ${isEmpty(walletBalance) ? "0" : walletBalance}`}*/}
      {/*    </CustomText>*/}
      {/*  </div>*/}
      {/*</a>*/}
    </div>
  );
};

export default UserDetailComponent;
