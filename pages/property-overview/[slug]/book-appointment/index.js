import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import BookingTextArea from "@/components/BookingTextArea";
import { useState } from "react";
import DatePicker from "react-date-picker";

export { getServerSideProps };

const Booking = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [dateValue, setDateValue] = useState(new Date());
  const [valueTime, setValueTime] = useState(new Date());

  const onChangeDate = (value) => {
    setDateValue(value);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickBookSuccess = () => {
    router.push("/property-overview/1/appointment-successful");
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
              <CustomImage src={Images.bookingIcon} width={25} height={25} />
            </div>

            <CustomText textClassName="font-bold font-size-xlarge primary-text">
              {t("bookAppointment.myAppointment")}
            </CustomText>
          </div>

          <CustomText textClassName="pb-2">
            {t("bookAppointment.appointmentWith")}
          </CustomText>
          <div className="flex gap-2 items-center pb-5">
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

          <DatePicker
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            yearAriaLabel="Year"
            onChange={onChangeDate}
            value={dateValue}
            className="flex items-center gap-2 booking-input"
            clearIcon
            format="dd MMMy"
            calendarClassName="custom-date-picker"
            locale="en"
            calendarIcon={
              <img
                src="/images/icon/calender_icon.png"
                alt="Calendar"
                style={{ width: "25px", height: "25px" }}
              />
            }
          />

          <CustomText textClassName="pb-1 pt-5">
            {t("bookAppointment.time")}
          </CustomText>

          <div className="flex booking-input">
            <input
              className="primaryWhite-bg-color flex-1 w-full resize-input-icon "
              type="time"
            />

            <CustomImage
              src={Images.clockIcon}
              width={25}
              height={25}
              className="pr-2"
            />
          </div>

          <CustomText textClassName="pb-1 pt-5">
            {t("bookAppointment.message")}
          </CustomText>

          <BookingTextArea
            className="pb-5"
            textareaClassName="primaryWhite-bg-color"
            placeholder={t("bookAppointment.yourMessageHere")}
          />

          <div className="flex justify-center w-full">
            <CustomButton
              buttonText={t("bookAppointment.bookAppointment")}
              buttonClassName="primary-btn w-3/5"
              onClick={onClickBookSuccess}
            />
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Booking);
