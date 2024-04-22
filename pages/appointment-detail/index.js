import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useState, useRef, useEffect } from "react";
import TimeLine from "@/components/AppointmentDetail/TimeLine";
import BookingInput from "@/components/Booking/BookingInput";
import moment from "moment";
export { getServerSideProps };

const Booking = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const chatList = [
    {
      date: "10 Sep 21, 11.00am",
      img: Images.filterDefaultImage,
      name: "Joan Lim",
      chat: "Meet at lobby.",
      icon: Images.ellipseGreenIcon,
      identity: "other",
    },
    {
      date: "10 Sep 21, 11.35am",
      img: Images.agentIcon,
      name: "Razak bin Oszak",
      chat: "Hi Joan, sure,see you soon.",
      identity: "agent",
    },
    {
      date: "10 Sep 21, 12.00am",
      img: Images.filterDefaultImage,
      name: "Joan Lim",
      chat: "See you.",
      icon: Images.ellipseGreenIcon,
      identity: "other",
    },
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onChangeDate = (event) => {
    const date = moment(event.target.value);
    setSelectedDate(date);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.appointmentDetail")}
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
          <div className="flex gap-2 items-center pb-5 relative">
            <CustomImage
              src={Images.moreIcon}
              width={25}
              height={25}
              className="absolute right-0"
              onClick={onClickDropdown}
            />
            {isDropdownOpen && (
              <ul className="dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-box w-30 primaryWhite-bg-color absolute right-0 top-10">
                <li>
                  <a className="font-size-small primary-text">Reschedule</a>
                </li>
                <li>
                  <a className="font-size-small">Cancel</a>
                </li>
              </ul>
            )}

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
            inputClassName="primaryWhite-bg-color resize-input-icon"
            value={moment(selectedDate).format("YYYY-MM-DD")}
            type="date"
            onChange={onChangeDate}
          />

          <CustomText textClassName="pb-1 pt-5">
            {t("bookAppointment.time")}
          </CustomText>
          <BookingInput
            inputClassName="primaryWhite-bg-color resize-input-icon"
            type="time"
            placeholder={t("bookAppointment.selectTime")}
          />
          <CustomText textClassName="pb-1 pt-5">
            {t("bookAppointment.message")}
          </CustomText>

          {_.map(chatList, (item) => {
            return <TimeLine item={item} />;
          })}

          <div className="flex justify-center pt-3 w-full">
            <CustomButton
              buttonText={t("bookAppointment.chat")}
              buttonClassName="primary-btn w-3/5"
            />
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Booking);
