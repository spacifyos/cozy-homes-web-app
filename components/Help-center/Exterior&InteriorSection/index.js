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
const ExteriorInteriorSection = ({ t }) => {
  return (
    <div>
      <RequestComponent
        t={t}
        title={t("newRequest.selectExterior&Interior")}
        lists={[
          { name: t("newRequest.doors"), value: "doors" },
          { name: t("newRequest.windows"), value: "windows" },
          { name: t("newRequest.flooring"), value: "flooring" },
          { name: t("newRequest.wall"), value: "wall" },
        ]}
      />
    </div>
  );
};

export default ExteriorInteriorSection;
