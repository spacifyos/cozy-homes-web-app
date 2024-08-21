import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { NextSeo } from "next-seo";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import BookingInput from "@/components/Booking/BookingInput";
import BookingSelect from "@/components/Booking/BookingSelect";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import CustomSelectWithIcon from "@/components/CustomSelectWithIcon";
import { get, isEmpty, isEqual, filter, size } from "lodash";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "@/src/actions/auth";
import * as authSelector from "@/src/selectors/auth";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as commonSelector from "@/src/selectors/common";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";

export { getServerSideProps };

const BankOverview = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );
  const bankOption = commonSelector.getBankList(selectOptionData);

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const bankDetails = authSelector.getBankDetails(userProfileData);
  const accountHolderName = authSelector.getAccountHolderName(bankDetails);
  const accountNumber = authSelector.getAccountNumber(bankDetails);
  const bankName = authSelector.getBankName(bankDetails);

  const selectedBank = filter(bankOption, (bank) =>
    isEqual(get(bank, ["label"], ""), bankName),
  );

  const [isReadAgree, setIsReadAgree] = useState(false);
  const [bankValue, setBankValue] = useState(null);
  const [accountNameValue, setAccountNameValue] = useState("");
  const [accountNumberValue, setAccountNumberValue] = useState("");
  const [pinNumberValue, setPinNumberValue] = useState("");
  const [openSelectBank, setOpenSelectBank] = useState(false);

  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!isEmpty(bankDetails)) {
      setBankValue(get(selectedBank, [0], null));
      setAccountNameValue(accountHolderName);
      setAccountNumberValue(accountNumber);
    }
  }, [bankDetails]);

  useEffect(() => {
    fetchUserprofileData();
  }, []);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const onClickReadAgree = () => {
    setIsReadAgree(!isReadAgree);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSubmit = async () => {
    if (
      isEmpty(bankValue) ||
      isEmpty(accountNameValue) ||
      isEmpty(accountNumberValue) ||
      isEmpty(pinNumberValue)
    ) {
      return Toast.error("All fields are required.");
    }

    if (!isReadAgree) {
      return Toast.error("Please read and check the following info.");
    }

    const postData = {
      bank_name: get(bankValue, ["value"], ""),
      account_holder_name: accountNameValue,
      account_number: accountNumberValue,
      pin_number: pinNumberValue,
    };

    await apiRequest.postUpdateBankDetailRequest(
      postData,
      setUpdateLoading,
      updateSuccessCallback,
    );
  };

  const updateSuccessCallback = () => {
    router.push("/owner/my-bank/add-bank-successful");
  };

  const onClickSelect = (item) => {
    setOpenSelectBank(false);
    setBankValue(item);
  };

  const onClickOpenSelect = () => {
    setOpenSelectBank(!openSelectBank);
  };

  return (
    <CustomOwnerHeader
      title="Bank Overview"
      className="pb-10"
      onClickGoBack={onClickGoBack}
    >
      <NextSeo title="Bank Overview | Owner - Spacify Asia" />

      <div className="mb-10 absolute top-16 w-full px-4 z-10">
        <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 relative flex items-center">
          <div className="primary-bg-color p-3 global-border-radius mr-2">
            <CustomImage
              src={Images.bankIconWhite}
              imageStyle={{ width: 20 }}
            />
          </div>

          <CustomText textClassName="primary-text font-bold">
            Bank Details
          </CustomText>
        </div>
      </div>

      <div className="body-container bg-color flex flex-1 pt-12 w-full">
        <div className="w-full">
          <CustomSelectWithIcon
            title="Bank Name"
            required
            onClickSelect={onClickSelect}
            value={bankValue}
            onClickOpenSelect={onClickOpenSelect}
            openSelectBank={openSelectBank}
            option={bankOption}
          />

          <BookingInput
            title="Account Holder Name"
            required
            bgColor="primaryWhite-bg-color"
            placeholder="Your Holder Name"
            className="pb-4"
            value={accountNameValue}
            onChange={(e) => setAccountNameValue(e.target.value)}
          />

          <BookingInput
            title="Account Number"
            required
            bgColor="primaryWhite-bg-color"
            placeholder="Your Account Number"
            className="pb-4"
            value={accountNumberValue}
            onChange={(e) => setAccountNumberValue(e.target.value)}
          />

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

          <div className="flex pt-3">
            <div className="flex items-start">
              <CustomImage
                src={isReadAgree ? Images.checkGreenIcon : Images.uncheckIcon}
                imageStyle={{ width: 40 }}
                onClick={onClickReadAgree}
                className="cursor-pointer"
              />
              <CustomText textClassName="pl-3 font-bold disable-text">
                I understand and agree to give Spacify and CTOS the consent to
                process my personal data as per PDPA Act.
              </CustomText>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
            <CustomButton
              buttonClassName="default-btn-outline"
              buttonText={"Cancel"}
              onClick={onClickGoBack}
            />

            <CustomButton
              buttonClassName="primary-btn"
              buttonText={"Update"}
              onClick={onClickSubmit}
            />
          </div>
        </div>
      </div>

      <LoadingOverlay loading={updateLoading || userProfileLoading} />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(BankOverview));
