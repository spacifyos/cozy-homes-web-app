import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomHeader from "@/components/CustomHeader";
import HelpCenterSection from "@/components/Help-center/HelpCenterSection";
import { useEffect, useState } from "react";
import DividerSection from "@/components/Help-center/DividerSection";
import moment from "moment/moment";
import BookingSelect from "@/components/Booking/BookingSelect";
import BookingInput from "@/components/Booking/BookingInput";

export { getServerSideProps };

const NewRequest = ({}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [selectSection, setSelectSection] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false);
  const [checkFeedbackMatters, setCheckFeedbackMatter] = useState(false);
  const [displayAmenitiesComponent, setDisplayAmenitiesComponent] =
    useState(false);
  const [dateValue, setDateValue] = useState(
    moment(new Date()).format("YYYY-MM-DD"),
  );
  const [timeValue, setTimeValue] = useState(
    moment(new Date()).format("hh:mm"),
  );
  const onChangeDate = (e) => {
    setDateValue(e.target.value);
  };
  const onChangeTime = (e) => {
    setTimeValue(e.target.value);
  };
  const onClickDisplayAmenitiesComponent = (displayAmenitiesComponent) => {
    setDisplayAmenitiesComponent(displayAmenitiesComponent);
  };
  const onClickCheckFeedbackMatters = (checkFeedbackMatters) => {
    setCheckFeedbackMatter(checkFeedbackMatters);
  };
  const onClickChangeSection = (selectSection) => {
    setSelectSection(selectSection);
  };

  const onClickChangeSecondSection = (showSecondSection) => {
    setShowSecondSection(showSecondSection);
  };
  const onClickGoBack = () => {
    router.back();
  };
  const onClickToRequestOverview = () => {
    router.push("/help-center/new-request-help-center/requestOverview");
  };

  useEffect(() => {
    setShowSecondSection(
      _.isEqual(selectSection, "GeneralEnquiries") ||
        _.isEqual(selectSection, "Maintenance"),
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
            {t("newRequest.generalInformation")}
          </CustomText>
          <CustomText textClassName="font-size-xxsmall">
            {t("newRequest.requester")}
          </CustomText>
          <CustomText textClassName="font-bold pb-2">Joan Lim</CustomText>
          <BookingInput disabled title={t("newRequest.property")} value="Icon City" />
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <BookingInput disabled title={t("newRequest.unit")} value="A-01-01" />
            </div>
            <div className="col-span-1">
              <BookingSelect
                title={t("newRequest.space")}
                placeholder={t("newRequest.selectSpace")}
                lists={[{ name: "Room 1", value: "Room 1" }]}
              />
            </div>
          </div>
          <BookingSelect
            title={t("newRequest.linkEquipment")}
            placeholder={t("newRequest.linkEquipment")}
            lists={[{ name: "None", value: "none" }]}
          />

          <div
            className="divider divider-line"
            style={{ marginTop: 20, marginBottom: 20 }}
          ></div>

          <div>
            <DividerSection
              className="col-span-4"
              title={t("newRequest.welcomeToHelpCenter")}
              subtitle={t("newRequest.howCanWeHelpYou")}
              hideLine
            />

            <HelpCenterSection
              t={t}
              onClickChangeSection={onClickChangeSection}
              selectSection={selectSection}
              showSecondSection={showSecondSection}
              onClickCheckFeedbackMatters={onClickCheckFeedbackMatters}
              checkFeedbackMatters={checkFeedbackMatters}
              onClickDisplayAmenitiesComponent={
                onClickDisplayAmenitiesComponent
              }
              displayAmenitiesComponent={displayAmenitiesComponent}
              onChangeDate={onChangeDate}
              dateValue={dateValue}
              onChangeTime={onChangeTime}
              timeValue={timeValue}
              onClickChangeSecondSection={onClickChangeSecondSection}
              onClickToRequestOverview={onClickToRequestOverview}
            />
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default NewRequest;
