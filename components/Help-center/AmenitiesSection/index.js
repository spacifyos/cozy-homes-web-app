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
const AmenitiesSection = ({
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
        title={t("newRequest.selectAmenities")}
        lists={[
          { name: t("newRequest.washer"), value: "washer" },
          { name: t("newRequest.dryer"), value: "dryer" },
          { name: t("newRequest.oven"), value: "oven" },
          { name: t("newRequest.airConditioner"), value: "airConditioner" },
          { name: t("newRequest.waterHeater"), value: "waterHeater" },
          { name: t("newRequest.cellingFan"), value: "cellingFan" },
        ]}
      />

      <CustomText textClassName="pb-2 font-size-xsmall">
        {t("newRequest.uploadPhoto")}
      </CustomText>
      <div className=" flex flex-row items-center gap-2 pb-3">
        <CustomImage
          src={Images.washer}
          width={55}
          height={55}
          className="global-border-radius"
        />
        <div
          className="bg-color p-2 global-border-radius relative cursor-pointer"
          style={{ width: 55, height: 55 }}
          onClick={() =>
            document.getElementById("help_center_upload_modal").showModal()
          }
        >
          <CustomImage
            src={Images.plusIcon}
            width={13}
            height={13}
            className="absolute left-5 right-5 top-5 bottom-5 "
          />
        </div>
      </div>
      <CustomText textClassName="pb-2 font-size-xsmall">
        {t("newRequest.uploadVideo")}
      </CustomText>
      <div className=" flex flex-row items-center gap-2  pb-3">
        <CustomImage
          src={Images.washerVideoImages}
          width={55}
          height={55}
          className="global-border-radius"
        />
        <div
          className="bg-color p-2 global-border-radius relative cursor-pointer"
          style={{ width: 55, height: 55 }}
          onClick={() =>
            document.getElementById("help_center_upload_modal").showModal()
          }
        >
          <CustomImage
            src={Images.plusIcon}
            width={13}
            height={13}
            className="absolute left-5 right-5 top-5 bottom-5 "
          />
        </div>
      </div>
      {displayAmenitiesComponent==="Amenities" ? (
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
            onClick={()=>onClickDisplayAmenitiesComponent("Amenities")}
          />
        </div>
      )}

      <UploadModal t={t} />
    </div>
  );
};

export default AmenitiesSection;
