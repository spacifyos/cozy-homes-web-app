import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import HelpCenterSection from "@/components/Help-center/HelpCenterSection";
import { useEffect, useRef, useState } from "react";
import DividerSection from "@/components/Help-center/DividerSection";
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
import {
  filter,
  get,
  includes,
  isEmpty,
  isEqual,
  map,
  size,
  some,
  split,
  take,
} from "lodash";
import NestedRequestComponents from "@/components/Help-center/NestedRequestComponents";
import Toast from "@/src/utils/Toast";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import axios from "axios";
import ImageModal from "@/components/PropertyOverview/ImageModal";
import VideoModal from "@/components/VideoModal";

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

  const [getGalleryLinkLoading, setGetGalleryLinkLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

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

  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [openImageModal, setOpenImageModal] = useState(false);

  const [openVideoModal, setOpenVideoModal] = useState(false);

  const imageBase64 = map(imageList, "base64");
  const selectedVideo = get(videoList, ["tempUrl"], "");

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

  const onClickSubmitRequest = async () => {
    await apiRequest.postMaintenanceTicketRequest(
      { ...postData, maintenance_ticket_images: imageList },
      setCreateMaintenanceTicketLoading,
      createSuccessCallback,
    );
  };

  const createSuccessCallback = () => {
    router.replace("/user/help-center/request-successful");
  };

  const checkImageSize = async (image, imageNumber) => {
    const isLt2M = image && image.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.error(`Your some image is larger than 2MB`);
      return;
    }

    if (image && image.size > 1) {
      const name = get(image, ["name"], "");
      const extension = split(name, ".");
      const mimeType = get(image, ["type"], "");

      if (some(imageList, { name })) {
        Toast.error(`Image with the name "${name}" already exists.`);
        return;
      }

      try {
        const base64 = await convertToBase64(image);
        const newImage = {
          type: 22,
          name: name,
          extension: extension[1],
          mime_type: mimeType,
          status: false,
          loading: true,
          base64: base64,
        };

        setImageList((prevState) => [...prevState, newImage]);

        fetchGalleryLink(newImage);
      } catch (error) {
        Toast.error("Error converting image to base64:", error);
        console.error("Error converting image to base64:", error);
      }
    }
  };

  const convertToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      if (image) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          resolve(result);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(image);
      } else {
        resolve("");
      }
    });
  };

  const fetchGalleryLink = (image) => {
    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, ["data", "data", "url"], "");
        const path = get(res, ["data", "data", "path"], "");

        Toast.success("Get gallery link success.");
        getGalleryLinkSuccess(url, image, path);
      })
      .catch((err) => Toast.error("Get gallery link failure."));
  };

  const getGalleryLinkSuccess = (url, image, path) => {
    setImageList((prevState) => {
      return map(prevState, (state) => {
        if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
          return { ...state, url: url, path: path };
        } else {
          return state;
        }
      });
    });

    postUploadImage(url, image);
  };

  const postUploadImage = (url, image) => {
    axios
      .put(url, image)
      .then((result) => {
        Toast.success("Image upload success.");
        setImageList((prevState) => {
          return map(prevState, (state) => {
            if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
              return { ...state, status: true, loading: false };
            } else {
              return state;
            }
          });
        });
      })
      .catch((err) => {
        Toast.error("Image upload failure.");
        setImageList((prevState) => {
          return map(prevState, (state) => {
            if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
              return { ...state, status: false, loading: false };
            } else {
              return state;
            }
          });
        });
      });
  };

  const onChangeImage = (e) => {
    const images = e.target.files;

    if (size(images) + size(imageList) >= 6) {
      Toast.error(`Your image limit is up to 5.`);
      return;
    }

    return map(images, (image, index) => {
      checkImageSize(image, index + 1);
    });
  };

  const onClickRemoveImage = (path) => {
    setImageList(
      filter(imageList, (list) => !isEqual(get(list, ["path"], ""), path)),
    );
  };

  const onChangeVideo = (e) => {
    const videos = e.target.files[0];

    const isLt10M = videos && videos.size / 1024 / 1024 < 50;
    if (!isLt10M) {
      Toast.error(`Your video is larger than 50MB`);
      return;
    } else {
      const videoUrl = URL.createObjectURL(videos);

      const newVideo = {
        video: videos,
        tempUrl: videoUrl,
        loading: true,
        status: false,
      };

      fetchVideoGalleryLink(newVideo);
    }
  };

  const fetchVideoGalleryLink = (videos) => {
    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, ["data", "data", "url"], "");
        const path = get(res, ["data", "data", "path"], "");

        Toast.success("Get gallery link success.");
        getVideoGalleryLinkSuccess(url, videos, path);
      })
      .catch((err) => {
        Toast.error("Get gallery link failure.");
        setVideoList({ ...videos, loading: false });
      });
  };

  const getVideoGalleryLinkSuccess = (url, videos, path) => {
    setVideoList({ videos, url: url, path: path });

    postUploadVideo(url, videos);
  };

  const postUploadVideo = (url, videos) => {
    const { video } = videos;

    axios
      .put(url, video)
      .then((result) => {
        Toast.success("Image upload success.");

        setVideoList({ ...videos, loading: false, status: true });
      })
      .catch((err) => {
        Toast.error("Image upload failure.");

        setVideoList({ ...videos, loading: false, status: false });
      });
  };

  const onClickRemoveVideo = () => {
    setVideoList(null);
  };

  const onClickCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const onClickPopupImage = (selectedImage) => {
    setSelectedImage(selectedImage);
    setOpenImageModal(true);
  };

  const onClickCloseVideoModal = () => {
    setOpenVideoModal(false);
  };

  const onClickPopupVideo = () => {
    setOpenVideoModal(true);
  };

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
                onClickSubmit={onClickSubmitRequest}
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
                  uploadImageRef={uploadImageRef}
                  uploadVideoRef={uploadVideoRef}
                  setPostData={setPostData}
                  selectNestedHelpCenterSection={selectNestedHelpCenterSection}
                  onChangeImage={onChangeImage}
                  imageList={imageList}
                  onClickRemoveImage={onClickRemoveImage}
                  onChangeVideo={onChangeVideo}
                  videoList={videoList}
                  onClickRemoveVideo={onClickRemoveVideo}
                  onClickPopupImage={onClickPopupImage}
                  onClickPopupVideo={onClickPopupVideo}
                />

                {displayAuthorizationComponent ? (
                  <AuthorizationComponent
                    setPostData={setPostData}
                    onClickToRequestOverview={onClickSubmitRequest}
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

          <ImageModal
            data={imageBase64}
            selectedImage={selectedImage}
            onClickCloseImageModal={onClickCloseImageModal}
            openImageModal={openImageModal}
          />

          <VideoModal
            onClickCloseVideoModal={onClickCloseVideoModal}
            openVideoModal={openVideoModal}
            selectedVideo={selectedVideo}
          />
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(NewRequest));
