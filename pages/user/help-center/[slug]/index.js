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
import { concat, get, isEmpty, map } from "lodash";
import Helper from "@/src/utils/Helper";
import AuthManager from "@/src/utils/AuthManager";
import axios from "axios";
import Toast from "@/src/utils/Toast";
import ImageModal from "@/components/PropertyOverview/ImageModal";
import VideoModal from "@/components/VideoModal";

export { getServerSideProps };

const RequestOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const [secret, setSecret] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [videoValue, setVideoValue] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);

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

  const [selectedImage, setSelectedImage] = useState(0);
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
  }, [maintenanceTicketOverviewData]);

  useEffect(() => {
    handleImageSecretData();
    fetchMaintenanceData();
  }, []);

  const fetchMaintenanceData = () => {
    getMaintenanceTicketOverviewRequest(id);
  };

  const fetchVideoData = async (video) => {
    setVideoLoading(true);

    const url = `${video}/based64`;
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
        const res = get(response, ["data"], "");

        setVideoValue(res);
      })
      .catch((error) => {
        Toast.error("Fetch image failed");
      })
      .finally(() => setVideoLoading(false));
  };

  const fetchImageData = async (image) => {
    setImageLoading(true);

    const url = `${image}/based64`;
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
        const res = get(response, ["data"], "");

        setImageList((prevState) => concat(prevState, res));
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
      <NextSeo title="Help Center Overview - Spacify Asia" />

      <DesktopLayout
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
        <div className="relative flex flex-col justify-center">
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
          />

          {/*<CommentComponent t={t} chatList={chatList} />*/}
        </div>
      </DesktopLayout>

      <ImageModal
        data={imageList}
        selectedImage={selectedImage}
        onClickCloseImageModal={onClickCloseImageModal}
        openImageModal={openImageModal}
      />

      <VideoModal
        onClickCloseVideoModal={onClickCloseVideoModal}
        openVideoModal={openVideoModal}
        selectedVideo={videoValue}
      />
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(RequestOverview));
