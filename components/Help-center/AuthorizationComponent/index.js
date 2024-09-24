import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import CustomButton from "@/components/CustomButton";
import BookingSelect from "@/components/Booking/BookingSelect";
import { useState } from "react";
import moment from "moment";
import BookingDateInput from "@/components/Booking/BookingDateInput";
const AuthorizationComponent = ({ t, onClickToRequestOverview }) => {
  const [dateValue, setDateValue] = useState(
    moment(new Date()).format("YYYY-MM-DD"),
  );
  const onChangeDate = (e) => {
    setDateValue(e.target.value);
  };

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
        className="pb-2"
        bgColor="primaryWhite-bg-color"
      />

      <BookingDateInput
        title="Date"
        className="pb-2"
        bgColor="primaryWhite-bg-color"
      />

      <BookingSelect
        className="pb-2"
        bgColor="primaryWhite-bg-color"
        title={t("newRequest.time")}
        placeholder={t("newRequest.selectTime")}
        lists={[{ name: "8:30am - 12.00pm", value: "8:30am - 12.00pm" }]}
      />

      <div className="flex justify-center items-center pt-2">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="primary-btn"
          buttonText={t("newRequest.createARequest")}
          onClick={() => onClickToRequestOverview(1)}
        />
      </div>
    </div>
  );
};

export default AuthorizationComponent;
