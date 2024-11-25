import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };
const AppointmentSuccessful = ({}) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const onClickGoMainPage = () => {
    router.push("/explore");
  };

  const onClickToMyAppointment = () => {
    router.push("/my-appointment");
  };

  return (
    <div className="flex flex-col justify-center items-center pt-32 relative">
      <CustomImage
        src={Images.cancelIcon}
        imageStyle={{ width: "20px" }}
        className=" absolute top-5 right-5 cursor-pointer"
        onClick={onClickGoMainPage}
      />
      <CustomImage
        src={Images.successIcon}
        imageStyle={{ width: "150px", height: "150px" }}
      />
      <CustomText textClassName="font-bold pt-4" styles={{ fontSize: "25px" }}>
        {t("bookAppointment.thankyou")}
      </CustomText>

      <div className="pb-4 px-10 pt-4">
        <CustomText textClassName="text-xs text-center">
          Appointment received. We will update you soon. An email will be sent to
          email <span className="underline">te**@gmail.com.</span>
        </CustomText>
      </div>

      <CustomButton
        buttonClassName="primary-btn"
        buttonStyles={{ padding: "5px 30px" }}
        buttonText={t("bookAppointment.viewAppointment")}
        onClick={onClickToMyAppointment}
      />
    </div>
  );
};

export default AppointmentSuccessful;
