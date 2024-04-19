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

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickGoBack = () => {
    router.back();
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
          <CustomButton
            buttonText="All"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "All") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("All")}
          />
          <CustomButton
            buttonText="Upcoming Appointments"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Upcoming Appointments") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Upcoming Appointments")}
          />
          <CustomButton
            buttonText="Pending Confirmation"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Pending Confirmation") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Pending Confirmation")}
          />
          <CustomButton
            buttonText="Cancelled"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Cancelled") ? "primary-btn" : "default-btn"}`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Cancelled")}
          />
        </div>

        {_.map(["Pending Confirmation", "Confirmed", "Cancelled"], (item) => {
          return <AppointmentCard t={t} item={item} />;
        })}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyAppointment);
