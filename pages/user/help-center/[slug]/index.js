import Images from "@/src/utils/Image";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import RequestOverviewDetail from "@/components/HelpCenter/RequestOverviewDetail";
import MaintenanceScheduleInformationComponent from "@/components/HelpCenter/MaintenanceScheduleInformationComponent";
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
  forEach,
  get,
  head,
  isEmpty,
  isEqual,
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
import CommentComponent from "@/components/HelpCenter/CommentComponent";
import TechnicianInFormationBoard from "@/components/HelpCenter/TechnicianInFormationBoard";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import CommentImageUploadModal from "@/components/HelpCenter/CommentImageUploadModal";

export { getServerSideProps };

const RequestOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const uploadCommentImageRef = useRef(null);

  const [secret, setSecret] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [postCommentLoading, setPostCommentLoading] = useState(false);
  const [getCommentLoading, setGetCommentLoading] = useState(false);

  const [commentData, setCommentData] = useState([]);
  const [commentDataPagination, setCommentDataPagination] = useState("");
  const [imageList, setImageList] = useState([]);
  const [videoValue, setVideoValue] = useState(null);
  const [technicianImageList, setTechnicianImageList] = useState([]);
  const [technicianVideoValue, setTechnicianVideoValue] = useState(null);
  const [commentImage, setCommentImage] = useState([]);
  const [isCommentImageModalOpen, setIsCommentImageModalOpen] = useState(false);

  const [selectedCommentImage, setSelectedCommentImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImageList, setSelectedImageList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [messageValue, setMessageValue] = useState("");

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

  useEffect(() => {
    if (!isEmpty(commentImage)) {
      setSelectedCommentImage(head(commentImage));
    }
  }, [commentImage]);

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
    fetchTicketCommentData(id);
  }, []);

  const fetchTicketCommentData = async (id, perPage = 12, page = 1) => {
    await apiRequest.getMaintenanceTicketCommentRequest(
      id,
      perPage,
      page,
      setGetCommentLoading,
      getCommentSuccessCallback,
    );
  };

  const getCommentSuccessCallback = (res, pagination) => {
    setCommentDataPagination(pagination);

    if (isEmpty(commentData)) {
      setCommentData(res);
    } else {
      setCommentData((prevState) => {
        const currentIds = prevState.map((item) => item.id);
        const newItems = res.filter((item) => !currentIds.includes(item.id));
        return [...prevState, ...newItems];
      });
    }
  };

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
    setSelectedImage(null);
    setSelectedImageList([]);
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

  const onClickSendMessage = async () => {
    await apiRequest.postMaintenanceTicketCommentRequest(
      id,
      { content: messageValue },
      setPostCommentLoading,
      postCommentSuccessCallback,
    );
  };

  const postCommentSuccessCallback = async () => {
    await fetchTicketCommentData(id);
    setMessageValue("");
    setCommentImage([]);
  };

  const onClickLoadMore = async (currentPage) => {
    await fetchTicketCommentData(id, 12, currentPage + 1);
  };

  const onChangeCommentImage = (e) => {
    const images = e.target.files;

    if (size(images) + size(imageList) >= 6) {
      Toast.error(`Your image limit is up to 5.`);
      return;
    }

    forEach(images, (image, index) => checkImageSize(image, index + 1));

    e.target.value = "";
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
          type: 27,
          name: name,
          extension: extension[1],
          mime_type: mimeType,
          status: false,
          loading: true,
          base64: base64,
          image: image,
        };

        setCommentImage((prevState) => [...prevState, newImage]);

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
    setCommentImage((prevState) => {
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

        setCommentImage((prevState) => {
          return map(prevState, (state) => {
            if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
              return { ...state, status: true, loading: false };
            } else {
              return state;
            }
          });
        });

        handleCommentImageUploadModalOpen();
      })
      .catch((err) => {
        Toast.error("Image upload failure.");
        setCommentImage((prevState) => {
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

  const handleCommentImageUploadModalOpen = () => {
    setIsCommentImageModalOpen(true);
  };

  const handleCommentImageUploadModalClose = () => {
    setIsCommentImageModalOpen(false);
    setCommentImage([]);
  };

  const onClickRemoveCommentImage = (image) => {
    const base64 = get(image, ["base64"], "");

    setCommentImage((prevState) =>
      prevState.filter((img) => get(img, ["base64"], "") !== base64),
    );
  };

  const onClickUploadCommentImage = async () => {
    setIsCommentImageModalOpen(false);

    await apiRequest.postMaintenanceTicketCommentRequest(
      id,
      { maintenance_ticket_comment_images: commentImage },
      setPostCommentLoading,
      postCommentSuccessCallback,
    );
  };

  const onClickSelectedCommentImage = (image) => {
    setSelectedImage(image);
    setOpenImageModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Help Center Overview - CozyHomes" />

      <DesktopLayout
        hideFooter
        loading={maintenanceTicketOverviewDataLoading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/user/help-center"}>
                    <CustomText textClassName="text-base text-disable">
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
                src={Images.leftIconBlack}
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

          <TechnicianInFormationBoard data={maintenanceTicketOverviewData} />

          {isEmpty(technicianImageList) && isEmpty(technicianVideoValue) ? (
            false
          ) : (
            <MaintenanceScheduleInformationComponent
              data={maintenanceTicketOverviewData}
              images={technicianImageList}
              videos={technicianVideoValue}
              onClickPopupImage={onClickPopupImage}
              onClickPopupVideo={onClickPopupVideo}
            />
          )}

          <CommentComponent
            onClickSendMessage={onClickSendMessage}
            setMessageValue={setMessageValue}
            messageValue={messageValue}
            data={commentData}
            pagination={commentDataPagination}
            postCommentLoading={postCommentLoading}
            getCommentLoading={getCommentLoading}
            onClickLoadMore={onClickLoadMore}
            onChangeCommentImage={onChangeCommentImage}
            uploadCommentImageRef={uploadCommentImageRef}
            onClickSelectedCommentImage={onClickSelectedCommentImage}
          />
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

      <CommentImageUploadModal
        imageList={commentImage}
        selectedImage={selectedCommentImage}
        onClickCloseModal={handleCommentImageUploadModalClose}
        open={isCommentImageModalOpen}
        setSelectedCommentImage={setSelectedCommentImage}
        onClickRemoveCommentImage={onClickRemoveCommentImage}
        onClickUploadCommentImage={onClickUploadCommentImage}
      />
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(RequestOverview));
