import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const RequestSuccessful = ({}) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const onClickGoMainPage = () => {
    router.replace("/user/help-center");
  };

  return (
    <div className="flex flex-col justify-center items-center relative bg-primary-background h-screen">
      <NextSeo title="Request Successful - Spacify Asia" />

      <CustomImage
        src={Images.paymentSuccessIcon}
        imageStyle={{ width: "150px", height: "150px" }}
      />
      <CustomText textClassName="font-bold pt-4 text-2xl">
        Thank You!
      </CustomText>
      <div className="pb-4 px-10 pt-4">
        <CustomText textClassName="text-sm text-center">
          Request received. We will update you soon.
        </CustomText>
      </div>
      <CustomButton
        buttonClassName="btn-primary"
        buttonStyles={{ padding: "5px 30px" }}
        buttonText={"View Your Request"}
        onClick={onClickGoMainPage}
      />
    </div>
  );
};

export default RequestSuccessful;
