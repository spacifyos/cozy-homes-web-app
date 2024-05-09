import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomHeader from "@/components/CustomHeader";
import HelpCenterSection from "@/components/Help-center/HelpCenterSection";
import { useEffect, useRef, useState } from "react";
import DividerSection from "@/components/Help-center/DividerSection";
import BookingSelect from "@/components/Booking/BookingSelect";
import BookingInput from "@/components/Booking/BookingInput";
import UploadModal from "@/components/Help-center/UploadModal";
import CustomLabelValue from "@/components/CustomLabelValue";
import Images from "@/src/utils/Image";
import RequestComponent from "@/components/Help-center/RequestComponent";
import _ from "lodash";
import NestedMaintenanceRequestComponents from "@/components/Help-center/NestedMaintenanceRequestComponents";
import NestedGeneralEnquiriesComponents from "@/components/Help-center/NestedGeneralEnquiriesComponents";
import AuthorizationComponent from "@/components/Help-center/AuthorizationComponent";
import CustomButton from "@/components/CustomButton";
import EnquiriesForm from "@/components/Help-center/EnquiriesForm";
import Toast from "@/src/utils/Toast";

export { getServerSideProps };

const NewRequest = ({}) => {
  const router = useRouter();
  const uploadImageRef = useRef(null);
  const uploadVideoRef = useRef(null);
  const { t } = useTranslation("common");
  const [selectSection, setSelectSection] = useState("");
  const [selectSecondSection, setSelectSecondSection] = useState("");
  const [checkFeedbackMatters, setCheckFeedbackMatter] = useState(false);
  const [displayAuthorizationComponent, setDisplayAuthorizationComponent] =
    useState(false);
  const [changeUploadModalTitle, setChangUploadModalTitle] = useState(true);
  const [imageBase64, setImageBase64] = useState("");
  const [videoBase64, setVideoBase64] = useState("");
  const maintenanceSection = [
    {
      name: t("newRequest.amenities"),
      value: "Amenities",
      icon: Images.amenitiesIcon,
      iconActive: Images.amenitiesIconActive,
      description: t(
        "newRequest.washerDryerOvenAirConditionerWaterHeaterCellingFan",
      ),
    },
    {
      name: t("newRequest.electrical"),
      value: "Electrical",
      icon: Images.electricalIcon,
      iconActive: Images.electricalIconActive,
      description: t("newRequest.lightsWellSocketWiringSmartMeter"),
    },
    {
      name: t("newRequest.plumbing"),
      value: "Plumbing",
      icon: Images.plumbingIcon,
      iconActive: Images.plumbingIconActive,
      description: t("newRequest.leakingFaucetsPipesPumps"),
    },
    {
      name: t("newRequest.exterior&Interior"),
      value: "Exterior&Interior",
      icon: Images.exteriorInteriorIcon,
      iconActive: Images.exteriorInteriorIconActive,
      description: t("newRequest.doorsWindowsFlooringWall"),
    },
    {
      name: t("newRequest.cleaning"),
      value: "Cleaning",
      icon: Images.cleaningIcon,
      iconActive: Images.cleaningIconActive,
      description: t("newRequest.submitACleaningServiceRequest"),
    },
  ];
  const onClickChangeUploadModalTitle = (changeUploadModalTitle) => {
    setChangUploadModalTitle(changeUploadModalTitle);
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
    setSelectSecondSection("");
  };
  const onClickChangeSecondSection = (selectSecondSection) => {
    setSelectSecondSection(selectSecondSection);
    setDisplayAuthorizationComponent(false);
  };
  const onClickGoBack = () => {
    router.back();
  };
  const onClickToRequestOverview = (id) => {
    router.push(`/help-center/${id}/request-overview`);
  };

  const onClickOpenCamera = () => {
    uploadImageRef && uploadImageRef.current.click();
  };

  const onClickSelectFile= () => {
    uploadVideoRef && uploadVideoRef.current.click();
  };
  const displayComponent = (value) => {
    switch (value) {
      case "Maintenance":
        return (
          <NestedMaintenanceRequestComponents
            t={t}
            selectSecondSection={selectSecondSection}
            onClickChangeSecondSection={onClickChangeSecondSection}
            maintenanceSection={maintenanceSection}
          />
        );
      case "GeneralEnquiries":
        return (
          <NestedGeneralEnquiriesComponents
            t={t}
            onClickChangeSecondSection={onClickChangeSecondSection}
            selectSecondSection={selectSecondSection}
            onClickCheckFeedbackMatters={onClickCheckFeedbackMatters}
            checkFeedbackMatters={checkFeedbackMatters}
          />
        );
      default:
        return false;
    }
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
              displayComponent={displayComponent}
            />
          </div>

          {maintenanceSection.some((item) =>
            _.isEqual(selectSecondSection, item.value),
          ) ? (
            <>
              <RequestComponent
                t={t}
                selectSecondSection={selectSecondSection}
                onClickChangeUploadModalTitle={onClickChangeUploadModalTitle}
              />
              {displayAuthorizationComponent ? (
                <div>
                  <AuthorizationComponent
                    t={t}
                    onClickToRequestOverview={onClickToRequestOverview}
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <CustomButton
                    buttonStyles={{ padding: "5px 30px" }}
                    buttonClassName="primary-btn"
                    buttonText={t("newRequest.continue")}
                    onClick={() =>
                      onClickDisplayAuthorizationComponent(selectSecondSection)
                    }
                  />
                </div>
              )}
            </>
          ) : (
            false
          )}

          {["Enquiry", "Feedback"].includes(selectSecondSection) ? (
            <div>
              <EnquiriesForm
                t={t}
                selectSecondSection={selectSecondSection}
                onClickCheckFeedbackMatters={onClickCheckFeedbackMatters}
                checkFeedbackMatters={checkFeedbackMatters}
              />
            </div>
          ) : (
            false
          )}
        </div>
        <UploadModal
          t={t}
          changeUploadModalTitle={changeUploadModalTitle}
          imageBase={imageBase64}
          onClickOpenCamera={onClickOpenCamera}
          onClickSelectFile={onClickSelectFile}
          videoBase64={videoBase64}
        />
        <input
          capture="environment"
          accept="image/*"
          type="file"
          hidden
          ref={uploadImageRef}
        ></input>
        <input accept="video/*" type="file" hidden ref={uploadVideoRef}></input>
      </div>
    </CustomHeader>
  );
};

export default NewRequest;
