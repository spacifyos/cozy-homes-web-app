import Images from "@/src/utils/Image";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import RequestOverviewDetail from "@/components/Help-center/RequestOverviewDetail";
import MaintenanceScheduleInformationComponent from "@/components/Help-center/TechnicianMaintenanceScheduleInformation";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import DesktopLayout from "@/components/DesktopLayout";
import * as maintenanceTicketAction from "@/src/actions/maintenance-ticket";
import { useDispatch, useSelector } from "react-redux";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import { useEffect, useRef, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import {
  concat,
  filter,
  get,
  isEmpty,
  isEqual,
  last,
  map,
  size,
  some,
  split,
} from "lodash";
import Helper from "@/src/utils/Helper";
import AuthManager from "@/src/utils/AuthManager";
import axios from "axios";
import Toast from "@/src/utils/Toast";
import ImageModal from "@/components/PropertyOverview/ImageModal";
import VideoModal from "@/components/VideoModal";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import * as path from "path";

export { getServerSideProps };

const RequestOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const uploadImageRef = useRef(null);
  const uploadVideoRef = useRef(null);

  const [secret, setSecret] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [ticketUpdateLoading, setTicketUpdateLoading] = useState(false);

  const [galleryDeleteLoading, setGalleryDeleteLoading] = useState(false);

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
  const externalRemark = maintenanceTicketSelector.getTechnicianExternalRemarks(
    maintenanceTicketOverviewData,
  );
  const internalRemark = maintenanceTicketSelector.getTechnicianInternalRemarks(
    maintenanceTicketOverviewData,
  );
  const status = maintenanceTicketSelector.getStatusValue(
    maintenanceTicketOverviewData,
  );

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [postData, setPostData] = useState({});

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

    if (!isEmpty(maintenanceTicketOverviewData)) {
      setPostData({
        technician_external_remarks: externalRemark,
        technician_internal_remarks: internalRemark,
        status: status,
      });
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
        const res = { id: galleryId, tempUrl: get(response, ["data"], "") };

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
        const res = {
          id: galleryId,
          base64: get(response, ["data"], ""),
        };

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
      setSelectedVideo(technicianVideoValue);
    } else {
      setSelectedVideo(videoValue);
    }

    setOpenVideoModal(true);
  };

  const onClickRemoveGallery = async (id, type, isUploadedDocument) => {
    if (isUploadedDocument) {
      if (isEqual(type, "image")) {
        onClickRemoveImage(id);
      } else if (isEqual(type, "video")) {
        onClickRemoveVideo();
      }
    } else {
      await apiRequest.deleteGalleryRequest(
        id,
        setGalleryDeleteLoading,
        deleteSuccessCallback,
      );
    }
  };

  const deleteSuccessCallback = () => {
    router.reload();
  };

  const checkImageSize = async (image) => {
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
          type: 24,
          name: name,
          extension: extension[1],
          mime_type: mimeType,
          status: false,
          loading: true,
          base64: base64,
          image: image,
        };

        setTechnicianImageList((prevState) => [...prevState, newImage]);

        fetchGalleryLink(newImage);
      } catch (error) {
        Toast.error("Error converting image to base64:", error);
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
    setTechnicianImageList((prevState) => {
      return map(prevState, (state) => {
        if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
          return { ...state, url: url, path: path, id: path };
        } else {
          return state;
        }
      });
    });

    postUploadImage(url, image);
  };

  const postUploadImage = (url, image) => {
    axios
      .put(url, get(image, ["image"], ""))
      .then((result) => {
        Toast.success("Image upload success.");
        setTechnicianImageList((prevState) => {
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
        setTechnicianImageList((prevState) => {
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

  const onChangeVideo = (e) => {
    const videos = e.target.files[0];

    const isLt10M = videos && videos.size / 1024 / 1024 < 50;
    if (!isLt10M) {
      Toast.error(`Your video is larger than 50MB`);
      return;
    } else {
      const videoUrl = URL.createObjectURL(videos);

      const newVideo = {
        type: 25,
        video: videos,
        tempUrl: videoUrl,
        loading: true,
        status: false,
        extension: last(split(get(videos, ["name"], ""), ".")),
        mime_type: get(videos, ["type"], ""),
      };

      setTechnicianVideoValue((prevState) => {
        return {
          ...prevState,
          ...newVideo,
        };
      });

      fetchVideoGalleryLink(newVideo);
    }
  };

  const fetchVideoGalleryLink = (video) => {
    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, ["data", "data", "url"], "");
        const path = get(res, ["data", "data", "path"], "");

        Toast.success("Get gallery link success.");
        getVideoGalleryLinkSuccess(url, video, path);
      })
      .catch((err) => {
        Toast.error("Get gallery link failure.");
        setTechnicianVideoValue((prevState) => ({
          ...prevState,
          loading: false,
        }));
      });
  };

  const getVideoGalleryLinkSuccess = (url, videos, path) => {
    setTechnicianVideoValue((prevState) => ({
      ...prevState,
      url: url,
      path: path,
      id: path,
    }));

    postUploadVideo(url, videos);
  };

  const postUploadVideo = (url, videos) => {
    const { video } = videos;

    axios
      .put(url, video)
      .then((result) => {
        Toast.success("Image upload success.");

        setTechnicianVideoValue((prevState) => ({
          ...prevState,
          loading: false,
          status: true,
        }));
      })
      .catch((err) => {
        Toast.error("Image upload failure.");

        setTechnicianVideoValue((prevState) => ({
          ...prevState,
          loading: false,
          status: false,
        }));
      });
  };

  const onClickRemoveVideo = () => {
    setTechnicianVideoValue(null);
  };

  const onClickRemoveImage = (path) => {
    setTechnicianImageList(
      filter(
        technicianImageList,
        (list) => !isEqual(get(list, ["path"], ""), path),
      ),
    );
  };

  const onClickUpdateTicket = async () => {
    await apiRequest.putMaintenanceTicketRequest(
      id,
      {
        ...postData,
        maintenance_ticket_process_images: filter(
          technicianImageList,
          (list) => !isEmpty(get(list, ["mime_type"], "")),
        ),
        maintenance_ticket_process_videos: filter(
          [technicianVideoValue],
          (list) => !isEmpty(get(list, ["mime_type"], "")),
        ),
      },
      setTicketUpdateLoading,
      updateSuccessCallback,
    );
  };

  const updateSuccessCallback = () => {
    router.reload();
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Help Center Overview - Spacify Asia" />

      <DesktopLayout
        hideFooter
        loading={galleryDeleteLoading || maintenanceTicketOverviewDataLoading || ticketUpdateLoading}
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
            onClickRemoveGallery={onClickRemoveGallery}
            setPostData={setPostData}
            postData={postData}
            onChangeImage={onChangeImage}
            uploadImageRef={uploadImageRef}
            uploadVideoRef={uploadVideoRef}
            onChangeVideo={onChangeVideo}
            onClickUpdateTicket={onClickUpdateTicket}
          />

          {/*<CommentComponent t={t} chatList={chatList} />*/}
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
