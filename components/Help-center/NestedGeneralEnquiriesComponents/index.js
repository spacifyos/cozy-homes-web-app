import Images from "@/src/utils/Image";
import { map, get } from "lodash";
import DividerSection from "@/components/Help-center/DividerSection";
import CategoryCard from "@/components/Help-center/NewRequest/CategoryCard";

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
    <div className="grid grid-cols-4">
      <DividerSection
        className="col-span-4"
        title={t("newRequest.whatIsThisEnquiryAbout")}
        subtitle={t("newRequest.chooseTheCategoryToSpecifyTheEnquiry")}
      />
      {map(enquiriesSection, (item, index) => {
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
            selectedValue={selectNestedHelpCenterSection}
            btnDescription={btnDescription}
            btnText={btnText}
            onClickChangeSection={onClickSelectNestedHelpCenterSection}
          />
        );
      })}
    </div>
  );
};

export default NestedGeneralEnquiriesComponents;
