import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";
import CustomText from "@/components/CustomText";
import { isEmpty, size, get } from "lodash";
import moment from "moment/moment";
import BookingInput from "@/components/Booking/BookingInput";
import CustomImage from "@/components/CustomImage";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "@/src/actions/auth";
import * as authSelector from "@/src/selectors/auth";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";

export { getServerSideProps };

const Withdraw = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const bankDetails = authSelector.getBankDetails(userProfileData);
  const walletBalance = authSelector.getWalletBalance(userProfileData);
  const walletUpdatedAt = authSelector.getWalletUpdatedAt(userProfileData);
  const walletIsCanWithdraw =
    authSelector.getWalletIsCanWithdraw(userProfileData);
  const walletWithdrawableAmount =
    authSelector.getWalletWithdrawableAmount(userProfileData);
  const bankName = authSelector.getBankName(bankDetails);
  const bankLogo = authSelector.getBankLogo(bankDetails);

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [pinNumberValue, setPinNumberValue] = useState("");

  const [withdrawLoading, setWithdrawLoading] = useState(false);

  useEffect(() => {
    fetchUserprofileData();
  }, []);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const onChangeWithdrawAmount = (e) => {
    setWithdrawAmount(e.target.value);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSubmit = async () => {
    if (isEmpty(withdrawAmount) || isEmpty(pinNumberValue)) {
      return Toast.error("All fields are required.");
    }

    const postData = {
      amount: withdrawAmount,
      pin_number: pinNumberValue,
    };

    await apiRequest.postWalletWithdrawRequest(
      postData,
      setWithdrawLoading,
      withdrawSuccess,
    );
  };

  const withdrawSuccess = (res) => {
    const transactionNumber = get(res, ["transaction_number"], "");

    if (!isEmpty(transactionNumber)) {
      router.push(
        `/owner/my-wallet/transaction-overview/${transactionNumber}/withdraw-successful`,
      );
    }
  };

  return (
    <CustomOwnerHeader
      onClickGoBack={onClickGoBack}
      title="Withdraw Request"
      headerContent={
        <div className="flex flex-col items-center">
          <CustomText textClassName="white-text">Wallet Balance</CustomText>
          <CustomText
            textClassName={`white-text font-bold`}
            styles={{ fontSize: 24 }}
          >
            RM {isEmpty(walletBalance) ? "0" : walletBalance}
          </CustomText>
          <CustomText textClassName="white-text font-size-xxsmall">
            {`Last updated: ${isEmpty(walletUpdatedAt) ? moment().format("DD MMM YYYY, HH:mmm") : walletUpdatedAt}`}
          </CustomText>
        </div>
      }
    >
      <div className="body-container bg-color flex-1 py-5">
        <BookingInput
          title="Withdraw Amount"
          placeholder="Key in amount"
          className="pb-6"
          value={withdrawAmount}
          onChange={onChangeWithdrawAmount}
          type="number"
          bgColor="primaryWhite-bg-color"
        />

        <div className="pb-6">
          <CustomText textClassName="input-title">Transfer To</CustomText>

          <div
            className="booking-input flex items-center primaryWhite-bg-color"
            style={{ height: 50 }}
          >
            <CustomImage
              imageStyle={{ width: 30 }}
              src={isEmpty(bankLogo) ? Images.logoImage : bankLogo}
            />
            <CustomText textClassName="font-size-small pl-2">
              {isEmpty(bankName) ? "-" : bankName}
            </CustomText>
          </div>
        </div>

        <BookingInput
          title="Pin Number"
          required
          type="number"
          bgColor="primaryWhite-bg-color"
          placeholder="Your Pin Number"
          className="pb-4"
          onChange={(e) => {
            if (size(e.target.value) <= 6) {
              setPinNumberValue(e.target.value);
            }
          }}
          value={pinNumberValue}
        />

        <div className="grid grid-cols-2 gap-4 pt-6">
          <CustomButton
            buttonClassName="default-btn-outline"
            buttonText={"Cancel"}
            onClick={onClickGoBack}
          />

          <CustomButton
            disable={!walletIsCanWithdraw}
            buttonClassName="primary-btn"
            buttonText={"Submit"}
            onClick={onClickSubmit}
          />
        </div>
      </div>

      <LoadingOverlay loading={userProfileLoading || withdrawLoading} />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(Withdraw));
