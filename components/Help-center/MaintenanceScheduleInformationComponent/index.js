import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import moment from "moment/moment";
import BookingDateInput from "@/components/Booking/BookingDateInput";
import { isEmpty } from "lodash";
const MaintenanceScheduleInformation = ({}) => {
  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-4">
      <div className="flex justify-between items-center">
        <CustomText textClassName="disable-text text-sm">
          Maintenance Schedule Information
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

      <div className="pb-4">
        <CustomText textClassName="text-xs disable-text pb-1">
          Technician
        </CustomText>
        <CustomText textClassName="border px-2 py-1 rounded-lg">
          Firdaus
        </CustomText>
      </div>

      <div className="pb-4">
        <CustomText textClassName="text-xs disable-text pb-1">Date</CustomText>
        <CustomText textClassName="border px-2 py-1 rounded-lg">
          awgajd adsa
        </CustomText>
      </div>

      <div className="pb-4">
        <CustomText textClassName="text-xs disable-text pb-1">Time</CustomText>
        <CustomText textClassName="border px-2 py-1 rounded-lg">
          awgajd adsa
        </CustomText>
      </div>

      <div className="pb-4">
        <CustomText textClassName="text-xs disable-text pb-1">
          Status
        </CustomText>
        <CustomText textClassName="border px-2 py-1 rounded-lg">
          awgajd adsa
        </CustomText>
      </div>

      <div className="flex flex-col justify-center items-center pt-4">
        <CustomText textClassName="disable-text text-xs">
          Maintenance Schedule Information Will Be Updated Soon
        </CustomText>
      </div>
    </div>
  );
};

export default MaintenanceScheduleInformation;
