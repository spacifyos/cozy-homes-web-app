import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import moment from "moment/moment";
const MaintenanceScheduleInformation = ({ t }) => {
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

  return (
    <div className=" global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-4">
      <div className="flex justify-between items-center">
        <CustomText textClassName="disable-text font-size-small">
          {t("requestOverview.maintenanceScheduleInformation")}
        </CustomText>
        <CustomImage
          src={Images.refreshIconActive}
          width={15}
          height={15}
          className="cursor-pointer"
        />
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <BookingSelect
        title={t("requestOverview.technician")}
        placeholder={t("requestOverview.selectTechnician")}
        lists={[{ name: "Daniel", value: "daniel" }]}
      />

      <CustomText textClassName="input-title">
        {t("requestOverview.date")}
      </CustomText>

      <div
        className="flex items-center global-border-radius relative booking-input"
        style={{ marginBottom: 12 }}
      >
        <input
          className="bg-color flex-1 w-full resize-input-icon"
          type="date"
          value={dateValue}
          onChange={onChangeDate}
        />

        <CustomImage
          src={Images.calendarIcon}
          imageStyle={{ width: 20, height: 20 }}
        />
      </div>

      <BookingSelect
        title={t("requestOverview.time")}
        placeholder={t("requestOverview.selectTime")}
        lists={[{ name: "8:30am - 12.00pm", value: "8:30am - 12.00pm" }]}
      />

      <div className="flex flex-col justify-center items-center">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="disable-btn my-2"
          buttonText={t("requestOverview.assign")}
        />
        <CustomText textClassName="disable-text font-size-xxsmall">
          {t("requestOverview.maintenanceScheduleInformationWillBeUpdatedSoon")}
        </CustomText>
      </div>
    </div>
  );
};

export default MaintenanceScheduleInformation;
