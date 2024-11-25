import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/router";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { Calendar } from "react-multi-date-picker";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import AppointmentCard from "@/components/MyAppointmentCard/AppointmentCard";

export { getServerSideProps };

const MyAppointment = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const appointmentBtnList = [
    { btn: "All" },
    { btn: "Upcoming Appointments" },
    { btn: "Pending Confirmation" },
    { btn: "Cancelled" },
  ];
  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickGoBack = () => {
    router.back();
  };
  const onClickToAppointmentOverview = (id) => {
    router.push(`/my-appointment/${id}`);
  };

  return (
    <CustomHeader
      onClickGoBack={onClickGoBack}
      hideBgImage
      pageTitle={t("pageTitle.myAppointment")}
    >
      <div className="body-container pb-1">
        <Calendar
          value={date}
          className="custom-calendar"
          monthYearSeparator="|"
          mapDays={({ date, today }) => {
            let color;

            if ([4, 5, 6, 7].includes(date.day)) color = "pending";
            if ([11, 12, 13, 14].includes(date.day)) color = "cancelled";
            if ([21, 22, 23, 24].includes(date.day)) color = "confirmed";

            if (color) return { className: "selected-color-" + color };
          }}
        />

        <div className="flex items-center pb-3 overflow-x-scroll pt-7 hide-scroll-bar">
          {_.map(appointmentBtnList, (item, index) => {
            const btn = _.get(item, ["btn"], "");
            return (
              <CustomButton
                key={index}
                buttonText={btn}
                buttonClassName={`btn-sm ${_.isEqual(selectedCategory, btn) ? "primary-btn" : "default-btn"} mr-2`}
                textClassName="text-xs"
                onClick={() => onClickSelectCategory(btn)}
              />
            );
          })}
        </div>

        {_.map(
          ["Pending Confirmation", "Confirmed", "Cancelled"],
          (item, index) => {
            return (
              <AppointmentCard
                t={t}
                key={index}
                item={item}
                onClickToAppointmentOverview={onClickToAppointmentOverview}
              />
            );
          },
        )}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyAppointment);
