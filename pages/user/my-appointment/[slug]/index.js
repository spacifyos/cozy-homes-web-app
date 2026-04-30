import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useState, useRef, useEffect } from "react";
import MessageTimeLine from "@/components/AppointmentDetail/MessageTimeLine";
import moment from "moment";
import _ from "lodash";
import Icons from "@/components/Icons";

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
      icon: Icons.ellipseGreenIcon,
      identity: "other",
    },
    {
      date: "10 Sep 21, 11.35am",
      img: Images.imageNotFound,
      name: "Razak bin Osman",
      chat: "Hi Joan, sure,see you soon.",
      identity: "agent",
    },
    {
      date: "10 Sep 21, 12.00am",
      img: Images.imageNotFound,
      name: "Joan Lim",
      chat: "See you.",
      icon: Icons.ellipseGreenIcon,
      identity: "other",
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef("");
  const onClickGoBack = () => {
    router.back();
  };

  const onClickDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const onClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);
  return (
    <CustomHeader
      pageTitle={t("pageTitle.appointmentOverview")}
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
          <div className="flex items-center pb-5 relative">
            <div ref={dropdownRef}>
              <CustomImage
                src={Icons.moreIcon}
                width={25}
                height={25}
                className="absolute right-0 top-0"
                onClick={onClickDropdown}
              />
              {isDropdownOpen ? (
                <ul className="dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-box w-30 bg-white absolute right-2 top-7">
                  <li>
                    <a className="text-sm text-primary">Reschedule</a>
                  </li>
                  <li>
                    <a className="text-sm">Cancel</a>
                  </li>
                </ul>
              ) : (
                false
              )}
            </div>
              <div className="p-2 global-box-shadow global-border-radius bg-primary mr-2">
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
          <CustomText textClassName="pb-1">
            {t("bookAppointment.date")}
          </CustomText>

          <input
            value={moment(new Date()).format("DD MMM YYYY")}
            className="booking-input bg-primary-background"
            disabled
          />

          <CustomText textClassName="pb-1">
            {t("bookAppointment.time")}
          </CustomText>

          <input
            value={moment(new Date()).format("hh:mm A")}
            className="booking-input bg-primary-background"
            disabled
          />

          <CustomText textClassName="pb-2">
            {t("bookAppointment.message")}
          </CustomText>

          {_.map(chatList, (item, index) => {
            return <MessageTimeLine item={item} key={index} />;
          })}

          <div className="flex justify-center pt-2 w-full">
            <CustomButton
              buttonText={t("bookAppointment.chat")}
              buttonClassName="btn-primary w-3/5"
            />
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Booking);
