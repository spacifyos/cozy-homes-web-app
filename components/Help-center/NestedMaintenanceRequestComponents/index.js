import CustomImage from "@/components/CustomImage";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";

const NestedMaintenanceRequestComponents = ({
  t,
  onClickChangeSecondSection,
  selectSecondSection,
  maintenanceSection,
}) => {
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
          return (
            <div className="col-span-2" key={index}>
              <div className=" flex flex-col justify-center items-center pb-6">
                <div
                  className={`${_.isEqual(selectSecondSection, value) ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
                  style={{ borderRadius: 100 }}
                >
                  <CustomImage
                    className="cursor-pointer"
                    src={
                      _.isEqual(selectSecondSection, value)
                        ? _.get(item, ["icon"], "")
                        : _.get(item, ["iconActive"], "")
                    }
                    width={30}
                    height={30}
                    onClick={() => onClickChangeSecondSection(value)}
                  />
                </div>

                <CustomText textClassName="font-bold font-size-xsmall">
                  {name}
                </CustomText>
                <CustomText textClassName="disable-text font-size-xxsmall text-center ">
                  {_.get(item, ["description"], "")}
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
