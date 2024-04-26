import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import EnquiriesForm from "@/components/Help-center/EnquiriesForm";

const NestedGeneralEnquiriesComponents = ({
  t,
  onClickChangeThirdSection,
  onClickCheckFeedbackMatters,
  showThirdSection,
  selectSection,
  checkFeedbackMatters,
}) => {
  return (
    <div>
      <div className="grid grid-cols-4 pb-4">
        <DividerSection
          className="col-span-4"
          title="What Is This Enquiry About?"
          subtitle="Choose the category to specify the enquiry."
        />

        <div className="col-span-2">
          <div className=" flex flex-col justify-center items-center">
            <div
              className={`${_.isEqual(showThirdSection, "Enquiry") ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                src={
                  _.isEqual(showThirdSection, "Enquiry")
                    ? Images.enquiryIcon
                    : Images.enquiryIconActive
                }
                width={30}
                height={30}
                onClick={() => onClickChangeThirdSection("Enquiry")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              Enquiries
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center ">
              Have a question?
            </CustomText>
          </div>
        </div>

        <div className="col-span-2">
          <div className=" flex flex-col justify-center items-center">
            <div
              className={`${_.isEqual(showThirdSection, "Feedback") ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                src={`${_.isEqual(showThirdSection, "Feedback") ? Images.feedbackIcon : Images.feedbackIconActive}`}
                width={30}
                height={30}
                onClick={() => onClickChangeThirdSection("Feedback")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              Feedback
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center">
              Write us your feedback.
            </CustomText>
          </div>
        </div>
      </div>
      {showThirdSection ? (
        <EnquiriesForm
          t={t}
          showThirdSection={showThirdSection}
          onClickCheckFeedbackMatters={onClickCheckFeedbackMatters}
          checkFeedbackMatters={checkFeedbackMatters}
        />
      ) : (
        false
      )}
    </div>
  );
};

export default NestedGeneralEnquiriesComponents;
