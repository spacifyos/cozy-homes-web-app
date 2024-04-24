import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import _ from "lodash";
import StatusLabel from "@/components/StatusLabel";
import StatusBorder from "@/components/StatusBorder";
import Images from "@/src/utils/Image";

const HelpCenterListingCard = ({t, item }) => {
  const router = useRouter();
  const status = _.get(item, ["status"], "");
  const secondStatus = _.get(item, ["secondStatus"], "");
  const date = _.get(item, ["date"], "");
  const requestNum = _.get(item, ["requestNum"], "");
  const request = _.get(item, ["request"], "");
  const address = _.get(item, "address", "");
  const state = _.get(item, ["state"], "");

  return (
    <div className="global-box-shadow global-border-radius p-4 primaryWhite-bg-color mb-4 cursor-pointer">
      <div className="flex items-center gap-2 pb-2">
        <StatusLabel status={status} />
        <StatusBorder status={secondStatus} />
      </div>
      <CustomText textClassName="font-bold font-size-small pb-1">
        {date}
      </CustomText>
      <div className="flex justify-between">
        <div>
          <CustomText textClassName="font-bold font-size-small primary-text">
              {t("helpCenter.request")} #: {requestNum}
          </CustomText>
          <CustomText textClassName="disable-text font-size-xxsmall">
            {request}
          </CustomText>
        </div>
        <CustomImage src={Images.rightIcon} width={13} height={13} />
      </div>
      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>
      <div className="flex items-center">
        <CustomImage
          src={Images.buildingIconActive}
          width={15}
          height={15}
          className="mr-2"
        />
        <CustomText textClassName="font-size-small mr-10">{address}</CustomText>

        <CustomImage
          src={Images.spaceIcon}
          width={20}
          height={20}
          className="mr-2"
        />
        <CustomText textClassName="font-size-small">{state}</CustomText>
      </div>
    </div>
  );
};

export default HelpCenterListingCard;
