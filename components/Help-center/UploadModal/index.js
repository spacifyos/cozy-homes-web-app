import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomModal from "@/components/CustomModal";

const UploadModal = ({ t }) => {
    return (
        <CustomModal id="help_center_upload_modal">
            <CustomText textClassName="font-bold mb-5">{t("newRequest.uploadPhotoTitle")}</CustomText>
            <div className="flex pb-5">
                <div className="flex flex-col items-center pr-10">
                    <CustomImage
                        className="primaryWhite-bg-color p-2 cursor-pointer mb-2"
                        src={Images.cameraIcon}
                        imageStyle={{borderRadius: 100}}
                    />
                    <CustomText textClassName="font-bold">{t("newRequest.camera")}</CustomText>
                </div>
                <div className="flex flex-col items-center pr-10">
                    <CustomImage
                        className="primaryWhite-bg-color p-2 cursor-pointer mb-2"
                        src={Images.albumIcon}
                        imageStyle={{borderRadius: 100}}
                    />
                    <CustomText textClassName="font-bold">{t("newRequest.album")}</CustomText>
                </div>
            </div>
        </CustomModal>
    );
};

export default UploadModal;
