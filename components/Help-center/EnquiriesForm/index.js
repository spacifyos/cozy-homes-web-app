import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import BookingInput from "@/components/Booking/BookingInput";
import BookingTextArea from "@/components/BookingTextArea";
import CustomButton from "@/components/CustomButton";
const EnquiriesForm = ({
  t,
  selectSecondSection,
  onClickCheckFeedbackMatters,
  checkFeedbackMatters,
}) => {
  const displayForm = (value) => {
    switch (value) {
      case "Enquiry":
        return (
          <div>
            <DividerSection
              title={t("newRequest.describeYourEnquiry")}
              subtitle={t("newRequest.tellUsHowWeCanAssistYou")}
            />
            <BookingInput placeholder={t("newRequest.subject")} />
          </div>
        );
      case "Feedback":
        return (
          <div className="flex flex-col justify-center items-center pb-4">
            <DividerSection
              title={t("newRequest.yourFeedbackMatters")}
              subtitle={t("newRequest.shareYourThoughtsWithUs")}
            />
            <div className="flex items-center justify-center">
              <div className="flex gap-2 pr-4 items-center">
                <CustomImage
                  className="cursor-pointer"
                  src={
                    _.isEqual(checkFeedbackMatters, "Suggestion")
                      ? Images.checkGreenIcon
                      : Images.uncheckIcon
                  }
                  height={23}
                  width={23}
                  onClick={() => onClickCheckFeedbackMatters("Suggestion")}
                />
                <CustomText textClassName="font-size-xsmall">
                  {t("newRequest.suggestion")}
                </CustomText>
              </div>
              <div className="flex gap-2 pr-4 items-center">
                <CustomImage
                  className="cursor-pointer"
                  src={
                    _.isEqual(checkFeedbackMatters, "Review")
                      ? Images.checkGreenIcon
                      : Images.uncheckIcon
                  }
                  height={23}
                  width={23}
                  onClick={() => onClickCheckFeedbackMatters("Review")}
                />
                <CustomText textClassName="font-size-xsmall">
                  {t("newRequest.review")}
                </CustomText>
              </div>
              <div className="flex gap-2 pr-4 items-center">
                <CustomImage
                  className="cursor-pointer"
                  src={
                    _.isEqual(checkFeedbackMatters, "Complaint")
                      ? Images.checkGreenIcon
                      : Images.uncheckIcon
                  }
                  height={23}
                  width={23}
                  onClick={() => onClickCheckFeedbackMatters("Complaint")}
                />
                <CustomText textClassName="font-size-xsmall">
                  {t("newRequest.complaint")}
                </CustomText>
              </div>
            </div>
          </div>
        );
      default:
        return false;
    }
  };
  return (
    <div>
      {displayForm(selectSecondSection)}

      <BookingTextArea
        placeholder={t("newRequest.enterYourMessage")}
      />

      <div className="grid grid-cols-2 gap-2">
        <CustomButton
          buttonClassName="default-btn-outline"
          buttonText={t("newRequest.cancel")}
        />
        <CustomButton
          buttonClassName="primary-btn"
          buttonText={t("newRequest.submit")}
        />
      </div>
    </div>
  );
};

export default EnquiriesForm;
