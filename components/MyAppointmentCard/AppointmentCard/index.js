import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import StatusLabel from "@/components/StatusLabel";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";

const AppointmentCard = ({ t, item, onClickToAppointmentOverview }) => {
  return (
    <div className="global-box-shadow bg-white global-border-radius p-4 mb-3 relative">
      {_.isEqual(item, "Confirmed") ? (
        <div className="bg-error rounded-2xl h-3 w-3 absolute right-0 top-0"></div>
      ) : (
        false
      )}

      <div className="flex items-center pb-2">
        <div className="bg-primary p-2 global-border-radius cursor-pointer">
          <CustomImage
            src={Images.appointmentIconWhite}
            imageStyle={{ width: 35, height: 35 }}
            onClick={() => onClickToAppointmentOverview(1)}
          />
        </div>
        <div className="pl-2">
          <div className="flex items-center">
            <CustomText textClassName="text-xs font-bold pr-2">
              19 Sep 2021, 3pm
            </CustomText>
            <StatusLabel status={item} />
          </div>
          <CustomText textClassName="text-disable text-xs">
            Appointment with
          </CustomText>
          <CustomText textClassName="font-bold text-sm">
            Razak bin Osman
          </CustomText>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <CustomButton
          buttonText="Cancelled"
          buttonClassName={`${_.isEqual(item, "Pending Confirmation") ? "btn-primary-background" : "btn-disable"}`}
          disable={!_.isEqual(item, "Pending Confirmation")}
        />
        <CustomButton
          buttonText="Reschedule"
          buttonClassName={`${!_.isEqual(item, "Cancelled") ? "btn-primary-background" : "btn-disable"}`}
          disable={_.isEqual(item, "Cancelled")}
        />
        <CustomButton
          buttonText="Confirmed"
          buttonClassName={`${_.isEqual(item, "Pending Confirmation") ? "btn-primary" : "btn-disable"}`}
          disable={!_.isEqual(item, "Pending Confirmation")}
        />
      </div>
    </div>
  );
};

export default AppointmentCard;
