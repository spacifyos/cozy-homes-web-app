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
import RequestComponent from "@/components/Help-center/RequestComponent";
const CleaningSection = ({ t }) => {
  return (
    <div>
      <DividerSection
        title={t("newRequest.pleaseSpecificTheRequest")}
        subtitle={t("newRequest.chooseToSpecifyTheIssue")}
      />
      <BookingTextArea
        title={t("newRequest.describeTheRequest")}
        placeholder={t("newRequest.describeTheRequest")}
        className="mb-3"
      />
      <div className="flex justify-center">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="primary-btn"
          buttonText="Submit"
        />
      </div>
    </div>
  );
};

export default CleaningSection;
