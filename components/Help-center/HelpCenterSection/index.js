import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";

const HelpCenterSection = ({ t, onClickChangeSection, selectSection }) => {
  const btnList = [
    {
      btnText: t("newRequest.generalEnquiries"),
      btnDescription: t("newRequest.haveAQuestionOrWantToSendFeedback"),
      value: "GeneralEnquiries",
      icon: Images.generalEnquiriesIcon,
      iconActive: Images.generalEnquiriesIconActive,
    },
    {
      btnText: t("newRequest.maintenanceRequests"),
      btnDescription: t(
        "newRequest.submitMaintenanceRequestsForIssueResolution",
      ),
      value: "Maintenance",
      icon: Images.maintenanceIcon,
      iconActive: Images.maintenanceIconActive,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 pb-4">
        {_.map(btnList, (item, index) => {
          const btnText = _.get(item, "btnText", "");
          const btnDescription = _.get(item, "btnDescription", "");
          const value = _.get(item, "value", "");
          const icon = _.get(item, "icon", "");
          const iconActive = _.get(item, "iconActive", "");
          return (
            <div className="col-span-1" key={index}>
              <div className=" flex flex-col justify-center items-center">
                <div
                  className={`${_.isEqual(selectSection, value) ? "primary-bg-color" : "bg-color"} p-2 mb-2`}
                  style={{ borderRadius: 100 }}
                >
                  <CustomImage
                    className="cursor-pointer"
                    src={`${_.isEqual(selectSection, value) ? icon : iconActive}`}
                    width={30}
                    height={30}
                    onClick={() => onClickChangeSection(value)}
                  />
                </div>

                <CustomText textClassName="font-bold font-size-xsmall">
                  {btnText}
                </CustomText>
                <CustomText textClassName="disable-text font-size-xxsmall text-center ">
                  {btnDescription}
                </CustomText>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HelpCenterSection;
