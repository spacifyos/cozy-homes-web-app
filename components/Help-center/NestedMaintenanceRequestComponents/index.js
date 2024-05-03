import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import RequestComponent from "@/components/Help-center/RequestComponent";

const NestedMaintenanceRequestComponents = ({
  t,
  onClickChangeSecondSection,
  selectSecondSection,
  onClickDisplayAuthorizationComponent,
  displayAuthorizationComponent,
  onChangeDate,
  dateValue,
  onChangeTime,
  timeValue,
  onClickToRequestOverview,
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
          return (
            <div className="col-span-2" key={index}>
              <div className=" flex flex-col justify-center items-center pb-6">
                <div
                  className={`${_.isEqual(selectSecondSection, _.get(item, ["name"], "")) ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
                  style={{ borderRadius: 100 }}
                >
                  <CustomImage
                    className="cursor-pointer"
                    src={
                      _.isEqual(selectSecondSection, _.get(item, ["name"], ""))
                        ? _.get(item, ["icon"], "")
                        : _.get(item, ["iconActive"], "")
                    }
                    width={30}
                    height={30}
                    onClick={() =>
                      onClickChangeSecondSection(_.get(item, ["name"], ""))
                    }
                  />
                </div>

                <CustomText textClassName="font-bold font-size-xsmall">
                  {_.get(item, ["name"], "")}
                </CustomText>
                <CustomText textClassName="disable-text font-size-xxsmall text-center ">
                  {_.get(item, ["description"], "")}
                </CustomText>
              </div>
            </div>
          );
        })}
      </div>
      <RequestComponent
        t={t}
        onClickDisplayAuthorizationComponent={
          onClickDisplayAuthorizationComponent
        }
        displayAuthorizationComponent={displayAuthorizationComponent}
        onChangeDate={onChangeDate}
        dateValue={dateValue}
        onChangeTime={onChangeTime}
        timeValue={timeValue}
        onClickToRequestOverview={onClickToRequestOverview}
        selectSecondSection={selectSecondSection}
      />
    </div>
  );
};

export default NestedMaintenanceRequestComponents;
