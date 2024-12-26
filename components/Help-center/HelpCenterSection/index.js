import Images from "@/src/utils/Image";
import { map, get } from "lodash";
import CategoryCard from "@/components/Help-center/NewRequest/CategoryCard";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";

const HelpCenterSection = ({
  onClickChangeSection,
  selectSection,
  requestTypeOption,
}) => {
  const btnList = map(requestTypeOption, (option) => {
    const value = get(option, ["value"], "");

    switch (value) {
      case 1:
        return {
          ...option,
          ...{
            description: "Have A Question Or Want To Send Feedback",
            icon: Images.generalEnquiriesIcon,
            iconActive: Images.generalEnquiriesIconActive,
          },
        };
      case 2:
        return {
          ...option,
          ...{
            description: "Submit Maintenance Requests For Issue Resolution",
            icon: Images.maintenanceIcon,
            iconActive: Images.maintenanceIconActive,
          },
        };
    }
  });

  return (
    <div className="grid grid-cols-4">
      {map(btnList, (item, index) => {
        const label = get(item, "label", "");
        const description = get(item, "description", "");
        const value = get(item, "value", "");
        const icon = get(item, "icon", "");
        const iconActive = get(item, "iconActive", "");
        const subType = maintenanceTicketSelector.getRequestTypeSubType(item);

        return (
          <CategoryCard
            key={index}
            icon={icon}
            iconActive={iconActive}
            value={value}
            selectedValue={selectSection}
            btnDescription={description}
            btnText={label}
            subType={subType}
            onClickChangeSection={onClickChangeSection}
          />
        );
      })}
    </div>
  );
};

export default HelpCenterSection;
