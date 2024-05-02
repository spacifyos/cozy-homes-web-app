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
const PlumbingSection = ({ t }) => {
  return (
    <div>
      <RequestComponent
        t={t}
        title={t("newRequest.selectPlumbing")}
        lists={[
          { name: t("newRequest.leaking"), value: "leaking" },
          { name: t("newRequest.faucets"), value: "faucets" },
          { name: t("newRequest.pipes"), value: "pipes" },
          { name: t("newRequest.pumps"), value: "pumps" },
        ]}
      />
    </div>
  );
};

export default PlumbingSection;
