import { map, get } from "lodash";
import DividerSection from "@/components/Help-center/DividerSection";
import Images from "@/src/utils/Image";
import CategoryCard from "@/components/Help-center/NewRequest/CategoryCard";

const NestedMaintenanceRequestComponents = ({
  t,
  onClickSelectNestedHelpCenterSection,
  selectNestedHelpCenterSection,
}) => {
  const maintenanceSection = [
    {
      name: t("newRequest.amenities"),
      value: "Amenities",
      icon: Images.amenitiesIcon,
      iconActive: Images.amenitiesIconActive,
      description: t(
        "newRequest.washerDryerOvenAirConditionerWaterHeaterCellingFan",
      ),
    },
    {
      name: t("newRequest.electrical"),
      value: "Electrical",
      icon: Images.electricalIcon,
      iconActive: Images.electricalIconActive,
      description: t("newRequest.lightsWellSocketWiringSmartMeter"),
    },
    {
      name: t("newRequest.plumbing"),
      value: "Plumbing",
      icon: Images.plumbingIcon,
      iconActive: Images.plumbingIconActive,
      description: t("newRequest.leakingFaucetsPipesPumps"),
    },
    {
      name: t("newRequest.exterior&Interior"),
      value: "Exterior&Interior",
      icon: Images.exteriorInteriorIcon,
      iconActive: Images.exteriorInteriorIconActive,
      description: t("newRequest.doorsWindowsFlooringWall"),
    },
    {
      name: t("newRequest.cleaning"),
      value: "Cleaning",
      icon: Images.cleaningIcon,
      iconActive: Images.cleaningIconActive,
      description: t("newRequest.submitACleaningServiceRequest"),
    },
  ];
  return (
    <div className="grid grid-cols-4">
      <DividerSection
        className="col-span-4"
        title={t("newRequest.whatIsThisRequestAbout")}
        subtitle={t("newRequest.chooseTheCategoryToSpecifyTheIssue")}
      />
      {map(maintenanceSection, (item, index) => {
        const name = get(item, ["name"], "");
        const value = get(item, ["value"], "");
        const icon = get(item, ["icon"], "");
        const iconActive = get(item, ["iconActive"]);
        const description = get(item, ["description"], "");

        return (
          <CategoryCard
            key={index}
            icon={icon}
            iconActive={iconActive}
            value={value}
            selectedValue={selectNestedHelpCenterSection}
            btnDescription={description}
            btnText={name}
            onClickChangeSection={onClickSelectNestedHelpCenterSection}
          />
        );
      })}
    </div>
  );
};

export default NestedMaintenanceRequestComponents;
