import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import propertyDetail from "@/pages/property-overview/[slug]";
import * as listingSelector from "@/src/selectors/listing";
import moment from "moment";
import _ from "lodash";

const AgentSection = ({
  t,
  onClickBooking,
  onClickToBookAppointment,
  data,
  onClickOpenMoveInCostModal,
}) => {
  const picMemberStartDate = listingSelector.getPicMemberStartDate(data);
  const picName = listingSelector.getPicName(data);
  const picContactNumber = listingSelector.getContactNumber(data);

  return (
    <div className="agent-section-container">
      <div
        className=" primaryWhite-bg-color rounded-2xl global-box-shadow relative "
        style={{ overflow: "hidden" }}
      >
        <div className=" flex-row flex p-2 pl-3 justify-between items-center">
          <div className="relative ">
            <CustomImage
              src={Images.agentIcon}
              width={43}
              className="rounded-2xl"
            />
            {/*<div*/}
            {/*  className="flex flex-col bottom-0 absolute primaryWhite-bg-color rounded-2xl"*/}
            {/*  style={{ right: -3 }}*/}
            {/*>*/}
            {/*  <CustomImage src={Images.paidIcon} width={14} />*/}
            {/*</div>*/}
          </div>

          <div className="flex flex-col items-start pl-2 flex-1">
            <CustomText textClassName="font-size-xsmall font-bold line-clamp-1">
              {_.isEmpty(picName) ? "-" : picName}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall">
              {t("propertyDetail.memberSince")}{" "}
              {moment(picMemberStartDate).format("YYYY-MM-DD")}
            </CustomText>
            {/*<CustomText textClassName="font-size-xxsmall power-on-text">*/}
            {/*  15 Active Listing*/}
            {/*</CustomText>*/}
          </div>

          {/*<div className="flex gap-3 items-center flex-2 pr-1">*/}
          {/*  <div className="p-1 global-box-shadow global-border-radius agent-section-icon cursor-pointer">*/}
          {/*    <CustomImage*/}
          {/*      src={Images.bookingIconActive}*/}
          {/*      width={28}*/}
          {/*      onClick={onClickToBookAppointment}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <div className="p-1 global-box-shadow global-border-radius agent-section-icon cursor-pointer">*/}
          {/*    <CustomImage src={Images.callIcon} width={28} />*/}
          {/*  </div>*/}
          {/*  <div className="global-box-shadow global-border-radius agent-section-icon cursor-pointer">*/}
          {/*    <CustomImage src={Images.whatsappIcon} width={45} />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        <div className="grid grid-cols-2 justify-center items-center ">
          <div className="flex secondary-bg-color h-full py-2 px-4 justify-between items-center">
            <div className="flex flex-col leading-4">
              <CustomText textClassName="font-size-xsmall">
                {t("propertyDetail.totalMoveInCost")}
              </CustomText>
              <CustomText textClassName="font-size-small primary-text font-bold">
                RM1,020
              </CustomText>
            </div>

            <CustomImage
              className="cursor-pointer"
              src={Images.infoIcon}
              width={25}
              height={25}
              onClick={onClickOpenMoveInCostModal}
            />
          </div>
          <div
            className="primary-bg-color gap-4 h-full p-2 px-4 flex flex-row justify-between items-center cursor-pointer"
            onClick={() => onClickBooking(picContactNumber)}
          >
            <CustomText textClassName="font-size-large font-bold white-text">
              {t("propertyDetail.bookNow")}
            </CustomText>
            <CustomImage src={Images.righWhiteIcon} width={8} height={8} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSection;
