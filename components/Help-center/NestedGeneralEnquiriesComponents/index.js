import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/Help-center/DividerSection";
import EnquiriesForm from "@/components/Help-center/EnquiriesForm";

const NestedGeneralEnquiriesComponents = ({
  t,
  onClickChangeSecondSection,
  selectSecondSection,
}) => {
  return (
    <div>
      <div className="grid grid-cols-4 pb-4">
        <DividerSection
          className="col-span-4"
          title={t("newRequest.whatIsThisEnquiryAbout")}
          subtitle={t("newRequest.chooseTheCategoryToSpecifyTheEnquiry")}
        />

        <div className="col-span-2">
          <div className=" flex flex-col justify-center items-center">
            <div
              className={`${_.isEqual(selectSecondSection, "Enquiry") ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                className="cursor-pointer"
                src={
                  _.isEqual(selectSecondSection, "Enquiry")
                    ? Images.enquiryIcon
                    : Images.enquiryIconActive
                }
                width={30}
                height={30}
                onClick={() => onClickChangeSecondSection("Enquiry")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              {t("newRequest.enquiry")}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center ">
              {t("newRequest.haveAQuestion")}
            </CustomText>
          </div>
        </div>

        <div className="col-span-2">
          <div className=" flex flex-col justify-center items-center">
            <div
              className={`${_.isEqual(selectSecondSection, "Feedback") ? "primary-bg-color" : "bg-color"}  p-2 mb-2`}
              style={{ borderRadius: 100 }}
            >
              <CustomImage
                className="cursor-pointer"
                src={`${_.isEqual(selectSecondSection, "Feedback") ? Images.feedbackIcon : Images.feedbackIconActive}`}
                width={30}
                height={30}
                onClick={() => onClickChangeSecondSection("Feedback")}
              />
            </div>

            <CustomText textClassName="font-bold font-size-xsmall">
              {t("newRequest.feedback")}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall text-center">
              {t("newRequest.writeUsYourFeedback")}
            </CustomText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestedGeneralEnquiriesComponents;
