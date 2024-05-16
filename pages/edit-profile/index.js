import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/router";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import BookingInput from "@/components/Booking/BookingInput";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";

export { getServerSideProps };

const EditProfile = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader
      hideRightButton
      hideBgImage
      pageTitle={t("pageTitle.editProfile")}
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container pb-3">
        <div className="flex justify-center items-center">
          <CustomImage
            src={Images.profilePic}
            width={100}
            height={100}
            className="rounded-2xl my-2"
          />
        </div>

        <BookingInput
          bgColor="primaryWhite-bg-color"
          title={t("editProfile.name")}
          placeholder={t("editProfile.name")}
          className="pb-3"
        />

        <CustomLabelValue
          label={t("editProfile.email")}
          value="john.doe@abccompany.com"
          className="pb-4"
        />

        <CustomLabelValue
          label={t("editProfile.phoneNumber")}
          value="+6012 - 3456 789"
          className="pb-0"
        />

        <CustomText textClassName="primary-text font-size-xxsmall pb-4">
          Use this phone number to login system
        </CustomText>

        <BookingInput
          title={t("editProfile.password")}
          placeholder={t("editProfile.password")}
          bgColor="primaryWhite-bg-color"
          className="pb-3"
        />

        <BookingInput
          title={t("editProfile.confirmPassword")}
          placeholder={t("editProfile.confirmPassword")}
          bgColor="primaryWhite-bg-color"
          className="pb-3"
        />

        <CustomText textClassName="font-size-xxsmall mb-1">
          {t("editProfile.pinNumber")}
        </CustomText>

        <CustomButton
          buttonClassName="default-btn-outline btn-sm mb-20"
          buttonStyles={{ paddingRight: 30, paddingLeft: 30, height: 40 }}
          buttonText={t("editProfile.setPinNumber")}
        />

        <div className="grid grid-cols-2 gap-4">
          <CustomButton
            buttonClassName="default-btn-outline"
            buttonText={t("myTenancy.cancel")}
          />

          <CustomButton
            buttonClassName=" primary-btn"
            buttonText={t("myTenancy.submit")}
          />
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(EditProfile);
