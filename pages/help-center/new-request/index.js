import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomHeader from "@/components/CustomHeader";
import HelpCenterSection from "@/components/Help-center/HelpCenterSection";
import { useEffect, useRef, useState } from "react";
import DividerSection from "@/components/Help-center/DividerSection";
import UploadModal from "@/components/Help-center/UploadModal";
import NestedMaintenanceRequestComponents from "@/components/Help-center/NestedMaintenanceRequestComponents";
import NestedGeneralEnquiriesComponents from "@/components/Help-center/NestedGeneralEnquiriesComponents";
import AuthorizationComponent from "@/components/Help-center/AuthorizationComponent";
import CustomButton from "@/components/CustomButton";
import EnquiriesForm from "@/components/Help-center/EnquiriesForm";
import SpecificRequestComponent from "@/components/Help-center/RequestComponent";
import GeneralInformationSection from "@/components/Help-center/GenerallnformationSection";

export { getServerSideProps };

const NewRequest = ({}) => {
  const router = useRouter();
  const uploadImageRef = useRef(null);
  const uploadVideoRef = useRef(null);
  const { t } = useTranslation("common");
  const [selectSection, setSelectSection] = useState("");
  const [selectNestedHelpCenterSection, setSelectNestedHelpCenterSection] =
    useState("");
  const [checkFeedbackMatters, setCheckFeedbackMatter] = useState(false);
  const [displayAuthorizationComponent, setDisplayAuthorizationComponent] =
    useState(false);
  const [changeUploadModalTitle, setChangUploadModalTitle] = useState(true);
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
    setSelectNestedHelpCenterSection("");
  };
  const onClickSelectNestedHelpCenterSection = (
    selectNestedHelpCenterSection,
  ) => {
    setSelectNestedHelpCenterSection(selectNestedHelpCenterSection);
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

  const onClickSelectFile = () => {
    uploadVideoRef && uploadVideoRef.current.click();
  };
  const NestedHelpCenterSection = (value) => {
    switch (value) {
      case "Maintenance":
        return (
          <NestedMaintenanceRequestComponents
            t={t}
            selectNestedHelpCenterSection={selectNestedHelpCenterSection}
            onClickSelectNestedHelpCenterSection={
              onClickSelectNestedHelpCenterSection
            }
          />
        );
      case "GeneralEnquiries":
        return (
          <NestedGeneralEnquiriesComponents
            t={t}
            onClickSelectNestedHelpCenterSection={
              onClickSelectNestedHelpCenterSection
            }
            selectNestedHelpCenterSection={selectNestedHelpCenterSection}
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
          <GeneralInformationSection t={t} />

          <div
            className="divider divider-line"
            style={{ marginTop: 20, marginBottom: 20 }}
          ></div>

          <div>
            <DividerSection
              title={t("newRequest.welcomeToHelpCenter")}
              subtitle={t("newRequest.howCanWeHelpYou")}
              hideLine
            />
            <HelpCenterSection
              t={t}
              onClickChangeSection={onClickChangeSection}
              selectSection={selectSection}
            />
          </div>

          {NestedHelpCenterSection(selectSection)}

          {["Enquiry", "Feedback"].includes(selectNestedHelpCenterSection) ? (
            <div>
              <EnquiriesForm
                t={t}
                selectNestedHelpCenterSection={selectNestedHelpCenterSection}
                onClickCheckFeedbackMatters={onClickCheckFeedbackMatters}
                checkFeedbackMatters={checkFeedbackMatters}
              />
            </div>
          ) : (
            false
          )}

          {[
            "Amenities",
            "Electrical",
            "Plumbing",
            "Exterior&Interior",
            "Cleaning",
          ].includes(selectNestedHelpCenterSection) ? (
            <>
              <SpecificRequestComponent
                t={t}
                selectNestedHelpCenterSection={selectNestedHelpCenterSection}
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
                      onClickDisplayAuthorizationComponent(
                        selectNestedHelpCenterSection,
                      )
                    }
                  />
                </div>
              )}
            </>
          ) : (
            false
          )}
        </div>

        <UploadModal
          t={t}
          changeUploadModalTitle={changeUploadModalTitle}
          onClickOpenCamera={onClickOpenCamera}
          onClickSelectFile={onClickSelectFile}
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
