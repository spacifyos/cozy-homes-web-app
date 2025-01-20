import CustomText from "@/components/CustomText";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomLabelValue from "@/components/CustomLabelValue";
import { get, isEmpty, map, size } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import BookingTextArea from "@/components/BookingTextArea";
import CustomButton from "@/components/CustomButton";
import BookingSelect from "@/components/Booking/BookingSelect";
import Constant from "@/src/utils/Constant";

const MaintenanceScheduleInformation = ({
  data,
  images,
  videos,
  onClickPopupImage,
  onClickPopupVideo,
  onClickRemoveGallery,
  setPostData,
  postData,
  uploadImageRef,
  onChangeImage,
  uploadVideoRef,
  onChangeVideo,
  onClickUpdateTicket,
}) => {
  const technicianName = maintenanceTicketSelector.getTechnicianName(data);
  const availableDate = maintenanceTicketSelector.getAvailableDate(data);

  const videoId = get(videos, ["id"], "");
  const loading = get(videos, ["loading"], false);
  const videoStatus = get(videos, ["status"], false);
  const url = get(videos, ["tempUrl"], "");
  const videoPath = get(videos, ["path"], "");
  const isUploadedVideo = isEmpty(videoPath) ? false : true;

  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-4">
      <div className="flex justify-between items-center">
        <CustomText textClassName="disable-text text-sm">
          Maintenance Schedule Information
        </CustomText>
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 16, marginBottom: 16 }}
      ></div>

      <CustomLabelValue label={"Technician"} value={technicianName} />

      <CustomLabelValue label={"Date & Time"} value={availableDate} />

      <BookingSelect
        title={"Status"}
        placeholder={"Select status"}
        lists={[
          { label: "New", value: Constant.TICKET_NEW },
          { label: "Pending", value: Constant.TICKET_PENDING },
          { label: "On Hold", value: Constant.TICKET_ON_HOLD },
          { label: "In Progress", value: Constant.TICKET_IN_PROGRESS },
          { label: "Cancelled", value: Constant.TICKET_CANCELLED },
          { label: "Closed", value: Constant.TICKET_CLOSED },
        ]}
        disabled={false}
        bgColor="primaryWhite-bg-color"
        className="pb-4"
        value={get(postData, ["status"], "")}
        onChange={(e) =>
          setPostData((prevState) => {
            return {
              ...prevState,
              ...{ status: e.target.value },
            };
          })
        }
      />

      <BookingTextArea
        bgColor="primaryWhite-bg-color"
        className="pb-4"
        title={"Remarks"}
        placeholder={"Enter your message"}
        value={get(postData, ["technician_external_remarks"], "")}
        onChange={(e) => {
          setPostData((prevState) => {
            return {
              ...prevState,
              ...{ technician_external_remarks: e.target.value },
            };
          });
        }}
      />

      <BookingTextArea
        bgColor="primaryWhite-bg-color"
        className="pb-4"
        title={"Internal Remarks"}
        placeholder={"Enter your message"}
        value={get(postData, ["technician_internal_remarks"], "")}
        onChange={(e) => {
          setPostData((prevState) => {
            return {
              ...prevState,
              ...{ technician_internal_remarks: e.target.value },
            };
          });
        }}
      />

      <div className="pb-4">
        <CustomText textClassName="disable-text text-xs pb-1">
          {"Upload Photo (max file size 2MB, up to 5 photo):"}
        </CustomText>
        <div className=" flex flex-row items-center gap-2 pb-3">
          {map(images, (list, index) => {
            const loading = get(list, ["loading"], false);
            const status = get(list, ["status"], false);
            const base64Image = get(list, ["base64"], "");
            const path = get(list, ["path"], "");
            const id = get(list, ["id"], "");

            const isUploadedImage = isEmpty(path) ? false : true;

            return (
              <div
                key={index}
                className={`w-28 h-28 relative flex justify-center items-center border ${isEmpty(path) ? "" : status ? "border-available" : "border-occupied"} global-border-radius cursor-pointer`}
              >
                <CustomImage
                  onClick={() => onClickPopupImage(index, "technician")}
                  src={
                    isEmpty(base64Image) ? Images.imageNotFound : base64Image
                  }
                  className={`${loading ? "opacity-50" : ""}`}
                />
                {loading ? (
                  <span className="loading loading-spinner loading-lg primary-text absolute"></span>
                ) : (
                  <div
                    className="absolute top-1 right-1 cursor-pointer bg-white rounded-2xl"
                    onClick={() =>
                      onClickRemoveGallery(id, "image", isUploadedImage)
                    }
                  >
                    <CustomImage src={Images.deleteIcon} className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}

          {size(images) >= 5 ? (
            false
          ) : (
            <div
              className="bg-color global-border-radius cursor-pointer flex items-center justify-center w-28 h-28"
              onClick={() => uploadImageRef && uploadImageRef.current.click()}
            >
              <CustomImage
                src={Images.plusIcon}
                imageStyle={{ width: 20, height: 20 }}
              />

              <input
                capture="environment"
                accept="image/*"
                type="file"
                multiple
                hidden
                onChange={onChangeImage}
                ref={uploadImageRef}
              ></input>
            </div>
          )}
        </div>
      </div>

      <div className="pb-4">
        <CustomText textClassName="disable-text text-xs pb-1">
          {"Upload Video (max file size: 50MB, up to 1 video):"}
        </CustomText>
        <div className=" flex flex-row items-center gap-2 pb-3">
          {isEmpty(videos) ? (
            false
          ) : (
            <div
              className={`w-28 h-28 relative flex justify-center items-center border ${isEmpty(videoPath) ? "" : videoStatus ? "border-available" : "border-occupied"} global-border-radius`}
            >
              {loading ? (
                false
              ) : (
                <CustomImage
                  src={Images.playIcon}
                  className="w-14 h-14 cursor-pointer"
                  onClick={() => onClickPopupVideo("technician")}
                />
              )}

              {loading ? (
                <span className="loading loading-spinner loading-lg primary-text absolute"></span>
              ) : (
                <div
                  className="absolute top-1 right-1 cursor-pointer z-10"
                  onClick={() =>
                    onClickRemoveGallery(videoId, "video", isUploadedVideo)
                  }
                >
                  <CustomImage src={Images.deleteIcon} className="w-5 h-5" />
                </div>
              )}
            </div>
          )}

          {isEmpty(videos) ? (
            <div
              className="bg-color global-border-radius cursor-pointer flex items-center justify-center w-28 h-28"
              onClick={() => uploadVideoRef && uploadVideoRef.current.click()}
            >
              <CustomImage
                src={Images.plusIcon}
                imageStyle={{ width: 20, height: 20 }}
              />

              <input
                capture="environment"
                accept="video/mp4, video/quicktime"
                type="file"
                multiple
                hidden
                onChange={onChangeVideo}
                ref={uploadVideoRef}
              ></input>
            </div>
          ) : (
            false
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="primary-btn"
          buttonText={"Submit"}
          onClick={onClickUpdateTicket}
        />
      </div>

      <div className="flex flex-col justify-center items-center pt-4">
        <CustomText textClassName="disable-text text-xs">
          Maintenance Schedule Information Will Be Updated Soon
        </CustomText>
      </div>
    </div>
  );
};

export default MaintenanceScheduleInformation;
