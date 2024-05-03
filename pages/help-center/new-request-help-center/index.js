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
import UploadModal from "@/components/Help-center/UploadModal";
import CustomLabelValue from "@/components/CustomLabelValue";
import Images from "@/src/utils/Image";

export { getServerSideProps };

const NewRequest = ({}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [selectSection, setSelectSection] = useState("");
  const [selectSecondSection, setSelectSecondSection] = useState("");
  const [checkFeedbackMatters, setCheckFeedbackMatter] = useState(false);
  const [displayAuthorizationComponent, setDisplayAuthorizationComponent] =
    useState("");
  const [dateValue, setDateValue] = useState(
    moment(new Date()).format("YYYY-MM-DD"),
  );
  const [timeValue, setTimeValue] = useState(
    moment(new Date()).format("hh:mm"),
  );
  const maintenanceSection = [
    {
      name: t("newRequest.amenities"),
      icon: Images.amenitiesIcon,
      iconActive: Images.amenitiesIconActive,
      description: t(
        "newRequest.washerDryerOvenAirConditionerWaterHeaterCellingFan",
      ),
    },
    {
      name: t("newRequest.electrical"),
      icon: Images.feedbackIcon,
      iconActive: Images.feedbackIconActive,
      description: t("newRequest.lightsWellSocketWiringSmartMeter"),
    },
    {
      name: t("newRequest.plumbing"),
      icon: Images.plumbingIcon,
      iconActive: Images.plumbingIconActive,
      description: t("newRequest.leakingFaucetsPipesPumps"),
    },
    {
      name: t("newRequest.exterior&Interior"),
      icon: Images.exteriorInteriorIcon,
      iconActive: Images.exteriorInteriorIconActive,
      description: t("newRequest.doorsWindowsFlooringWall"),
    },
    {
      name: t("newRequest.cleaning"),
      icon: Images.cleaningIcon,
      iconActive: Images.cleaningIconActive,
      description: t("newRequest.submitACleaningServiceRequest"),
    },
  ];
  const onChangeDate = (e) => {
    setDateValue(e.target.value);
  };
  const onChangeTime = (e) => {
    setTimeValue(e.target.value);
  };
  const onClickDisplayAuthorizationComponent = (
    displayAuthorizationComponent,
  ) => {
    setDisplayAuthorizationComponent(displayAuthorizationComponent);
  };
  const onClickCheckFeedbackMatters = (checkFeedbackMatters) => {
    setCheckFeedbackMatter(checkFeedbackMatters);
  };
  const onClickChangeSection = (selectSection) => {
    setSelectSection(selectSection);
  };
  const onClickChangeSecondSection = (selectSecondSection) => {
    setSelectSecondSection(selectSecondSection);
  };
  const onClickGoBack = () => {
    router.back();
  };
  const onClickToRequestOverview = (id) => {
    router.push(`/help-center/${id}/request-overview`);
  };
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
          <CustomLabelValue
            label={t("newRequest.requester")}
            value="Joan Lim"
          />
          <BookingInput
            disabled
            title={t("newRequest.property")}
            value="Icon City"
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <BookingInput
                disabled
                title={t("newRequest.unit")}
                value="A-01-01"
              />
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
              selectSecondSection={selectSecondSection}
              onClickCheckFeedbackMatters={onClickCheckFeedbackMatters}
              checkFeedbackMatters={checkFeedbackMatters}
              onClickDisplayAuthorizationComponent={
                onClickDisplayAuthorizationComponent
              }
              displayAuthorizationComponent={displayAuthorizationComponent}
              onChangeDate={onChangeDate}
              dateValue={dateValue}
              onChangeTime={onChangeTime}
              timeValue={timeValue}
              onClickChangeSecondSection={onClickChangeSecondSection}
              onClickToRequestOverview={onClickToRequestOverview}
              maintenanceSection={maintenanceSection}
            />
          </div>
        </div>

        <UploadModal t={t} />
      </div>
    </CustomHeader>
  );
};

export default NewRequest;
