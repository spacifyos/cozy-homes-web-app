import Images from "@/src/utils/Image";
import { map, get } from "lodash";
import Constant from "@/src/utils/Constant";
import CategoryCard from "@/components/Help-center/NewRequest/CategoryCard";

const HelpCenterSection = ({ t, onClickChangeSection, selectSection }) => {
  const btnList = [
    {
      btnText: t("newRequest.generalEnquiries"),
      btnDescription: t("newRequest.haveAQuestionOrWantToSendFeedback"),
      value: Constant.GENERAL_ENQUIRIES,
      icon: Images.generalEnquiriesIcon,
      iconActive: Images.generalEnquiriesIconActive,
    },
    {
      btnText: t("newRequest.maintenanceRequests"),
      btnDescription: t(
        "newRequest.submitMaintenanceRequestsForIssueResolution",
      ),
      value: Constant.MAINTENANCE_REQUESTS,
      icon: Images.maintenanceIcon,
      iconActive: Images.maintenanceIconActive,
    },
  ];
  return (
    <div className="grid grid-cols-4">
      {map(btnList, (item, index) => {
        const btnText = get(item, "btnText", "");
        const btnDescription = get(item, "btnDescription", "");
        const value = get(item, "value", "");
        const icon = get(item, "icon", "");
        const iconActive = get(item, "iconActive", "");

        return (
          <CategoryCard
            key={index}
            icon={icon}
            iconActive={iconActive}
            value={value}
            selectedValue={selectSection}
            btnDescription={btnDescription}
            btnText={btnText}
            onClickChangeSection={onClickChangeSection}
          />
        );
      })}
    </div>
  );
};

export default HelpCenterSection;
