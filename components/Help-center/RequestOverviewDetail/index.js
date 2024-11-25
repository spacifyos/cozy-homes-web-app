import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import StatusLabelOutline from "@/components/StatusLabelOutline";

const RequestOverviewDetail = ({ t }) => {
  return (
    <div className="global-border global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-4">
      <div className="flex justify-between">
        <CustomLabelValue
          label={t("requestOverview.requestNumber")}
          value="RQ-230000007"
          highlight
        />
        <CustomLabelValue
          label={t("requestOverview.status")}
          value={t("requestOverview.newRequest")}
          highlight
        />
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <div className="flex justify-between items-center">
        <CustomText textClassName="disable-text text-xs">
          {t("requestOverview.basicInformation")}
        </CustomText>
        <StatusLabelOutline status={t("requestOverview.critical")} />
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <div className="flex justify-between">
        <CustomLabelValue
          label={t("requestOverview.requester")}
          value="Joan Lim"
        />
        <CustomLabelValue
          label={t("requestOverview.requestDate")}
          value="10 DEC 2023"
        />
      </div>

      <CustomLabelValue
        label={t("requestOverview.property")}
        value="Icon City, A-01-01, Room 1"
      />

      <CustomLabelValue
        label={t("requestOverview.linkEquipment")}
        value={t("requestOverview.none")}
      />

      <CustomLabelValue
        label={t("requestOverview.none")}
        value={t("requestOverview.maintenanceAmenitiesWasherNotWorking")}
      />

      <CustomLabelValue
        label={t("requestOverview.requestDetails")}
        value={t("requestOverview.notWorkingFor2Weeks")}
      />

      <CustomText textClassName="disable-text text-xs pb-1">
        {t("requestOverview.photosOrVideos")}
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
        label={t("requestOverview.authorizedEntryWhenRequesterIsAbsent")}
        value={t("requestOverview.yes")}
      />

      <CustomLabelValue
        label={t("requestOverview.availability")}
        value="12 Dec 2023, 8.30am -12.00pm"
      />
    </div>
  );
};

export default RequestOverviewDetail;
