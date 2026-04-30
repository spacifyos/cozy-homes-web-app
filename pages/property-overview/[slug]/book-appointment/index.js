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
import moment from "moment";
import Icons from "@/components/Icons";

export { getServerSideProps };

const Booking = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [dateValue, setDateValue] = useState(
    moment(new Date()).format("YYYY-MM-DD"),
  );
  const [timeValue, setTimeValue] = useState(
    moment(new Date()).format("hh:mm"),
  );

  const onChangeDate = (e) => {
    setDateValue(e.target.value);
  };

  const onChangeTime = (e) => {
    setTimeValue(e.target.value);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickBookSuccess = (id) => {
    router.push(`/property-overview/${id}/appointment-successful`);
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
          <CustomText textClassName="text-base font-bold pb-1">
            M Vertica, Kuala Lumpur
          </CustomText>

          <CustomText textClassName="text-base font-bold text-primary pb-1">
            A-01-01, Room 2
          </CustomText>
          <CustomText textClassName="text-disable text-sm">
            Residensi M Vertica, 555, Jln Cheras, Taman Pertama, 56000 Kuala
            Lumpur, Federal Territory of Kuala Lumpur.
          </CustomText>
        </div>
        <div className="global-box-shadow global-border-radius bg-white p-4">
          <div className="flex gap-2 items-center pb-5">
            <div className="p-2 global-box-shadow global-border-radius bg-primary">
              <CustomImage src={Icons.bookingIcon} width={25} height={25} />
            </div>

            <CustomText textClassName="font-bold text-base text-primary">
              {t("bookAppointment.myAppointment")}
            </CustomText>
          </div>

          <CustomText textClassName="pb-2">
            {t("bookAppointment.appointmentWith")}
          </CustomText>
          <div className="flex gap-2 items-center pb-5">
            <CustomImage
              src={Images.imageNotFound}
              width={43}
              className="global-border-radius"
            />

            <CustomText textClassName="font-bold text-base">
              Razak bin Osman
            </CustomText>
          </div>
          <CustomText textClassName="pb-1"> {t("bookAppointment.date")}</CustomText>
          <div className="flex items-center global-border-radius p-2 relative booking-input pb-1">
            <input
                className="bg-primary-background flex-1 w-full resize-input-icon"
                type="date"
                value={dateValue}
                onChange={onChangeDate}
            />
            <CustomImage
                src={Icons.calendarIcon}
                imageStyle={{ width: 20, height: 20, marginRight: 4 }}
            />
          </div>

          <CustomText textClassName="pb-1">
            {t("bookAppointment.time")}
          </CustomText>

          <div className="flex items-center global-border-radius p-2 relative booking-input pb-1">
            <input
              className="bg-primary-background flex-1 w-full resize-input-icon "
              type="time"
              value={timeValue}
              onChange={onChangeTime}
            />

            <CustomImage
              src={Icons.clockIcon}
              imageStyle={{ width: 20, height: 20, marginRight: 4 }}
            />
          </div>

          <CustomText textClassName="pb-1">
            {t("bookAppointment.message")}
          </CustomText>

          <BookingTextArea
            className="pb-5"
            placeholder={t("bookAppointment.yourMessageHere")}
          />

          <div className="flex justify-center w-full">
            <CustomButton
              buttonText={t("bookAppointment.bookAppointment")}
              buttonClassName="btn-primary w-3/5"
              onClick={()=>onClickBookSuccess(1)}
            />
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Booking);
