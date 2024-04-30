import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import EnquiriesForm from "@/components/Help-center/EnquiriesForm";
import AmenitiesSection from "@/components/Help-center/AmenitiesSection";
import ElectricalSection from "@/components/Help-center/ElectricalSection";
import PlumbingSection from "@/components/Help-center/PlumbingSection";
import ExteriorInteriorSection from "@/components/Help-center/Exterior&InteriorSection";
import CleaningSection from "@/components/Help-center/CleaningSection";

const NestedMaintenanceRequestComponents = ({
  t,
  onClickChangeSecondSection,
  showSecondSection,
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
      <div className="grid grid-cols-4 pb-4">
        <DividerSection
          className="col-span-4"
          title={t("newRequest.whatIsThisRequestAbout")}
          subtitle={t("newRequest.chooseTheCategoryToSpecifyTheIssue")}
        />

        <div className="col-span-2">
          <div className=" flex flex-col justify-center items-center pb-6">
            <div
              className={`${_.isEqual(showSecondSection, "Amenities") ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                className="cursor-pointer"
                src={
                  _.isEqual(showSecondSection, "Amenities")
                    ? Images.amenitiesIcon
                    : Images.amenitiesIconActive
                }
                width={30}
                height={30}
                onClick={() => onClickChangeSecondSection("Amenities")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              {t("newRequest.amenities")}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center ">
              {t(
                "newRequest.washerDryerOvenAirConditionerWaterHeaterCellingFan",
              )}
            </CustomText>
          </div>
        </div>

        <div className="col-span-2">
          <div className=" flex flex-col justify-center items-center pb-6">
            <div
              className={`${_.isEqual(showSecondSection, "Electrical") ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                className="cursor-pointer"
                src={`${_.isEqual(showSecondSection, "Electrical") ? Images.feedbackIcon : Images.feedbackIconActive}`}
                width={30}
                height={30}
                onClick={() => onClickChangeSecondSection("Electrical")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              {t("newRequest.electrical")}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center">
              {t("newRequest.lightsWellSocketWiringSmartMeter")}
            </CustomText>
          </div>
        </div>

        <div className="col-span-2">
          <div className=" flex flex-col justify-center items-center pb-6">
            <div
              className={`${_.isEqual(showSecondSection, "Plumbing") ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                className="cursor-pointer"
                src={
                  _.isEqual(showSecondSection, "Plumbing")
                    ? Images.plumbingIcon
                    : Images.plumbingIconActive
                }
                width={30}
                height={30}
                onClick={() => onClickChangeSecondSection("Plumbing")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              {t("newRequest.plumbing")}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center ">
              {t("newRequest.leakingFaucetsPipesPumps")}
            </CustomText>
          </div>
        </div>

        <div className="col-span-2">
          <div className=" flex flex-col justify-center items-center pb-6">
            <div
              className={`${_.isEqual(showSecondSection, "Exterior&Interior") ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                className="cursor-pointer"
                src={
                  _.isEqual(showSecondSection, "Exterior&Interior")
                    ? Images.exteriorInteriorIcon
                    : Images.exteriorInteriorIconActive
                }
                width={30}
                height={30}
                onClick={() => onClickChangeSecondSection("Exterior&Interior")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              {t("newRequest.exterior&Interior")}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center ">
              {t("newRequest.doorsWindowsFlooringWall")}
            </CustomText>
          </div>
        </div>

        <div className="col-span-2">
          <div className=" flex flex-col justify-center items-center pb-6">
            <div
              className={`${_.isEqual(showSecondSection, "Cleaning") ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                className="cursor-pointer"
                src={
                  _.isEqual(showSecondSection, "Cleaning")
                    ? Images.cleaningIcon
                    : Images.cleaningIconActive
                }
                width={30}
                height={30}
                onClick={() => onClickChangeSecondSection("Cleaning")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              {t("newRequest.cleaning")}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center ">
              {t("newRequest.submitACleaningServiceRequest")}
            </CustomText>
          </div>
        </div>
      </div>
      {showSecondSection === "Amenities" ? (
        <div>
          <AmenitiesSection
            t={t}
            onClickDisplayAmenitiesComponent={onClickDisplayAmenitiesComponent}
            displayAmenitiesComponent={displayAmenitiesComponent}
            onChangeDate={onChangeDate}
            dateValue={dateValue}
            onChangeTime={onChangeTime}
            timeValue={timeValue}
            onClickToRequestOverview={onClickToRequestOverview}
          />
        </div>
      ) : showSecondSection === "Electrical" ? (
        <div>
          <ElectricalSection t={t} />
        </div>
      ) : showSecondSection === "Plumbing" ? (
        <div>
          <PlumbingSection t={t} />
        </div>
      ) : showSecondSection === "Exterior&Interior" ? (
        <div>
          <ExteriorInteriorSection t={t} />
        </div>
      ) : showSecondSection === "Cleaning" ? (
        <div>
          <CleaningSection t={t} />
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default NestedMaintenanceRequestComponents;
