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
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

export { getServerSideProps };

const AddBank = () => {
  const router = useRouter();

  const [isReadAgree, setIsReadAgree] = useState(false);

  const onClickReadAgree = () => {
    setIsReadAgree(!isReadAgree);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSubmit = () => {
    router.push("/owner/my-bank/add-bank-successful")
  };

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <NextSeo title="My Bank - Spacify Asia" />

      <div className="body-container pt-5 pb-16">
        <div className="flex items-center">
          <div onClick={onClickGoBack} className="cursor-pointer">
            <CustomImage
              className={"me-5 w-2.5 cursor-pointer"}
              src={Images.leftIconWhite}
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
            <CustomImage src={Images.bankIconWhite} width={20} height={20} />
          </div>

          <CustomText textClassName="primary-text font-bold">
            Bank Details
          </CustomText>
        </div>
      </div>

      <div className="body-container bg-color flex flex-1 pt-12 w-full">
        <div className="w-full">
          <BookingSelect
            title="Bank Name"
            placeholder="Select Bank"
            lists={[]}
            required
            bgColor="primaryWhite-bg-color"
            className="pb-4"
          />

          <BookingInput
            title="Account Name"
            required
            bgColor="primaryWhite-bg-color"
            placeholder="Your Name"
            className="pb-4"
          />

          <BookingInput
            title="Account Number"
            required
            bgColor="primaryWhite-bg-color"
            placeholder="Your Number"
            className="pb-4"
          />

          <div className="flex pt-3">
            <div className="flex items-start">
              <CustomImage
                src={isReadAgree ? Images.checkGreenIcon : Images.uncheckIcon}
                width={23}
                height={23}
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
