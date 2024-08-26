import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { NextSeo } from "next-seo";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import BookingInput from "@/components/Booking/BookingInput";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import CustomSelectWithIcon from "@/components/CustomSelectWithIcon";
import { get, isEmpty, size } from "lodash";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useSelector } from "react-redux";
import * as commonSelector from "@/src/selectors/common";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";

export { getServerSideProps };

const AddBank = () => {
  const router = useRouter();

  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );
  const bankOption = commonSelector.getBankList(selectOptionData);

  const [isReadAgree, setIsReadAgree] = useState(false);
  const [bankValue, setBankValue] = useState(null);
  const [accountNameValue, setAccountNameValue] = useState("");
  const [accountNumberValue, setAccountNumberValue] = useState("");
  const [pinNumberValue, setPinNumberValue] = useState("");
  const [openSelectBank, setOpenSelectBank] = useState(false);

  const [updateLoading, setUpdateLoading] = useState(false);

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
      title="Add Bank"
      className="pb-10"
      onClickGoBack={onClickGoBack}
    >
      <NextSeo title="Add Bank | Owner - Spacify Asia" />

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

      <div className="body-container bg-color flex flex-1 pt-12 pb-4 w-full">
        <div className="w-full">
          <CustomSelectWithIcon
            title="Bank Name"
            option={bankOption}
            required
            onClickSelect={onClickSelect}
            value={bankValue}
            onClickOpenSelect={onClickOpenSelect}
            openSelectBank={openSelectBank}
          />

          <BookingInput
            title="Account Holder Name"
            required
            bgColor="primaryWhite-bg-color"
            placeholder="Your Holder Name"
            className="pb-4"
            onChange={(e) => setAccountNameValue(e.target.value)}
          />

          <BookingInput
            title="Account Number"
            required
            type="number"
            bgColor="primaryWhite-bg-color"
            placeholder="Your Account Number"
            className="pb-4"
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

          <div className="flex items-start">
            <div className="" style={{ width: 20, height: 20 }}>
              <CustomImage
                src={isReadAgree ? Images.checkGreenIcon : Images.uncheckIcon}
                imageStyle={{ width: 20, height: 20 }}
                onClick={onClickReadAgree}
                className="cursor-pointer"
              />
            </div>

            <CustomText textClassName="pl-2 font-size-small disable-text text-justify">
              By or adding or updating your bank account details, you
              acknowledge and agree that all information provided is accurate
              and complete. Any errors or discrepancies in the information
              submitted, including but not limited to the bank name, account
              holder name, and account number, are solely your responsibility.
              Spacify shall not be liable for any loss or delay in transactions
              caused by incorrect or incomplete details provided by you. It is
              your responsibility to ensure that the details are correct before
              confirming the update. If you encounter any issues, please contact
              our support team immediately.
            </CustomText>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
            <CustomButton
              buttonClassName="default-btn-outline"
              buttonText={"Cancel"}
              onClick={onClickGoBack}
            />

            <CustomButton
              buttonClassName=" primary-btn"
              buttonText={"Submit"}
              onClick={onClickSubmit}
            />
          </div>
        </div>
      </div>

      <LoadingOverlay loading={updateLoading} />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(AddBank));
