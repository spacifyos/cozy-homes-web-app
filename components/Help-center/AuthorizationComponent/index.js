import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import CustomButton from "@/components/CustomButton";
import BookingSelect from "@/components/Booking/BookingSelect";
const AuthorizationComponent = ({
  t,
  dateValue,
  onChangeDate,
  onClickToRequestOverview,
}) => {
  return (
    <div>
      <DividerSection
        title={t("newRequest.authorization&Availability")}
        subtitle={t("newRequest.pleaseProvideThePossibleOptionsBelow")}
      />
      <BookingSelect
        title={t("newRequest.canOurTechnicianEnterWhenYou'reNotThere")}
        placeholder={t("newRequest.selectYesOrNo")}
        lists={[
          { name: t("newRequest.yes"), value: "yes" },
          { name: t("newRequest.no"), value: "no" },
        ]}
      />
      <CustomText textClassName="input-title">{t("newRequest.date")}</CustomText>
      <div className="flex items-center global-border-radius p-2 relative mb-3 booking-input pb-1">
        <input
          className="bg-color flex-1 w-full resize-input-icon"
          type="date"
          value={dateValue}
          onChange={onChangeDate}
        />
        <CustomImage
          src={Images.calendarIcon}
          imageStyle={{ width: 20, height: 20, marginRight: 4 }}
        />
      </div>
      <BookingSelect
        title={t("newRequest.time")}
        placeholder={t("newRequest.selectTime")}
        lists={[{ name: "8:30am - 12.00pm", value: "8:30am - 12.00pm" }]}
      />
      <div className="flex justify-center items-center pt-2">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="primary-btn"
          buttonText={t("newRequest.createARequest")}
          onClick={()=>onClickToRequestOverview(1)}
        />
      </div>
    </div>
  );
};

export default AuthorizationComponent;
