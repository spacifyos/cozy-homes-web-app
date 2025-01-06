import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import CustomLabelValue from "@/components/CustomLabelValue";
import StatusLabelOutline from "@/components/StatusLabelOutline";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import StatusLabel from "@/components/StatusLabel";
import { isEmpty, map, get } from "lodash";
import Images from "@/src/utils/Image";

const RequestOverviewDetail = ({
  data,
  imageList,
  imageLoading,
  videoValue,
  videoLoading,
  onClickPopupImage,
  onClickPopupVideo,
}) => {
  const status = maintenanceTicketSelector.getStatusLabel(data);
  const priority = maintenanceTicketSelector.getPriorityLabel(data);
  const requestDate = maintenanceTicketSelector.getRequestDate(data);
  const availableDate = maintenanceTicketSelector.getAvailableDate(data);
  const requestNumber = maintenanceTicketSelector.getRequestNumber(data);
  const requestInfo = maintenanceTicketSelector.getRequestInfo(data);
  const address = maintenanceTicketSelector.getPropertyName(data);
  const requesterName = maintenanceTicketSelector.getRequesterName(data);
  const requestDetails = maintenanceTicketSelector.getRequestDetails(data);
  const isAllowedEntry = maintenanceTicketSelector.getIsAllowedEntry(data);

  return (
    <div className="global-border global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-4">
      <div className="flex justify-between">
        <CustomLabelValue
          label="Request Number"
          value={requestNumber}
          highlight
        />
        <div className={`pb-2`}>
          <CustomText textClassName={`disable-text text-xs font-normal`}>
            Status
          </CustomText>
          <StatusLabel status={status} />
        </div>
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <div className="flex justify-between items-center">
        <CustomText textClassName="disable-text text-xs">
          Basic Information
        </CustomText>
        <StatusLabelOutline status={priority} />
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <div className="flex justify-between">
        <CustomLabelValue label={"Requester"} value={requesterName} />
        <CustomLabelValue label={"Request Date"} value={requestDate} />
      </div>

      <CustomLabelValue label={"Property"} value={address} />

      <CustomLabelValue label={"Request Type"} value={requestInfo} />

      <CustomLabelValue label={"Request Details"} value={requestDetails} />

      {!isEmpty(imageList) ? (
        <div className="pb-2">
          <CustomText textClassName="disable-text text-xs pb-1">
            Photos
          </CustomText>
          <div className="flex items-start gap-2 pb-2">
            {map(imageList, (list, index) => {
              return (
                <CustomImage
                  onClick={() => onClickPopupImage(index)}
                  key={index}
                  src={list}
                  className="global-border-radius border w-28 h-28 cursor-pointer"
                />
              );
            })}
          </div>
        </div>
      ) : (
        false
      )}

      {!isEmpty(videoValue) ? (
        <div className="pb-2">
          <CustomText textClassName="disable-text text-xs pb-1">
            Video
          </CustomText>
          <div
            className={`w-28 h-28 relative flex justify-center items-center border global-border-radius`}
          >
            <CustomImage
              src={Images.playIcon}
              className="w-14 h-14 cursor-pointer"
              onClick={onClickPopupVideo}
            />
          </div>
        </div>
      ) : (
        false
      )}

      <CustomLabelValue
        label={"Authorized Entry When Requester Is Absent"}
        value={isAllowedEntry ? "Yes" : "No"}
      />

      <CustomLabelValue label={"Availability"} value={availableDate} />
    </div>
  );
};

export default RequestOverviewDetail;
