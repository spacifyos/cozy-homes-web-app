import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import * as listingSelector from "@/src/selectors/listing";
import moment from "moment";
import { isEmpty } from "lodash";

const AgentSection = ({
  t,
  onClickBooking,
  onClickToBookAppointment,
  data,
  onClickOpenMoveInCostModal,
  totalMoveInCost,
  propertyId,
}) => {
  const picMemberStartDate = listingSelector.getPicMemberStartDate(data);
  const picName = listingSelector.getPicName(data);
  const picContactNumber = listingSelector.getContactNumber(data);

  return (
    <div className="agent-section-container z-10 xl:hidden lg:hidden md:hidden sm:block block">
      <div
        className=" bg-white rounded-2xl global-box-shadow relative "
        style={{ overflow: "hidden" }}
      >
        <div className=" flex-row flex p-2 pl-3 justify-between items-center">
          <div className="relative ">
            <CustomImage
              src={Images.userIcon}
              className="rounded-2xl"
              imageStyle={{ width: 43 }}
            />

            {/*<div*/}
            {/*  className="flex flex-col bottom-0 absolute bg-white rounded-2xl"*/}
            {/*  style={{ right: -3 }}*/}
            {/*>*/}
            {/*  <CustomImage src={Images.paidIcon} width={14} />*/}
            {/*</div>*/}
          </div>

          <div className="flex flex-col items-start pl-2 flex-1">
            <CustomText textClassName="text-xs font-bold line-clamp-1">
              {isEmpty(picName) ? "-" : picName}
            </CustomText>
            <CustomText textClassName="disable-text text-xs">
              Member since
              {moment(picMemberStartDate).format("YYYY-MM-DD")}
            </CustomText>
            {/*<CustomText textClassName="text-xs text-aqua">*/}
            {/*  15 Active Listing*/}
            {/*</CustomText>*/}
          </div>

          <div className="flex gap-3 items-center flex-2 pr-1">
            {/*<div className="p-1 global-box-shadow global-border-radius agent-section-icon cursor-pointer">*/}
            {/*  <CustomImage*/}
            {/*    src={Images.bookingIconActive}*/}
            {/*    width={28}*/}
            {/*    onClick={onClickToBookAppointment}*/}
            {/*  />*/}
            {/*</div>*/}
            <a
              href={`tel:${picContactNumber}`}
              className="p-1 global-box-shadow global-border-radius agent-section-icon cursor-pointer"
            >
              <CustomImage src={Images.callIcon} width={28} />
            </a>
            <a
              href={`${
                isEmpty(picContactNumber)
                  ? `https://api.whatsapp.com/send/?text=Hi, I need some help.`
                  : `https://api.whatsapp.com/send/?phone=${picContactNumber}&text=Hi, I need some help.`
              }`}
              target="_blank"
              className="global-box-shadow global-border-radius agent-section-icon cursor-pointer"
            >
              <CustomImage src={Images.whatsappIcon} width={45} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-center items-center ">
          <div className="flex bg-secondary-background h-full py-2 px-4 justify-between items-center">
            <div className="flex flex-col leading-4">
              <CustomText textClassName="text-xs">
                Total Move In Cost
              </CustomText>
              <CustomText textClassName="text-sm primary-text font-bold">
                RM{isEmpty(totalMoveInCost) ? "0" : totalMoveInCost}
              </CustomText>
            </div>

            <CustomImage
              imageStyle={{ width: 25 }}
              className="cursor-pointer"
              src={Images.infoIcon}
              onClick={onClickOpenMoveInCostModal}
            />
          </div>
          {isEmpty(propertyId) ? (
            <div
              className="bg-primary gap-4 h-full p-2 px-4 flex flex-row justify-between items-center cursor-pointer"
              onClick={onClickBooking}
            >
              <CustomText textClassName="text-base font-bold text-white">
                Book Now
              </CustomText>
              <CustomImage
                src={Images.righWhiteIcon}
                imageStyle={{ width: 8 }}
              />
            </div>
          ) : (
            <a
              href={`/booking/${propertyId}`}
              className="bg-primary gap-4 h-full p-2 px-4 flex flex-row justify-between items-center cursor-pointer"
            >
              <CustomText textClassName="text-base font-bold text-white">
                Book Now
              </CustomText>
              <CustomImage
                src={Images.righWhiteIcon}
                imageStyle={{ width: 8 }}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentSection;
