import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import moment from "moment/moment";
import BookingDateInput from "@/components/Booking/BookingDateInput";
import { isEmpty } from "lodash";
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
        <CustomText textClassName="disable-text text-sm">
          {t("requestOverview.maintenanceScheduleInformation")}
        </CustomText>
        <CustomImage
          src={Images.refreshIconActive}
          imageStyle={{ width: 20, height: 20 }}
          className="cursor-pointer"
        />
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <BookingSelect
        className="pb-2"
        bgColor="primaryWhite-bg-color"
        placeholder="Tenure Period"
        title="Technician"
        lists={[]}
        required
      />

      <BookingDateInput
        // type="datetime"
        bgColor="primaryWhite-bg-color"
        className="pb-2"
        placeholder="12/02/2023"
        title="Date"
        required
      />

      <BookingDateInput
        type="time"
        bgColor="primaryWhite-bg-color"
        className="pb-2"
        placeholder="12/02/2023"
        title="Time"
        required
      />

      <BookingSelect
        className="pb-2"
        bgColor="primaryWhite-bg-color"
        placeholder="Tenure Period"
        title="Status"
        lists={[]}
        required
      />

      <div className="flex flex-col justify-center items-center">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="disable-btn my-2"
          buttonText={t("requestOverview.assign")}
        />
        <CustomText textClassName="disable-text text-xs">
          {t("requestOverview.maintenanceScheduleInformationWillBeUpdatedSoon")}
        </CustomText>
      </div>
    </div>
  );
};

export default MaintenanceScheduleInformation;
