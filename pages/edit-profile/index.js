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
        <div className="flex justify-center">
          <CustomImage
            src={Images.profilePic}
            width={100}
            height={100}
            className="rounded-2xl mb-5"
          />
        </div>
        <BookingInput title={t("editProfile.name")} placeholder="John Doe" />
        <CustomLabelValue
          label={t("editProfile.email")}
          changelabel
          value="john.doe@abccompany.com"
          className="pb-4"
        />
        <CustomLabelValue
          label={t("editProfile.phoneNumber")}
          changelabel
          value="+6012 - 3456 789"
          secondValue="Use this phone number to login system"
          className="pb-4"
        />
        <BookingInput
          title={t("editProfile.password")}
          placeholder={t("editProfile.password")}
        />
        <BookingInput
          title={t("editProfile.confirmPassword")}
          placeholder={t("editProfile.confirmPassword")}
        />
        <CustomText textClassName="font-size-xxsmall mb-1">
          {t("editProfile.pinNumber")}
        </CustomText>
        <CustomButton
          buttonClassName="terminate-btn mb-20"
          buttonText={t("editProfile.setPinNumber")}
        />
        <div className="grid grid-cols-2 gap-4">
          <CustomButton
            buttonClassName=" default-btn-outline"
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
