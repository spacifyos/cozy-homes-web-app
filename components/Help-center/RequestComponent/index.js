import _ from "lodash";
import DividerSection from "@/components/Help-center/DividerSection";
import BookingTextArea from "@/components/BookingTextArea";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const RequestComponent = ({
  t,
  selectSecondSection,
  onClickChangeUploadModalTitle,
}) => {
  const displayComponent = (value) => {
    const requestSelect = {
      t: t,
      placeholder: t(`newRequest.select${value}`),
      lists: [],
    };

    switch (value) {
      case "Amenities":
        requestSelect.title = t("newRequest.selectAmenities");
        requestSelect.lists = [
          { name: t("newRequest.washer"), value: "washer" },
          { name: t("newRequest.dryer"), value: "dryer" },
          { name: t("newRequest.oven"), value: "oven" },
          { name: t("newRequest.airConditioner"), value: "airConditioner" },
          { name: t("newRequest.waterHeater"), value: "waterHeater" },
          { name: t("newRequest.cellingFan"), value: "cellingFan" },
        ];
        break;
      case "Electrical":
        requestSelect.title = t("newRequest.selectElectrical");
        requestSelect.lists = [
          { name: t("newRequest.lights"), value: "lights" },
          { name: t("newRequest.wellSocket"), value: "well socket" },
          { name: t("newRequest.wiring"), value: "wiring" },
          { name: t("newRequest.smartMeter"), value: "smart meter" },
        ];
        break;
      case "Plumbing":
        requestSelect.title = t("newRequest.selectPlumbing");
        requestSelect.lists = [
          { name: t("newRequest.leaking"), value: "leaking" },
          { name: t("newRequest.faucets"), value: "faucets" },
          { name: t("newRequest.pipes"), value: "pipes" },
          { name: t("newRequest.pumps"), value: "pumps" },
        ];
        break;
      case "Exterior&Interior":
        requestSelect.title = t("newRequest.selectExterior&Interior");
        requestSelect.lists = [
          { name: t("newRequest.doors"), value: "doors" },
          { name: t("newRequest.windows"), value: "windows" },
          { name: t("newRequest.flooring"), value: "flooring" },
          { name: t("newRequest.wall"), value: "wall" },
        ];
        break;
      case "Cleaning":
        requestSelect.title = t("newRequest.selectCleaning");
        requestSelect.lists = [
          { name: t("newRequest.bedroom"), value: "bedroom" },
          { name: t("newRequest.washroom"), value: "washroom" },
        ];
        break;
      default:
        return null;
    }

    return <BookingSelect {...requestSelect} />;
  };

  return (
    <div>
      {selectSecondSection ? (
        <div>
          <DividerSection
            title={t("newRequest.pleaseSpecificTheRequest")}
            subtitle={t("newRequest.chooseToSpecifyTheIssue")}
          />
          {displayComponent(selectSecondSection)}
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
              onClick={() => {
                document.getElementById("help_center_upload_modal").showModal();
                onClickChangeUploadModalTitle(true);
              }}
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
              onClick={() => {
                document.getElementById("help_center_upload_modal").showModal();
                onClickChangeUploadModalTitle(false);
              }}
            >
              <CustomImage
                src={Images.plusIcon}
                width={13}
                height={13}
                className="absolute left-5 right-5 top-5 bottom-5 "
              />
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default RequestComponent;
