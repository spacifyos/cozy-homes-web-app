import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import CustomButton from "@/components/CustomButton";
import BookingSelect from "@/components/Booking/BookingSelect";
import { useState } from "react";
import moment from "moment";
import BookingDateInput from "@/components/Booking/BookingDateInput";
const AuthorizationComponent = ({ onClickToRequestOverview }) => {
  const [dateValue, setDateValue] = useState(
    moment(new Date()).format("YYYY-MM-DD"),
  );
  const onChangeDate = (e) => {
    setDateValue(e.target.value);
  };

  return (
    <div>
      <DividerSection
        title={"Authorization & Availability"}
        subtitle={"Please provide the possible options below."}
      />

      <BookingSelect
        title={"Can Our Technician Enter When You're Not There?"}
        placeholder="Select Yes Or No"
        lists={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        className="pb-2"
        bgColor="primaryWhite-bg-color"
      />

      <BookingDateInput
        title="Date"
        className="pb-2"
        bgColor="primaryWhite-bg-color"
      />

      <div className="flex gap-2 pb-2">
        <BookingDateInput
          title="Start Time"
          type="time"
          bgColor="primaryWhite-bg-color"
        />
        <BookingDateInput
          title="End Time"
          type="time"
          bgColor="primaryWhite-bg-color"
        />
      </div>

      <div className="flex justify-center items-center pt-2">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="primary-btn"
          buttonText={"Create A Request"}
          onClick={() => onClickToRequestOverview(1)}
        />
      </div>
    </div>
  );
};

export default AuthorizationComponent;
