import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { map, get, isEqual } from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import BookingInput from "@/components/Booking/BookingInput";
import BookingTextArea from "@/components/BookingTextArea";
import CustomButton from "@/components/CustomButton";
import Constant from "@/src/utils/Constant";

const EnquiriesForm = ({
  t,
  selectNestedHelpCenterSection,
  onClickCheckFeedbackMatters,
  checkFeedbackMatters,
}) => {
  const formList = [
    { name: t("newRequest.suggestion"), value: "suggestion" },
    { name: t("newRequest.review"), value: "review" },
    { name: t("newRequest.complaint"), value: "complaint" },
  ];

  const displayForm = (value) => {
    switch (value) {
      case Constant.ENQUIRY:
        return (
          <div>
            <DividerSection
              title={t("newRequest.describeYourEnquiry")}
              subtitle={t("newRequest.tellUsHowWeCanAssistYou")}
            />
            <BookingInput placeholder={t("newRequest.subject")} />
          </div>
        );
      case Constant.FEEDBACK:
        return (
          <div className="flex flex-col justify-center items-center pb-4">
            <DividerSection
              title={t("newRequest.yourFeedbackMatters")}
              subtitle={t("newRequest.shareYourThoughtsWithUs")}
            />
            <div className="flex items-center justify-center">
              {map(formList, (item, index) => {
                const name = get(item, ["name"], "");
                const value = get(item, ["value"], "");

                return (
                  <div key={index}>
                    <div className="flex gap-2 pr-4 items-center">
                      <CustomImage
                        className="cursor-pointer"
                        src={
                          isEqual(checkFeedbackMatters, value)
                            ? Images.checkGreenIcon
                            : Images.uncheckIcon
                        }
                        height={20}
                        width={20}
                        onClick={() => onClickCheckFeedbackMatters(value)}
                      />
                      <CustomText textClassName="font-size-xsmall">
                        {name}
                      </CustomText>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {displayForm(selectNestedHelpCenterSection)}

      <BookingTextArea placeholder={t("newRequest.enterYourMessage")} />

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
