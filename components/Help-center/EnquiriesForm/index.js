import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import CustomInput from "@/components/CustomInput";
import BookingInput from "@/components/Booking/BookingInput";
import BookingTextArea from "@/components/BookingTextArea";
import CustomButton from "@/components/CustomButton";
const EnquiriesForm = ({
  t,
  showThirdSection,
  onClickCheckFeedbackMatters,
  checkFeedbackMatters,
}) => {
  return (
    <div>
      {showThirdSection ? (
        <div>
          {showThirdSection === "Enquiry" ? (
            <div className="pb-1">
              <DividerSection
                title="Describe Your Enquiry"
                subtitle="Tell us how we can assist you."
              />
              <BookingInput
                placeholder="Subject"
                className="bg-color global-border-radius"
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center pb-4">
              <DividerSection
                title="You Feedback Matters"
                subtitle="Share your thoughts with us"
              />
              <div className="flex items-center justify-center">
                <div className="flex gap-2 pr-4 items-center">
                  <CustomImage
                    src={`${_.isEqual(checkFeedbackMatters, "Suggestion") ? Images.checkGreenIcon : Images.uncheckIcon}`}
                    height={23}
                    width={23}
                    onClick={() => onClickCheckFeedbackMatters("Suggestion")}
                  />
                  <CustomText textClassName="font-size-xsmall">
                    Suggestion
                  </CustomText>
                </div>
                <div className="flex gap-2 pr-4 items-center">
                  <CustomImage
                    src={`${_.isEqual(checkFeedbackMatters, "Review") ? Images.checkGreenIcon : Images.uncheckIcon}`}
                    height={23}
                    width={23}
                    onClick={() => onClickCheckFeedbackMatters("Review")}
                  />
                  <CustomText textClassName="font-size-xsmall">
                    Review
                  </CustomText>
                </div>
                <div className="flex gap-2 pr-4 items-center">
                  <CustomImage
                    src={`${_.isEqual(checkFeedbackMatters, "Complaint") ? Images.checkGreenIcon : Images.uncheckIcon}`}
                    height={23}
                    width={23}
                    onClick={() => onClickCheckFeedbackMatters("Complaint")}
                  />
                  <CustomText textClassName="font-size-xsmall">
                    Complaint
                  </CustomText>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        false
      )}

      <BookingTextArea placeholder="Enter Message" className="mb-4" />

      <div className="grid grid-cols-2 gap-2">
        <CustomButton
          buttonClassName="default-btn-outline"
          buttonText="Cancel"
        />
        <CustomButton buttonClassName="primary-btn" buttonText="Submit" />
      </div>
    </div>
  );
};

export default EnquiriesForm;
