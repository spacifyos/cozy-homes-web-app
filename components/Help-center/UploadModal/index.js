import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomModal from "@/components/CustomModal";

const UploadModal = ({ t, changeUploadModalTitle }) => {
  return (
    <CustomModal id="help_center_upload_modal">
      <CustomText textClassName="font-bold mb-5">
        {changeUploadModalTitle
          ? t("newRequest.uploadPhotoTitle")
          : t("newRequest.uploadVideoTitle")}
      </CustomText>
      <div className="grid grid-cols-9">
        <div className="col-span-3 flex flex-col items-center">
          <CustomImage
            className="primaryWhite-bg-color p-2 cursor-pointer mb-2"
            src={Images.cameraIcon}
            imageStyle={{ borderRadius: 100 }}
          />
          <CustomText textClassName="font-bold">
            {t("newRequest.camera")}
          </CustomText>
        </div>
        <div className="col-span-3 flex flex-col items-center">
          <CustomImage
            className="primaryWhite-bg-color p-2 cursor-pointer mb-2"
            src={Images.albumIcon}
            imageStyle={{ borderRadius: 100 }}
          />
          <CustomText textClassName="font-bold">
            {t("newRequest.album")}
          </CustomText>
        </div>
        <div className="col-span-3 flex flex-col items-center">
          <CustomImage
            className="primaryWhite-bg-color p-2 cursor-pointer mb-2"
            src={Images.primaryTermAndConditionIcon}
            imageStyle={{ borderRadius: 100 }}
          />
          <CustomText textClassName="font-bold">
            {t("newRequest.document")}
          </CustomText>
        </div>
      </div>
    </CustomModal>
  );
};

export default UploadModal;
