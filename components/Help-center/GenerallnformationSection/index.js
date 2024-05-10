import CustomText from "@/components/CustomText";
import BookingInput from "@/components/Booking/BookingInput";
import CustomLabelValue from "@/components/CustomLabelValue";
import BookingSelect from "@/components/Booking/BookingSelect";
const GeneralInformationSection = ({ t }) => {
  return (
    <div>
      <CustomText textClassName="second-section-title primary-text pb-2">
        {t("newRequest.generalInformation")}
      </CustomText>
      <CustomLabelValue label={t("newRequest.requester")} value="Joan Lim" />
      <BookingInput
        disabled
        title={t("newRequest.property")}
        value="Icon City"
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <BookingInput disabled title={t("newRequest.unit")} value="A-01-01" />
        </div>
        <div className="col-span-1">
          <BookingSelect
            title={t("newRequest.space")}
            placeholder={t("newRequest.selectSpace")}
            lists={[{ name: "Room 1", value: "Room 1" }]}
          />
        </div>
      </div>
      <BookingSelect
        title={t("newRequest.linkEquipment")}
        placeholder={t("newRequest.linkEquipment")}
        lists={[{ name: "None", value: "none" }]}
      />
    </div>
  );
};

export default GeneralInformationSection;
