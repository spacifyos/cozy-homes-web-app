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
const ExteriorInteriorSection = ({
  t,
  onClickDisplayAmenitiesComponent,
  displayAmenitiesComponent,
  onChangeDate,
  dateValue,
  onChangeTime,
  timeValue,
  onClickToRequestOverview,
}) => {
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
      {displayAmenitiesComponent==="Exterior&InteriorSection" ? (
        <div>
          <AmenitiesComponent
            t={t}
            onChangeDate={onChangeDate}
            dateValue={dateValue}
            onChangeTime={onChangeTime}
            timeValue={timeValue}
            onClickToRequestOverview={onClickToRequestOverview}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <CustomButton
            buttonStyles={{ padding: "5px 30px" }}
            buttonClassName="primary-btn"
            buttonText={t("newRequest.continue")}
            onClick={()=>onClickDisplayAmenitiesComponent("Exterior&InteriorSection")}
          />
        </div>
      )}
    </div>
  );
};

export default ExteriorInteriorSection;
