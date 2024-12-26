import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import HelpCenterSection from "@/components/Help-center/HelpCenterSection";
import { useEffect, useRef, useState } from "react";
import DividerSection from "@/components/Help-center/DividerSection";
import UploadModal from "@/components/Help-center/UploadModal";
import AuthorizationComponent from "@/components/Help-center/AuthorizationComponent";
import CustomButton from "@/components/CustomButton";
import EnquiriesForm from "@/components/Help-center/EnquiriesForm";
import SpecificRequestComponent from "@/components/Help-center/RequestComponent";
import GeneralInformationSection from "@/components/Help-center/GenerallnformationSection";
import Constant from "@/src/utils/Constant";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import DesktopLayout from "@/components/DesktopLayout";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import { get, includes, isEmpty, map } from "lodash";
import NestedRequestComponents from "@/components/Help-center/NestedRequestComponents";
import Toast from "@/src/utils/Toast";

export { getServerSideProps };

const NewRequest = ({}) => {
  const router = useRouter();
  const uploadImageRef = useRef(null);
  const uploadVideoRef = useRef(null);
  const { t } = useTranslation("common");

  const [maintenanceTicketOption, setMaintenanceTicketOption] = useState("");
  const [maintenanceTicketOptionLoading, setMaintenanceTicketOptionLoading] =
    useState(false);
  const [createMaintenanceTicketLoading, setCreateMaintenanceTicketLoading] =
    useState(false);

  const requestTypeOption = maintenanceTicketSelector.getRequestType(
    maintenanceTicketOption,
  );
  const tenancyOption = maintenanceTicketSelector.getTenancyOptions(
    maintenanceTicketOption,
  );

  const [postData, setPostData] = useState({});
  const [requestSubType, setRequestSubType] = useState([]);
  const [selectSection, setSelectSection] = useState("");
  const [selectNestedHelpCenterSection, setSelectNestedHelpCenterSection] =
    useState(0);
  const [checkFeedbackMatters, setCheckFeedbackMatter] = useState(false);
  const [displayAuthorizationComponent, setDisplayAuthorizationComponent] =
    useState(false);
  const [changeUploadModalTitle, setChangUploadModalTitle] = useState(true);
  const [messageValue, setMessageValue] = useState("");

  useEffect(() => {
    fetchMaintenanceTicketOption();
  }, []);

  const fetchMaintenanceTicketOption = async () => {
    await apiRequest.getMaintenanceTicketOptionRequest(
      setMaintenanceTicketOptionLoading,
      getMaintenanceTicketOptionSuccessCallback,
    );
  };

  const getMaintenanceTicketOptionSuccessCallback = (res) => {
    setMaintenanceTicketOption(res);
  };

  const onClickChangeUploadModalTitle = (changeUploadModalTitle) => {
    setChangUploadModalTitle(changeUploadModalTitle);
  };

  const onClickDisplayAuthorizationComponent = (
    displayAuthorizationComponent,
  ) => {
    setDisplayAuthorizationComponent(displayAuthorizationComponent);
  };

  const onClickCheckFeedbackMatters = (checkFeedbackMatters) => {
    setPostData((prevState) => {
      const { maintenance_type } = prevState;

      if (isEmpty(toString(maintenance_type))) {
        return Toast.error("You enquiry is wrong.");
      }

      return { ...prevState, feedback_type: checkFeedbackMatters };
    });

    setCheckFeedbackMatter(checkFeedbackMatters);
  };

  const onClickChangeSection = (selectSection, subType) => {
    setPostData((prevState) => {
      return {
        ...prevState,
        request_type: selectSection,
      };
    });

    setRequestSubType(formatSubType(selectSection, subType));
    setSelectSection(selectSection);
    setSelectNestedHelpCenterSection("");
    setCheckFeedbackMatter("");
  };

  const formatSubType = (selectSection, subType) => {
    switch (selectSection) {
      case 1:
        return map(subType, (type) => {
          const value = get(type, ["value"], "");

          switch (value) {
            case 1:
              return {
                ...type,
                ...{
                  description: "Have a question?",
                  icon: Images.enquiryIcon,
                  iconActive: Images.enquiryIconActive,
                },
              };
            case 2:
              return {
                ...type,
                ...{
                  description: "Write us your feedback.",
                  icon: Images.feedbackIcon,
                  iconActive: Images.feedbackIconActive,
                },
              };
          }
        });
      case 2:
        return map(subType, (type) => {
          const value = get(type, ["value"], "");

          switch (value) {
            case 3:
              return {
                ...type,
                ...{
                  icon: Images.amenitiesIcon,
                  iconActive: Images.amenitiesIconActive,
                  description:
                    "Washer, dryer, oven, air conditioner, water heater, celling fan",
                },
              };
            case 4:
              return {
                ...type,
                ...{
                  icon: Images.electricalIcon,
                  iconActive: Images.electricalIconActive,
                  description: "Lights, well socket, wiring, smart meter",
                },
              };
            case 5:
              return {
                ...type,
                ...{
                  icon: Images.plumbingIcon,
                  iconActive: Images.plumbingIconActive,
                  description: "Leaking, faucets, pipes, pump",
                },
              };
            case 6:
              return {
                ...type,
                ...{
                  icon: Images.exteriorInteriorIcon,
                  iconActive: Images.exteriorInteriorIconActive,
                  description: "Doors, windows, flooring, wall",
                },
              };
            case 7:
              return {
                ...type,
                ...{
                  icon: Images.cleaningIcon,
                  iconActive: Images.cleaningIconActive,
                  description: "Submit a cleaning service request",
                },
              };
          }
        });
    }
  };

  const onClickSelectNestedHelpCenterSection = (
    selectNestedHelpCenterSection,
  ) => {
    setPostData((prevState) => {
      return {
        ...prevState,
        [`${selectSection === 1 ? "enquiry_type" : "maintenance_type"}`]:
          selectNestedHelpCenterSection,
      };
    });

    setSelectNestedHelpCenterSection(selectNestedHelpCenterSection);
    setDisplayAuthorizationComponent(false);
    setCheckFeedbackMatter("");
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToRequestOverview = (id) => {
    router.push(`/help-center/${id}`);
  };

  const onClickOpenCamera = () => {
    uploadImageRef && uploadImageRef.current.click();
  };

  const onClickSelectFile = () => {
    uploadVideoRef && uploadVideoRef.current.click();
  };

  const onClickSubmitEnquiry = async () => {
    await apiRequest.postMaintenanceTicketRequest(
      postData,
      setCreateMaintenanceTicketLoading,
      createSuccessCallback,
    );
  };

  const createSuccessCallback = () => {};

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Help Center New Request - Spacify Asia" />

      <DesktopLayout
        loading={
          maintenanceTicketOptionLoading || createMaintenanceTicketLoading
        }
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul className="flex-wrap">
                <li>
                  <a href={"/user/help-center"}>
                    <CustomText textClassName="text-base disable-text">
                      Help Center
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base">New Request</CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">New Request</CustomText>
            </div>
          </div>
        }
      >
        <div className="flex flex-col flex-1 h-full">
          <div className="global-box-shadow global-border-radius primaryWhite-bg-color flex flex-col p-5 h-full">
            <GeneralInformationSection
              tenancyOption={tenancyOption}
              setPostData={setPostData}
            />

            <div
              className="divider divider-line"
              style={{ marginTop: 20, marginBottom: 20 }}
            ></div>

            <DividerSection
              title={"Welcome To Help Center"}
              subtitle={"How Can We Help You"}
              hideLine
            />

            <HelpCenterSection
              requestTypeOption={requestTypeOption}
              onClickChangeSection={onClickChangeSection}
              selectSection={selectSection}
            />

            {!isEmpty(requestSubType) ? (
              <NestedRequestComponents
                subType={requestSubType}
                selectNestedHelpCenterSection={selectNestedHelpCenterSection}
                onClickSelectNestedHelpCenterSection={
                  onClickSelectNestedHelpCenterSection
                }
              />
            ) : (
              false
            )}

            {includes(
              [Constant.FEEDBACK, Constant.ENQUIRY],
              selectNestedHelpCenterSection,
            ) ? (
              <EnquiriesForm
                selectNestedHelpCenterSection={selectNestedHelpCenterSection}
                onClickCheckFeedbackMatters={onClickCheckFeedbackMatters}
                checkFeedbackMatters={checkFeedbackMatters}
                setPostData={setPostData}
                onClickSubmit={onClickSubmitEnquiry}
              />
            ) : (
              false
            )}

            {includes(
              [
                Constant.AMENITIES,
                Constant.ELECTRICAL,
                Constant.PLUMBING,
                Constant.EXTERIOR_INTERIOR,
                Constant.CLEANING,
              ],
              selectNestedHelpCenterSection,
            ) ? (
              <div>
                <SpecificRequestComponent
                  selectNestedHelpCenterSection={selectNestedHelpCenterSection}
                  onClickChangeUploadModalTitle={onClickChangeUploadModalTitle}
                />

                {displayAuthorizationComponent ? (
                  <AuthorizationComponent
                    onClickToRequestOverview={onClickToRequestOverview}
                  />
                ) : (
                  <div className="flex justify-center">
                    <CustomButton
                      buttonStyles={{ padding: "5px 30px" }}
                      buttonClassName="primary-btn"
                      buttonText={"Continue"}
                      onClick={() =>
                        onClickDisplayAuthorizationComponent(
                          selectNestedHelpCenterSection,
                        )
                      }
                    />
                  </div>
                )}
              </div>
            ) : (
              false
            )}
          </div>

          <UploadModal
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
          <input
            accept="video/*"
            type="file"
            hidden
            ref={uploadVideoRef}
          ></input>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(NewRequest));
