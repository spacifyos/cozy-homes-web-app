import CustomText from "@/components/CustomText";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomLabelValue from "@/components/CustomLabelValue";
import { get, isEmpty, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const MaintenanceScheduleInformation = ({
  data,
  images,
  videos,
  onClickPopupImage,
  onClickPopupVideo,
  onClickRemoveGallery,
}) => {
  const technicianName = maintenanceTicketSelector.getTechnicianName(data);
  const availableDate = maintenanceTicketSelector.getAvailableDate(data);
  const status = maintenanceTicketSelector.getStatusLabel(data);
  const internalRemark =
    maintenanceTicketSelector.getTechnicianInternalRemarks(data);
  const externalRemark =
    maintenanceTicketSelector.getTechnicianExternalRemarks(data);

  const videoId = get(videos, ["id"], "");

  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-4">
      <div className="flex justify-between items-center">
        <CustomText textClassName="disable-text text-sm">
          Maintenance Schedule Information
        </CustomText>
        {/*<CustomImage*/}
        {/*  src={Images.refreshIconActive}*/}
        {/*  imageStyle={{ width: 20, height: 20 }}*/}
        {/*  className="cursor-pointer"*/}
        {/*/>*/}
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 16, marginBottom: 16 }}
      ></div>

      <CustomLabelValue label={"Technician"} value={technicianName} />

      <CustomLabelValue label={"Date & Time"} value={availableDate} />

      <CustomLabelValue label={"Remarks"} value={externalRemark} />

      {isEmpty(internalRemark) ? (
        false
      ) : (
        <CustomLabelValue label={"Internal Remarks"} value={internalRemark} />
      )}

      {!isEmpty(images) ? (
        <div className="pb-4">
          <CustomText textClassName="disable-text text-xs pb-1">
            Photos
          </CustomText>
          <div className="flex items-start gap-2">
            {map(images, (list, index) => {
              const image = get(list, ["image"], "");
              const id = get(list, ["id"], "");

              return (
                <div className="relative">
                  <CustomImage
                    onClick={() => onClickPopupImage(index, "technician")}
                    key={index}
                    src={image}
                    className="global-border-radius border w-28 h-28 cursor-pointer"
                  />

                  <div
                    className="absolute top-1 right-1 cursor-pointer bg-white rounded-2xl"
                    onClick={() => onClickRemoveImage(id)}
                  >
                    <CustomImage src={Images.deleteIcon} className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        false
      )}

      {!isEmpty(videos) ? (
        <div className="pb-4">
          <CustomText textClassName="disable-text text-xs pb-1">
            Video
          </CustomText>
          <div
            className={`w-28 h-28 relative flex justify-center items-center border global-border-radius`}
          >
            <CustomImage
              src={Images.playIcon}
              className="w-14 h-14 cursor-pointer"
              onClick={() => onClickPopupVideo("technician")}
            />

            <div
              className="absolute top-1 right-1 cursor-pointer bg-white rounded-2xl"
              onClick={() => onClickRemoveGallery(videoId)}
            >
              <CustomImage src={Images.deleteIcon} className="w-5 h-5" />
            </div>
          </div>
        </div>
      ) : (
        false
      )}

      <div className="flex flex-col justify-center items-center pt-4">
        <CustomText textClassName="disable-text text-xs">
          Maintenance Schedule Information Will Be Updated Soon
        </CustomText>
      </div>
    </div>
  );
};

export default MaintenanceScheduleInformation;
