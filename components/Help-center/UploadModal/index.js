import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomModal from "@/components/CustomModal";

const UploadModal = ({
  t,
  changeUploadModalTitle,
  onClickOpenCamera,
  onClickSelectFile,
}) => {
  return (
    <CustomModal id="help_center_upload_modal">
      <CustomText textClassName="font-bold mb-5">
        {changeUploadModalTitle
          ? t("newRequest.uploadPhotoTitle")
          : t("newRequest.uploadVideoTitle")}
      </CustomText>

      <div className="flex gap-5">
        <div className="flex flex-col items-center">
          <CustomImage
            className="primaryWhite-bg-color p-2 cursor-pointer mb-2"
            src={Images.cameraIcon}
            imageStyle={{ borderRadius: 100, width: 60, height: 60 }}
            onClick={onClickOpenCamera}
          />
          <CustomText textClassName="font-bold font-size-small">
            {t("newRequest.camera")}
          </CustomText>
        </div>

        <div className="flex flex-col items-center">
          <CustomImage
            className="primaryWhite-bg-color p-2 cursor-pointer mb-2"
            src={Images.albumIcon}
            imageStyle={{ borderRadius: 100, width: 60, height: 60 }}
            onClick={onClickSelectFile}
          />
          <CustomText textClassName="font-bold font-size-small">
            {t("newRequest.album")}
          </CustomText>
        </div>

        <div className="flex flex-col items-center">
          <CustomImage
            className="primaryWhite-bg-color p-2 cursor-pointer mb-2"
            src={Images.primaryTermAndConditionIcon}
            imageStyle={{ borderRadius: 100, width: 60, height: 60 }}
            onClick={onClickSelectFile}
          />
          <CustomText textClassName="font-bold font-size-small">
            {t("newRequest.document")}
          </CustomText>
        </div>
      </div>
    </CustomModal>
  );
};

export default UploadModal;
