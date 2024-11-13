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
    <div className="p-3 relative w-full primaryWhite-bg-color global-border-radius global-box-shadow flex justify-between items-end mb-6">
      <div className="flex items-end">
        <CustomImage src={Images.userIcon} imageStyle={{ width: 50 }} />

        <div className="user-info-content">
          <CustomText textClassName="font-bold pb-1" lineClamp={1}>
            {isEmpty(name) ? "-" : name}
          </CustomText>

          <div className="flex items-center">
            <CustomImage src={Images.phoneIcon} imageStyle={{ width: 12 }} />
            <CustomText
              textClassName="font-size-xxsmall pl-2 disable-text"
              lineClamp={1}
            >
              {isEmpty(phoneNumber) ? "-" : phoneNumber}
            </CustomText>
          </div>
          <div className="flex items-center">
            <CustomImage src={Images.emailIcon} imageStyle={{ width: 12 }} />
            <CustomText
              textClassName="font-size-xxsmall pl-2 disable-text"
              lineClamp={1}
            >
              {isEmpty(email) ? "-" : email}
            </CustomText>
          </div>
        </div>
      </div>

      {/*<a*/}
      {/*  href={"/owner/my-wallet"}*/}
      {/*  className="flex justify-end items-center cursor-pointer"*/}
      {/*>*/}
      {/*  <CustomImage*/}
      {/*    className="bg-color global-box-shadow global-border-radius"*/}
      {/*    src={Images.logoImage}*/}
      {/*    imageStyle={{ width: 40, height: 40 }}*/}
      {/*  />*/}

      {/*  <div className="flex flex-col pl-2">*/}
      {/*    <CustomText textClassName="disable-text font-size-xxsmall">*/}
      {/*      My Wallet*/}
      {/*    </CustomText>*/}
      {/*    <CustomText textClassName="primary-text font-size-xlarge font-bold">*/}
      {/*      {`RM ${isEmpty(walletBalance) ? "0" : walletBalance}`}*/}
      {/*    </CustomText>*/}
      {/*  </div>*/}
      {/*</a>*/}
    </div>
  );
};

export default UserDetailComponent;
