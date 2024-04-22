import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import BookingTextArea from "@/components/BookingTextArea";
import BookingInput from "@/components/Booking/BookingInput";
export { getServerSideProps };

const Booking = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.bookAppointment")}
      hideBgImage
      hideRightButton
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container pb-5">
        <div className="flex justify-center pb-7">
          <CustomImage
            src={Images.filterDefaultImage}
            imageStyle={{ width: "100%" }}
            className="rounded-2xl"
          />
        </div>
        <div className=" flex flex-col items-start pb-7">
          <CustomText textClassName="font-size-large font-bold pb-1">
            M Vertica, Kuala Lumpur
          </CustomText>

          <CustomText textClassName="font-size-normal font-bold primary-text pb-1">
            A-01-01, Room 2
          </CustomText>
          <CustomText textClassName="disable-text font-size-small">
            Residensi M Vertica, 555, Jln Cheras, Taman Pertama, 56000 Kuala
            Lumpur, Federal Territory of Kuala Lumpur.
          </CustomText>
        </div>
        <div className="global-box-shadow global-border-radius primaryWhite-bg-color p-4">
          <div className="flex gap-2 items-center pb-5">
            <div className="p-2 global-box-shadow global-border-radius primary-bg-color">
              <CustomImage src={Images.bookingIcon} width={20} />
            </div>
            <CustomText textClassName="font-bold font-size-xlarge primary-text">
              {t("bookAppointment.myAppointment")}
            </CustomText>
          </div>

          <CustomText textClassName="pb-2">
            {t("bookAppointment.appointmentWith")}
          </CustomText>
          <div className="flex gap-2 items-center pb-4">
            <CustomImage
              src={Images.agentIcon}
              width={43}
              className="global-border-radius"
            />
            <CustomText textClassName="font-bold font-size-large">
              Razak bin Osman
            </CustomText>
          </div>
          <CustomText textClassName="pb-1">
            {t("bookAppointment.date")}
          </CustomText>
          <BookingInput
            className="pb-5"
            inputClassName="primaryWhite-bg-color resize-input-icon"
            placeholder={t("bookAppointment.selectDate")}
            type="date"
          />
          <CustomText textClassName="pb-1">
            {t("bookAppointment.time")}
          </CustomText>
          <BookingInput
            className="pb-3 "
            inputClassName="primaryWhite-bg-color resize-input-icon"
            placeholder={t("bookAppointment.selectTime")}
            type="time"
          />
          <CustomText textClassName="pb-1">
            {t("bookAppointment.message")}
          </CustomText>
          <BookingTextArea
            className="pb-5"
            textareaClassName="primaryWhite-bg-color"
            placeholder={t("bookAppointment.yourMessageHere")}
          />
          <div className="flex justify-center pt-3 w-full">
            <CustomButton
              buttonText={t("bookAppointment.bookAppointment")}
              buttonClassName="primary-btn w-3/5"
            />
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Booking);
