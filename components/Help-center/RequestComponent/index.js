import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import BookingTextArea from "@/components/BookingTextArea";
import CustomButton from "@/components/CustomButton";
import UploadModal from "@/components/Help-center/UploadModal";
import AmenitiesComponent from "@/components/Help-center/AmenitiesComponent";
import BookingInput from "@/components/Booking/BookingInput";
import BookingSelect from "@/components/Booking/BookingSelect";
const RequestComponent = ({ t, title, lists }) => {
  return (
    <div>
      <DividerSection
        title={t("newRequest.pleaseSpecificTheRequest")}
        subtitle={t("newRequest.chooseToSpecifyTheIssue")}
      />

      <BookingSelect title={title} placeholder={title} lists={lists} />
      <BookingSelect
        title={t("newRequest.selectIssue")}
        placeholder={t("newRequest.selectIssue")}
        lists={[{ name: t("newRequest.notWorking"), value: "not working" }]}
      />
      <BookingSelect
        title={t("newRequest.selectPriority")}
        placeholder={t("newRequest.selectPriority")}
        lists={[
          { name: t("newRequest.critical"), value: "critical" },
          { name: t("newRequest.high"), value: "high" },
          { name: t("newRequest.medium"), value: "medium" },
          { name: t("newRequest.low"), value: "low" },
        ]}
      />

      <BookingTextArea
        title={t("newRequest.describeTheIssue")}
        placeholder={t("newRequest.describeTheIssue")}
        className="mb-3"
      />
    </div>
  );
};

export default RequestComponent;
