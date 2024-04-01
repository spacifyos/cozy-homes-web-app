import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";

const AgentSection = ({ t }) => {
  return (
    <div className="sticky bottom-3 w-full pt-5" style={{ maxWidth: 470 }}>
      <div
        className=" primaryWhite-bg-color rounded-2xl global-box-shadow relative "
        style={{ overflow: "hidden" }}
      >
        <div className=" flex-row flex p-2 justify-between">
          <div className="relative pt-1">
            <CustomImage
              src={Images.agentIcon}
              width={60}
              className="rounded-2xl"
            />
            <div
              className="flex flex-col bottom-0 absolute"
              style={{ right: -11 }}
            >
              <CustomImage src={Images.paidIcon} width={20} height={20} />
            </div>
          </div>

          <div className="flex flex-col items-start pl-5 flex-1">
            <CustomText textClassName="font-size-normal font-bold pt-2">
              Razak bin Osman
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall">
              {t("propertyDetail.memberSince")} 2023-08-08
            </CustomText>
            <CustomText textClassName="font-size-xsmall pt-1 power-on-text">
              15 Active Listing
            </CustomText>
          </div>

          <div className="flex gap-2 items-center flex-2 ">
            <CustomImage
              src={Images.callIcon}
              width={40}
              className="global-border-radius global-box-shadow p-1"
            />
            <CustomImage
              src={Images.whatsappIcon}
              width={40}
              className="global-box-shadow global-border-radius"
            />
          </div>
        </div>

        <div className="grid grid-flow-col flex flex-row primary-bg-color p-1 justify-center items-center">
          <CustomText textClassName="font-size-xxlarge font-bold white-text">
            RM750
          </CustomText>
          <CustomText textClassName="font-size-large pl-1 white-text">
            /month
          </CustomText>
        </div>
      </div>
    </div>
  );
};

export default AgentSection;
