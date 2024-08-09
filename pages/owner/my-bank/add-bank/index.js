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
import { get, isEmpty } from "lodash";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";

export { getServerSideProps };

const AddBank = () => {
  const router = useRouter();

  const [isReadAgree, setIsReadAgree] = useState(false);
  const [bankValue, setBankValue] = useState(null);
  const [accountNameValue, setAccountNameValue] = useState("");
  const [accountNumberValue, setAccountNumberValue] = useState("");
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
      isEmpty(accountNumberValue)
    ) {
      return Toast.error("All fields are required.");
    }

    const postData = {
      bank: get(bankValue, ["value"], ""),
      account_name: accountNameValue,
      account_number: accountNumberValue,
    };

    await apiRequest.postUpdateBankDetailRequest(
      postData,
      setUpdateLoading,
      updateSuccessCallback,
    );
  };

  const updateSuccessCallback = () => {
    router.replace("/owner/my-bank/add-bank-successful");
  };

  const onClickSelect = (item) => {
    setOpenSelectBank(false);
    setBankValue(item);
  };

  const onClickOpenSelect = () => {
    setOpenSelectBank(!openSelectBank);
  };

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <NextSeo title="My Bank - Spacify Asia" />

      <div className="body-container pt-5 pb-16">
        <div className="flex items-center">
          <div onClick={onClickGoBack} className="cursor-pointer">
            <CustomImage
              className={"me-5 cursor-pointer"}
              src={Images.leftIconWhite}
              imageStyle={{ width: 10 }}
            />
          </div>

          <CustomText
            textClassName={"font-bold white-text"}
            styles={{ fontSize: 18 }}
          >
            Add Bank
          </CustomText>
        </div>
      </div>

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
          />

          <BookingInput
            title="Account Name"
            required
            bgColor="primaryWhite-bg-color"
            placeholder="Your Name"
            className="pb-4"
            onChange={(e) => setAccountNameValue(e.target.value)}
          />

          <BookingInput
            title="Account Number"
            required
            type="number"
            bgColor="primaryWhite-bg-color"
            placeholder="Your Number"
            className="pb-4"
            onChange={(e) => setAccountNumberValue(e.target.value)}
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
              buttonClassName=" primary-btn"
              buttonText={"Submit"}
              onClick={onClickSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(AddBank));
