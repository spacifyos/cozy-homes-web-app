import CustomImage from "@/components/CustomImage";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import Images from "@/src/utils/Image";

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
    <div>
      <div className="grid grid-cols-4">
        <DividerSection
          className="col-span-4"
          title={t("newRequest.whatIsThisRequestAbout")}
          subtitle={t("newRequest.chooseTheCategoryToSpecifyTheIssue")}
        />
        {_.map(maintenanceSection, (item, index) => {
          const name = _.get(item, ["name"], "");
          const value = _.get(item, ["value"], "");
          const icon = _.get(item, ["icon"], "");
          const iconActive = _.get(item, ["iconActive"]);
          const description = _.get(item, ["description"], "");

          return (
            <div className="col-span-2" key={index}>
              <div className=" flex flex-col justify-center items-center pb-6">
                <div
                  className={`${_.isEqual(selectNestedHelpCenterSection, value) ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
                  style={{ borderRadius: 100 }}
                >
                  <CustomImage
                    className="cursor-pointer"
                    src={
                      _.isEqual(selectNestedHelpCenterSection, value)
                        ? icon
                        : iconActive
                    }
                    width={30}
                    height={30}
                    onClick={() => onClickSelectNestedHelpCenterSection(value)}
                  />
                </div>
                <CustomText textClassName="font-bold font-size-xsmall">
                  {name}
                </CustomText>
                <CustomText textClassName="disable-text font-size-xxsmall text-center ">
                  {description}
                </CustomText>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NestedMaintenanceRequestComponents;
