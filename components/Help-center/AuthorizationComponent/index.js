import DividerSection from "@/components/Help-center/DividerSection";
import CustomButton from "@/components/CustomButton";
import BookingSelect from "@/components/Booking/BookingSelect";
import moment from "moment";
import BookingDateInput from "@/components/Booking/BookingDateInput";
import { isEqual } from "lodash";

const AuthorizationComponent = ({ onClickToRequestOverview, setPostData }) => {
  return (
    <div>
      <DividerSection
        title={"Authorization & Availability"}
        subtitle={"Please provide the possible options below."}
      />

      <BookingSelect
        disabled={false}
        title={"Can Our Technician Enter When You're Not There?"}
        placeholder="Select Yes Or No"
        lists={[
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ]}
        className="pb-2"
        bgColor="primaryWhite-bg-color"
        onChange={(e) => {
          setPostData((prevState) => {
            return {
              ...prevState,
              is_allowed_entry: isEqual(e.target.value, "true" ? true : false),
            };
          });
        }}
      />

      <BookingDateInput
        title="Date"
        className="pb-2"
        bgColor="primaryWhite-bg-color"
        onChange={(e) => {
          setPostData((prevState) => {
            return {
              ...prevState,
              available_date: moment(e.target.value).format("YYYY-MM-DD"),
            };
          });
        }}
      />

      <div className="flex gap-2 pb-2">
        <BookingDateInput
          title="Start Time"
          type="time"
          bgColor="primaryWhite-bg-color"
          onChange={(e) => {
            setPostData((prevState) => {
              return {
                ...prevState,
                available_start_time: e.target.value,
              };
            });
          }}
        />
        <BookingDateInput
          title="End Time"
          type="time"
          bgColor="primaryWhite-bg-color"
          onChange={(e) => {
            setPostData((prevState) => {
              return {
                ...prevState,
                available_end_time: e.target.value,
              };
            });
          }}
        />
      </div>

      <div className="flex justify-center items-center pt-2">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="primary-btn"
          buttonText={"Create A Request"}
          onClick={onClickToRequestOverview}
        />
      </div>
    </div>
  );
};

export default AuthorizationComponent;
