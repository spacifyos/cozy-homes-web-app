import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import StatusLabel from "@/components/StatusLabel";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";

const AppointmentCard = ({ t, item }) => {
  return (
    <div className="global-box-shadow primaryWhite-bg-color global-border-radius p-4 mb-3 relative">
      {_.isEqual(item, "Confirmed") ? (
        <div className="error-bg-color rounded-2xl h-3 w-3 absolute right-0 top-0"></div>
      ) : (
        false
      )}

      <div className="flex items-center pb-2">
        <div className="primary-bg-color p-2 global-border-radius">
          <CustomImage
            src={Images.appointmentIconWhite}
            imageStyle={{ width: 35, height: 35 }}
          />
        </div>
        <div className="pl-2">
          <div className="flex items-center">
            <CustomText textClassName="font-size-xsmall font-bold pr-2">
              19 Sep 2021, 3pm
            </CustomText>
            <StatusLabel status={item} />
          </div>
          <CustomText textClassName="disable-text font-size-xxsmall">
            Appointment with
          </CustomText>
          <CustomText textClassName="font-bold font-size-small">
            Razak bin Osman
          </CustomText>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <CustomButton
          buttonText="Cancelled"
          buttonClassName={`${_.isEqual(item, "Pending Confirmation") ? "appointment-cancelled-btn" : "disable-btn"}`}
          disable={!_.isEqual(item, "Pending Confirmation")}
        />
        <CustomButton
          buttonText="Reschedule"
          buttonClassName={`${!_.isEqual(item, "Cancelled") ? "appointment-reschedule-btn" : "disable-btn"}`}
          disable={_.isEqual(item, "Cancelled")}
        />
        <CustomButton
          buttonText="Confirmed"
          buttonClassName={`${_.isEqual(item, "Pending Confirmation") ? "appointment-confirmed-btn" : "disable-btn"}`}
          disable={!_.isEqual(item, "Pending Confirmation")}
        />
      </div>
    </div>
  );
};

export default AppointmentCard;
