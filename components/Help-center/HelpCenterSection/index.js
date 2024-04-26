import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import NestedMaintenanceRequestComponents from "@/components/Help-center/NestedMaintenanceRequestComponents";
import NestedGeneralEnquiriesComponents from "@/components/Help-center/NestedGeneralEnquiriesComponents";

const HelpCenterSection = ({
  t,
  onClickChangeSection,
  onClickChangeThirdSection,
  selectSection,
  showSecondSection,
  showThirdSection,
  onClickCheckFeedbackMatters,
  checkFeedbackMatters,
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
                src={`${_.isEqual(selectSection, "GeneralEnquiries") ? Images.generalEnquiriesIcon : Images.generalEnquiriesIconActive}`}
                width={30}
                height={30}
                onClick={() => onClickChangeSection("GeneralEnquiries")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              General Enquiries
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center ">
              Have a question or want to send feedback?
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
                src={`${_.isEqual(selectSection, "Maintenance") ? Images.maintenanceIcon : Images.maintenanceIconActive}`}
                width={30}
                height={30}
                onClick={() => onClickChangeSection("Maintenance")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              Maintenance Requests
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center">
              Submit maintenance requests for issue resolution.
            </CustomText>
          </div>
        </div>
      </div>
      {showSecondSection ? (
        <div>
          {selectSection === "Maintenance" ? (
            <NestedMaintenanceRequestComponents t={t} />
          ) : (
            <NestedGeneralEnquiriesComponents
              t={t}
              onClickChangeThirdSection={onClickChangeThirdSection}
              showThirdSection={showThirdSection}
              onClickCheckFeedbackMatters={onClickCheckFeedbackMatters}
              checkFeedbackMatters={checkFeedbackMatters}
            />
          )}
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default HelpCenterSection;
