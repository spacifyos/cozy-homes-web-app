import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import _ from "lodash";
import StatusLabel from "@/components/StatusLabel";
import Images from "@/src/utils/Image";
import StatusLabelOutline from "@/components/StatusLabelOutline";

const HelpCenterListingCard = ({ t, item }) => {
  const router = useRouter();
  const status = _.get(item, ["status"], "");
  const secondStatus = _.get(item, ["secondStatus"], "");
  const date = _.get(item, ["date"], "");
  const requestNum = _.get(item, ["requestNum"], "");
  const request = _.get(item, ["request"], "");
  const address = _.get(item, "address", "");
  const state = _.get(item, ["state"], "");

  return (
    <div className="global-box-shadow global-border-radius p-4 primaryWhite-bg-color mb-3 cursor-pointer relative">
      <div className="flex items-center gap-2 pb-2">
        <StatusLabel status={status} />
        <StatusLabelOutline status={secondStatus} />
      </div>

      <div className="flex justify-between items-center">
        <div className="pr-2">
          <CustomText textClassName="font-bold font-size-small">
            {date}
          </CustomText>

          <CustomText textClassName="font-bold primary-text">
            {t("helpCenter.request")} #: {requestNum}
          </CustomText>

          <CustomText
            textClassName="disable-text font-size-xxsmall"
            lineClamp={2}
          >
            {request}
          </CustomText>
        </div>

        <CustomImage
          src={Images.rightIcon}
          imageStyle={{ width: 18, height: 18 }}
        />
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center col-span-1">
          <CustomImage
            src={Images.buildingIconActive}
            className="mr-2"
            imageStyle={{ width: 18, height: 18 }}
          />
          <CustomText textClassName="font-size-small">{address}</CustomText>
        </div>

        <div className="flex items-center col-span-1">
          <CustomImage
            src={Images.spaceIcon}
            className="mr-2"
            imageStyle={{ width: 18, height: 18 }}
          />
          <CustomText textClassName="font-size-small">{state}</CustomText>
        </div>
      </div>

      {_.isEqual(item.status, "In Progress") ? (
        <div className="error-bg-color rounded-2xl h-3 w-3 absolute right-0 top-0"></div>
      ) : (
        false
      )}
    </div>
  );
};

export default HelpCenterListingCard;
