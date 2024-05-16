import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";

const NestedGeneralEnquiriesComponents = ({
  t,
  onClickSelectNestedHelpCenterSection,
  selectNestedHelpCenterSection,
}) => {
  const enquiriesSection = [
    {
      btnText: t("newRequest.enquiry"),
      btnDescription: t("newRequest.haveAQuestion"),
      value: "Enquiry",
      icon: Images.enquiryIcon,
      iconActive: Images.enquiryIconActive,
    },
    {
      btnText: t("newRequest.feedback"),
      btnDescription: t("newRequest.writeUsYourFeedback"),
      value: "Feedback",
      icon: Images.feedbackIcon,
      iconActive: Images.feedbackIconActive,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 pb-4">
        <DividerSection
          className="col-span-4"
          title={t("newRequest.whatIsThisEnquiryAbout")}
          subtitle={t("newRequest.chooseTheCategoryToSpecifyTheEnquiry")}
        />
        {_.map(enquiriesSection, (item, index) => {
          const btnText = _.get(item, "btnText", "");
          const btnDescription = _.get(item, "btnDescription", "");
          const value = _.get(item, "value", "");
          const icon = _.get(item, "icon", "");
          const iconActive = _.get(item, "iconActive", "");
          return (
            <div className="col-span-2" key={index}>
              <div className=" flex flex-col justify-center items-center">
                <div
                  className={`${_.isEqual(selectNestedHelpCenterSection, value) ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
                  style={{ borderRadius: 100 }}
                >
                  <CustomImage
                    className="cursor-pointer"
                    src={
                      _.isEqual(selectNestedHelpCenterSection, value) ? icon : iconActive
                    }
                    width={30}
                    height={30}
                    onClick={() => onClickSelectNestedHelpCenterSection(value)}
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

export default NestedGeneralEnquiriesComponents;
