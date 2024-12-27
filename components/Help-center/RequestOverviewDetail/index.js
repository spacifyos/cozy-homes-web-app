import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import StatusLabelOutline from "@/components/StatusLabelOutline";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";

const RequestOverviewDetail = ({ data }) => {
  const status = maintenanceTicketSelector.getStatus(data);
  const priority = maintenanceTicketSelector.getPriority(data);
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
        <CustomLabelValue label="Status" value={status} highlight />
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

      <CustomText textClassName="disable-text text-xs pb-1">
        Photos Or Videos
      </CustomText>

      <div className="flex items-start gap-2 pb-2">
        <CustomImage
          src={Images.imageNotFound}
          imageStyle={{ width: 100, height: 100 }}
          className="global-border-radius"
        />
        <CustomImage
          src={Images.imageNotFound}
          imageStyle={{ width: 100, height: 100 }}
          className="global-border-radius"
        />
      </div>

      <CustomLabelValue
        label={"Authorized Entry When Requester Is Absent"}
        value={isAllowedEntry ? "Yes" : "No"}
      />

      <CustomLabelValue label={"Availability"} value={availableDate} />
    </div>
  );
};

export default RequestOverviewDetail;
