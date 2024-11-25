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

            <BookingInput
              className="pb-2"
              title="Subject"
              bgColor="primaryWhite-bg-color"
              placeholder={t("newRequest.subject")}
            />
          </div>
        );
      case Constant.FEEDBACK:
        return (
          <div className="flex flex-col justify-center items-center">
            <DividerSection
              title={t("newRequest.yourFeedbackMatters")}
              subtitle={t("newRequest.shareYourThoughtsWithUs")}
            />
            <div className="flex items-center justify-center gap-4 pb-4">
              {map(formList, (item, index) => {
                const name = get(item, ["name"], "");
                const value = get(item, ["value"], "");

                return (
                  <div className="flex gap-2 items-center" key={index}>
                    <CustomImage
                      className="cursor-pointer"
                      src={
                        isEqual(checkFeedbackMatters, value)
                          ? Images.checkGreenIcon
                          : Images.uncheckIcon
                      }
                      imageStyle={{ width: 20, height: 20 }}
                      onClick={() => onClickCheckFeedbackMatters(value)}
                    />
                    <CustomText textClassName="text-xs">
                      {name}
                    </CustomText>
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

      <BookingTextArea
        title="Description"
        bgColor="primaryWhite-bg-color"
        className="pb-2"
        placeholder="Description"
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
