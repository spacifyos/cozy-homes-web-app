import Images from "@/src/utils/Image";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import RequestOverviewDetail from "@/components/Help-center/RequestOverviewDetail";
import MaintenanceScheduleInformationComponent from "@/components/Help-center/MaintenanceScheduleInformationComponent";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import DesktopLayout from "@/components/DesktopLayout";
import * as maintenanceTicketAction from "@/src/actions/maintenance-ticket";
import { useDispatch, useSelector } from "react-redux";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import { useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { concat, get, isEmpty, isEqual, map } from "lodash";
import Helper from "@/src/utils/Helper";
import AuthManager from "@/src/utils/AuthManager";
import axios from "axios";
import Toast from "@/src/utils/Toast";
import ImageModal from "@/components/PropertyOverview/ImageModal";
import VideoModal from "@/components/VideoModal";
import CommentComponent from "@/components/Help-center/CommentComponent";

export { getServerSideProps };

const RequestOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const [secret, setSecret] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [imageList, setImageList] = useState([]);
  const [videoValue, setVideoValue] = useState(null);
  const [technicianImageList, setTechnicianImageList] = useState([]);
  const [technicianVideoValue, setTechnicianVideoValue] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImageList, setSelectedImageList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getMaintenanceTicketOverviewRequest = (id) =>
    dispatch(maintenanceTicketAction.getMaintenanceTicketOverviewRequest(id));
  const maintenanceTicketOverviewData = useSelector((state) =>
    maintenanceTicketSelector.getMaintenanceTicketOverviewData(state, id),
  );
  const maintenanceTicketOverviewDataLoading = useSelector((state) =>
    maintenanceTicketSelector.getMaintenanceTicketOverviewLoading(state),
  );

  const requestNumber = maintenanceTicketSelector.getRequestNumber(
    maintenanceTicketOverviewData,
  );
  const images = maintenanceTicketSelector.getImages(
    maintenanceTicketOverviewData,
  );
  const videos = get(maintenanceTicketOverviewData, ["videos"], "");

  const technicianImages = maintenanceTicketSelector.getTechnicianTicketImages(
    maintenanceTicketOverviewData,
  );
  const technicianVideos = maintenanceTicketSelector.getTechnicianTicketVideos(
    maintenanceTicketOverviewData,
  );

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);

  const handleImageSecretData = async () => {
    await apiRequest.getRootDataRequest(() => {}, getRootDataSuccessCallback);
  };

  const getRootDataSuccessCallback = (res) => {
    const chiper1 = get(res, ["chiper1"], "");
    const chiper2 = get(res, ["chiper2"], "");

    setSecret(Helper.generateSecretKey(chiper1, chiper2));
  };

  useEffect(() => {
    if (!isEmpty(maintenanceTicketOverviewData) && !isEmpty(images)) {
      map(images, (image) => {
        fetchImageData(image);
      });
    }

    if (!isEmpty(maintenanceTicketOverviewData) && !isEmpty(videos)) {
      fetchVideoData(videos);
    }

    if (!isEmpty(maintenanceTicketOverviewData) && !isEmpty(technicianImages)) {
      map(technicianImages, (technicianImage) => {
        fetchTechnicianImageData(technicianImage);
      });
    }

    if (!isEmpty(maintenanceTicketOverviewData) && !isEmpty(technicianVideos)) {
      fetchTechnicianVideoData(technicianVideos);
    }
  }, [maintenanceTicketOverviewData]);

  useEffect(() => {
    handleImageSecretData();
    fetchMaintenanceData();
  }, []);

  const fetchMaintenanceData = () => {
    getMaintenanceTicketOverviewRequest(id);
  };

  const fetchVideoData = async (video) => {
    const videoUrl = maintenanceTicketSelector.getUrl(video);
    const galleryId = maintenanceTicketSelector.getGalleryId(video);

    setVideoLoading(true);

    const url = `${videoUrl}/based64`;
    const headers = {
      "Content-Type": "application/json",
      AGSC: secret,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const res = { id: galleryId, video: get(response, ["data"], "") };

        setVideoValue(res);
      })
      .catch((error) => {
        Toast.error("Fetch video failed");
      })
      .finally(() => setVideoLoading(false));
  };

  const fetchImageData = async (image) => {
    const galleryUrl = maintenanceTicketSelector.getUrl(image);
    const galleryId = maintenanceTicketSelector.getGalleryId(image);

    setImageLoading(true);

    const url = `${galleryUrl}/based64`;
    const headers = {
      "Content-Type": "application/json",
      AGSC: secret,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const res = { id: galleryId, image: get(response, ["data"], "") };

        setImageList((prevState) => concat(prevState, res));
      })
      .catch((error) => {
        Toast.error("Fetch image failed");
      })
      .finally(() => setImageLoading(false));
  };

  const fetchTechnicianVideoData = async (video) => {
    const videoUrl = maintenanceTicketSelector.getUrl(video);
    const galleryId = maintenanceTicketSelector.getGalleryId(video);

    setVideoLoading(true);

    const url = `${videoUrl}/based64`;
    const headers = {
      "Content-Type": "application/json",
      AGSC: secret,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const res = { id: galleryId, video: get(response, ["data"], "") };

        setTechnicianVideoValue(res);
      })
      .catch((error) => {
        Toast.error("Fetch video failed");
      })
      .finally(() => setVideoLoading(false));
  };

  const fetchTechnicianImageData = async (image) => {
    const galleryUrl = maintenanceTicketSelector.getUrl(image);
    const galleryId = maintenanceTicketSelector.getGalleryId(image);

    setImageLoading(true);

    const url = `${galleryUrl}/based64`;
    const headers = {
      "Content-Type": "application/json",
      AGSC: secret,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const res = { id: galleryId, image: get(response, ["data"], "") };

        setTechnicianImageList((prevState) => concat(prevState, res));
      })
      .catch((error) => {
        Toast.error("Fetch image failed");
      })
      .finally(() => setImageLoading(false));
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const onClickPopupImage = (selectedImage, type) => {
    if (isEqual(type, "technician")) {
      setSelectedImageList(technicianImageList);
    } else {
      setSelectedImageList(imageList);
    }

    setSelectedImage(selectedImage);
    setOpenImageModal(true);
  };

  const onClickCloseVideoModal = () => {
    setOpenVideoModal(false);
  };

  const onClickPopupVideo = (type) => {
    if (isEqual(type, "technician")) {
      setSelectedVideo(videos);
    } else {
      setSelectedVideo(videoValue);
    }

    setOpenVideoModal(true);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Help Center Overview - Spacify Asia" />

      <DesktopLayout
        hideFooter
        loading={maintenanceTicketOverviewDataLoading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/user/help-center"}>
                    <CustomText textClassName="text-base disable-text">
                      Help Center
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base ">
                    {requestNumber}
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">{requestNumber}</CustomText>
            </div>
          </div>
        }
      >
        <div className="relative flex flex-col justify-center gap-6">
          <RequestOverviewDetail
            data={maintenanceTicketOverviewData}
            imageLoading={imageLoading}
            imageList={imageList}
            videoValue={videoValue}
            videoLoading={videoLoading}
            onClickPopupImage={onClickPopupImage}
            onClickPopupVideo={onClickPopupVideo}
          />

          <MaintenanceScheduleInformationComponent
            data={maintenanceTicketOverviewData}
            images={technicianImageList}
            videos={technicianVideoValue}
            onClickPopupImage={onClickPopupImage}
            onClickPopupVideo={onClickPopupVideo}
          />

          <CommentComponent chatList={[]} />
        </div>
      </DesktopLayout>

      <ImageModal
        data={selectedImageList}
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
  );
};

export default withTranslation("common")(AuthWrapper(RequestOverview));
