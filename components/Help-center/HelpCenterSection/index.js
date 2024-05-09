import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";

const HelpCenterSection = ({
  t,
  onClickChangeSection,
  selectSection,
  displayComponent,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 pb-4">
        <div className="col-span-1">
          <div className=" flex flex-col justify-center items-center">
            <div
              className={`${_.isEqual(selectSection, "GeneralEnquiries") ? "primary-bg-color" : "bg-color"} p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                className="cursor-pointer"
                src={`${_.isEqual(selectSection, "GeneralEnquiries") ? Images.generalEnquiriesIcon : Images.generalEnquiriesIconActive}`}
                width={30}
                height={30}
                onClick={() => onClickChangeSection("GeneralEnquiries")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              {t("newRequest.generalEnquiries")}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center ">
              {t("newRequest.haveAQuestionOrWantToSendFeedback")}
            </CustomText>
          </div>
        </div>

        <div className="col-span-1">
          <div className=" flex flex-col justify-center items-center">
            <div
              className={`${_.isEqual(selectSection, "Maintenance") ? "primary-bg-color" : "bg-color"} p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                className="cursor-pointer"
                src={`${_.isEqual(selectSection, "Maintenance") ? Images.maintenanceIcon : Images.maintenanceIconActive}`}
                width={30}
                height={30}
                onClick={() => onClickChangeSection("Maintenance")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              {t("newRequest.maintenanceRequests")}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center">
              {t("newRequest.submitMaintenanceRequestsForIssueResolution")}
            </CustomText>
          </div>
        </div>
      </div>
      {displayComponent(selectSection)}
    </div>
  );
};

export default HelpCenterSection;
