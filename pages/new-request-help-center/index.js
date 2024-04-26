import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomHeader from "@/components/CustomHeader";
import HelpCenterSection from "@/components/Help-center/HelpCenterSection";
import { useEffect, useState } from "react";
import DividerSection from "@/components/Help-center/DividerSection";
import NestedGeneralEnquiriesComponents from "@/components/Help-center/NestedGeneralEnquiriesComponents";
import NestedMaintenanceRequestComponents from "@/components/Help-center/NestedMaintenanceRequestComponents";

export { getServerSideProps };
const NewRequest = ({}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [selectSection, setSelectSection] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false);
  const [showThirdSection, setShowThirdSection] = useState(false);
  const [checkFeedbackMatters, setCheckFeedbackMatter] = useState(false);

  const onClickCheckFeedbackMatters = (checkFeedbackMatters) => {
    setCheckFeedbackMatter(checkFeedbackMatters);
  };
  const onClickChangeSection = (selected) => {
    setSelectSection(selected);
  };
  const onClickChangeThirdSection = (selectThird) => {
    setShowThirdSection(selectThird);
  };
  const onClickGoBack = () => {
    router.back();
  };

  useEffect(() => {
    setShowSecondSection(
      selectSection === "GeneralEnquiries" || selectSection === "Maintenance",
    );
  }, [selectSection]);
  return (
    <CustomHeader
      pageTitle={t("pageTitle.newRequest")}
      hideBgImage
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container pb-5">
        <div className="global-box-shadow global-border-radius primaryWhite-bg-color flex flex-col p-5 h-full">
          <CustomText textClassName="second-section-title primary-text pb-2">
            General Information
          </CustomText>
          <CustomText textClassName="disable-text font-size-small">
            Requester
          </CustomText>
          <CustomText textClassName="font-bold pb-2">Joan Lim</CustomText>
          <CustomText textClassName="disable-text font-size-small">
            Property
          </CustomText>
          <CustomText textClassName="font-size-normal p-2">
            Icon City
          </CustomText>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <CustomText textClassName="disable-text font-size-small">
                Unit
              </CustomText>
              <CustomText textClassName="p-3">A-01-01</CustomText>
            </div>
            <div className="col-span-1">
              <CustomText textClassName="disable-text font-size-small">
                Space
              </CustomText>
              <div className="flex justify-between p-2">
                <CustomText>A-01-01</CustomText>
                <CustomImage src={Images.downIcon} width={10} height={10} />
              </div>
            </div>
          </div>
          <CustomText textClassName="disable-text font-size-small">
            Link Equipment
          </CustomText>
          <div className="flex justify-between p-2">
            <CustomText>None</CustomText>
            <CustomImage src={Images.downIcon} width={10} height={10} />
          </div>

          <div
            className="divider divider-line"
            style={{ marginTop: 20, marginBottom: 20 }}
          ></div>

          <div>
            <DividerSection
              className="col-span-4"
              title="Welcome To Help Center"
              subtitle="How can we help?"
              hideLine
            />

            <HelpCenterSection
              t={t}
              onClickChangeSection={onClickChangeSection}
              onClickChangeThirdSection={onClickChangeThirdSection}
              selectSection={selectSection}
              showSecondSection={showSecondSection}
              showThirdSection={showThirdSection}
              onClickCheckFeedbackMatters={onClickCheckFeedbackMatters}
              checkFeedbackMatters={checkFeedbackMatters}
            />
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default NewRequest;
