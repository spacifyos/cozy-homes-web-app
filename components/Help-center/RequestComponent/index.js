import _ from "lodash";
import DividerSection from "@/components/Help-center/DividerSection";
import BookingTextArea from "@/components/BookingTextArea";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import AuthorizationComponent from "@/components/Help-center/AuthorizationComponent";
import CustomButton from "@/components/CustomButton";

const RequestComponent = ({
  t,
  onClickDisplayAuthorizationComponent,
  displayAuthorizationComponent,
  onChangeDate,
  dateValue,
  onChangeTime,
  timeValue,
  onClickToRequestOverview,
  selectSecondSection,
}) => {
  const displayComponent = (value) => {
    switch (value) {
      case "Amenities":
        return (
          <BookingSelect
            t={t}
            title={t("newRequest.selectAmenities")}
            placeholder={t("newRequest.selectAmenities")}
            lists={[
              { name: t("newRequest.washer"), value: "washer" },
              { name: t("newRequest.dryer"), value: "dryer" },
              { name: t("newRequest.oven"), value: "oven" },
              { name: t("newRequest.airConditioner"), value: "airConditioner" },
              { name: t("newRequest.waterHeater"), value: "waterHeater" },
              { name: t("newRequest.cellingFan"), value: "cellingFan" },
            ]}
          />
        );
      case "Electrical":
        return (
          <BookingSelect
            t={t}
            title={t("newRequest.selectElectrical")}
            placeholder={t("newRequest.selectElectrical")}
            lists={[
              { name: t("newRequest.lights"), value: "lights" },
              { name: t("newRequest.wellSocket"), value: "well socket" },
              { name: t("newRequest.wiring"), value: "wiring" },
              { name: t("newRequest.smartMeter"), value: "smart meter" },
            ]}
          />
        );
      case "Plumbing":
        return (
          <BookingSelect
            t={t}
            title={t("newRequest.selectPlumbing")}
            placeholder={t("newRequest.selectPlumbing")}
            lists={[
              { name: t("newRequest.leaking"), value: "leaking" },
              { name: t("newRequest.faucets"), value: "faucets" },
              { name: t("newRequest.pipes"), value: "pipes" },
              { name: t("newRequest.pumps"), value: "pumps" },
            ]}
          />
        );
      case "Exterior&Interior":
        return (
          <BookingSelect
            t={t}
            title={t("newRequest.selectExterior&Interior")}
            placeholder={t("newRequest.selectExterior&Interior")}
            lists={[
              { name: t("newRequest.doors"), value: "doors" },
              { name: t("newRequest.windows"), value: "windows" },
              { name: t("newRequest.flooring"), value: "flooring" },
              { name: t("newRequest.wall"), value: "wall" },
            ]}
          />
        );
      case "Cleaning":
        return (
          <BookingSelect
            t={t}
            title={t("newRequest.selectCleaning")}
            placeholder={t("newRequest.selectCleaning")}
            lists={[
              { name: t("newRequest.bedroom"), value: "bedroom" },
              { name: t("newRequest.washroom"), value: "washroom" }
            ]}
          />
        );
      default:
        return null;
    }
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

          {_.isEqual(displayAuthorizationComponent, selectSecondSection) ? (
            <div>
              <AuthorizationComponent
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
                onClick={() =>
                  onClickDisplayAuthorizationComponent(selectSecondSection)
                }
              />
            </div>
          )}
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default RequestComponent;
