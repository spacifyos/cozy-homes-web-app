import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { isEmpty, map } from "lodash";
import moment from "moment/moment";
import * as listingSelector from "@/src/selectors/listing";
import RentChargesComponent from "@/components/Booking/RentChargesComponent";

const DesktopPropertyPriceSection = ({
  data,
  lists,
  totalMoveInCost,
  rental,
  openModalFirstMonthCharges,
  openModalLastMonthCharges,
  onClickOpenModalFirstMonthCharges,
  onClickOpenModalLastMonthCharges,
  propertyId,
}) => {
  const picMemberStartDate = listingSelector.getPicMemberStartDate(data);
  const picName = listingSelector.getPicName(data);
  const picContactNumber = listingSelector.getContactNumber(data);

  const firstMonthRentCharges = listingSelector.getFirstMonthRentCharges(lists);
  const lastMonthRentCharges = listingSelector.getLastMonthRentCharges(lists);
  const othersList = listingSelector.getOthers(lists);
  const totalMoveInCostFull = listingSelector.getTotalCostFull(lists);
  const totalMoveInCostPartial = listingSelector.getTotalCostPartial(lists);
  const totalMoveInCostFirstMonth =
    listingSelector.getTotalCostFirstMonthRentCharges(lists);
  const totalMoveInCostLastMonth =
    listingSelector.getTotalCostLastMonthRentCharges(lists);

  return (
    <div className="global-box-shadow global-border-radius mt-3 overflow-hidden sticky top-5">
      <div className="secondary-bg-color p-3">
        <div className="flex items-end">
          <CustomText textClassName="black-text text-base font-bold pr-2">
            RM{rental}
          </CustomText>
          <CustomText textClassName="black-text text-sm">/ month</CustomText>
        </div>
      </div>

      <div className="primaryWhite-bg-color">
        <div className="flex p-3 justify-between items-center">
          <div className="relative ">
            <CustomImage
              src={Images.userIcon}
              className="rounded-2xl"
              imageStyle={{ width: 43 }}
            />
          </div>

          <div className="flex flex-col items-start pl-2 flex-1">
            <CustomText textClassName="text-xs font-bold line-clamp-1">
              {isEmpty(picName) ? "-" : picName}
            </CustomText>
            <CustomText textClassName="disable-text text-xs">
              Member since {moment(picMemberStartDate).format("YYYY-MM-DD")}
            </CustomText>
          </div>

          <div className="flex gap-3 items-center flex-2 pr-1">
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

        <div className="p-3 bg-color flex items-center justify-between">
          <CustomText textClassName="font-bold xl:text-base lg:text-base md:text-sm sm:text-sm text-sm">
            Total Move-In Cost
          </CustomText>
          <CustomText textClassName="primary-text font-bold xl:text-base lg:text-base md:text-sm sm:text-sm text-sm">
            RM {totalMoveInCost}
          </CustomText>
        </div>

        <div className="px-3 py-5">
          <CustomText textClassName="xl:text-base lg:text-base md:text-sm sm:text-sm text-sm pb-1">
            Move In Cost
          </CustomText>
          <CustomText textClassName="disable-text text-xs text-justify">
            Please check the payment breakdown below. Should you have any
            inquiries, please contact the owner or agent before proceeding with
            your payment.
          </CustomText>

          <div className="divider-line"></div>

          {isEmpty(firstMonthRentCharges) ? (
            false
          ) : (
            <RentChargesComponent
              title="First Month Rent Charges"
              onClickOpenCharges={onClickOpenModalFirstMonthCharges}
              openCharges={openModalFirstMonthCharges}
              rentChargesAmount={totalMoveInCostFirstMonth}
              rentChargesLists={firstMonthRentCharges}
            />
          )}

          {isEmpty(lastMonthRentCharges) ? (
            false
          ) : (
            <RentChargesComponent
              title="Last Month Rent Charges"
              onClickOpenCharges={onClickOpenModalLastMonthCharges}
              openCharges={openModalLastMonthCharges}
              rentChargesAmount={totalMoveInCostLastMonth}
              rentChargesLists={lastMonthRentCharges}
            />
          )}

          {isEmpty(othersList)
            ? false
            : map(othersList, (feesList, index) => {
                const label = listingSelector.getLabel(feesList);
                const amount = listingSelector.getFeeAmount(feesList);

                return (
                  <div
                    className="flex justify-between items-center pb-1"
                    key={index}
                  >
                    <CustomText textClassName="font-bold pr-2 text-sm">
                      {isEmpty(label) ? "-" : label}
                    </CustomText>
                    <CustomText textClassName="text-sm">
                      RM{isEmpty(amount) ? "0" : amount}
                    </CustomText>
                  </div>
                );
              })}

          <div className="divider-line"></div>

          <CustomText textClassName="font-bold pr-2 pb-1 text-sm">
            Total Move-in Cost
          </CustomText>

          <div className="flex justify-between items-center">
            <CustomText textClassName="pr-2 text-sm">Full Amount</CustomText>
            <CustomText textClassName="primary-text font-bold text-sm">
              RM{isEmpty(totalMoveInCostFull) ? "0" : totalMoveInCostFull}
            </CustomText>
          </div>

          <div className="flex justify-between items-center pb-4">
            <CustomText textClassName="pr-2 text-sm">Partial Amount</CustomText>
            <CustomText textClassName="primary-text font-bold text-sm">
              RM
              {isEmpty(totalMoveInCostPartial) ? "0" : totalMoveInCostPartial}
            </CustomText>
          </div>

          <a
            href={`/booking/${propertyId}`}
            className="primary-bg-color p-2 px-4 flex justify-center items-center cursor-pointer global-border-radius"
          >
            <CustomText textClassName="text-base font-bold text-white">
              Book Now
            </CustomText>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DesktopPropertyPriceSection;
