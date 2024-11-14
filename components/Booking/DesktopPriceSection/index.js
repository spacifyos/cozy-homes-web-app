import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty, isEqual, map } from "lodash";
import BookingDateInput from "@/components/Booking/BookingDateInput";
import BookingInput from "@/components/Booking/BookingInput";
import BookingSelect from "@/components/Booking/BookingSelect";
import RentChargesComponent from "@/components/Booking/RentChargesComponent";
import * as listingSelector from "@/src/selectors/listing";

const   DesktopPriceSection = ({
  openFirstMonthCharges,
  onClickOpenFirstMonthCharges,
  openLastMonthCharges,
  onClickOpenLastMonthCharges,
  moveInFees,
  title,
  onClickSelectPaymentAmount,
  targetRental,
  propertyName,
  unitRoomName,
  address,
  errorMessage,
  onChangeCheckInDate,
  calculateCheckOutDate,
  tenureOption,
  defaultOption,
  onChangeTenurePeriod,
  isAllowedZeroDeposit,
  isZeroDeposit,
  onClickSelectIsZeroDeposit,
  totalMoveInCost,
  isBookingOverview = false,
}) => {
  const firstMonthRentCharges =
    listingSelector.getFirstMonthRentCharges(moveInFees);
  const lastMonthRentCharges =
    listingSelector.getLastMonthRentCharges(moveInFees);
  const othersList = listingSelector.getOthers(moveInFees);
  const totalMoveInCostFull = listingSelector.getTotalCostFull(moveInFees);
  const totalMoveInCostPartial =
    listingSelector.getTotalCostPartial(moveInFees);
  const totalMoveInCostFirstMonth =
    listingSelector.getTotalCostFirstMonthRentCharges(moveInFees);
  const totalMoveInCostLastMonth =
    listingSelector.getTotalCostLastMonthRentCharges(moveInFees);

  return (
    <div className="xl:col-span-2 md:col-span-2 lg:col-span-2 sm:col-span-4 col-span-4 relative">
      <div className="global-border-radius global-box-shadow overflow-hidden sticky top-5">
        <CustomImage
          src={Images.imageNotFound}
          imageStyle={{ width: "100%", height: 450 }}
        />
        <div className="p-5">
          <CustomText textClassName="primary-text font-bold">
            {isEmpty(title) ? "-" : title}
          </CustomText>

          <CustomText textClassName="font-bold pb-3">
            {`RM${isEmpty(targetRental) ? "0" : targetRental} / Monthly`}
          </CustomText>

          <CustomText textClassName="font-bold">
            {isEmpty(propertyName) ? "-" : propertyName}
          </CustomText>

          <CustomText textClassName="primary-text font-size-small">
            {isEmpty(unitRoomName) ? "-" : unitRoomName}
          </CustomText>

          <CustomText textClassName="disable-text font-size-xxsmall">
            {isEmpty(address) ? "-" : address}
          </CustomText>

          {isBookingOverview ? (
            false
          ) : (
            <>
              <div className="py-3 grid grid-cols-6 gap-2 primaryWhite-bg-color">
                <CustomText textClassName="col-span-4 font-bold">
                  Tenancy Period
                </CustomText>
                <BookingDateInput
                  bgColor="bg-color"
                  className="col-span-3"
                  placeholder="12/02/2023"
                  title="Check in date"
                  name="booking_date_from"
                  errorMessage={errorMessage.booking_date_from}
                  onChange={onChangeCheckInDate}
                  required
                />

                <BookingInput
                  required
                  disabled
                  bgColor="bg-color"
                  className="col-span-3"
                  title="Check out date"
                  value={
                    isEmpty(calculateCheckOutDate("DD/MM/YYYY"))
                      ? "Please select check in date"
                      : calculateCheckOutDate("DD/MM/YYYY")
                  }
                />

                <BookingSelect
                  className="col-span-6"
                  bgColor="bg-color"
                  placeholder="Tenure Period"
                  title="Tenure Period"
                  lists={isEmpty(tenureOption) ? defaultOption : tenureOption}
                  name="tenure_period"
                  errorMessage={errorMessage.tenure_period}
                  required
                  onChange={onChangeTenurePeriod}
                />
              </div>

              {isAllowedZeroDeposit ? (
                <div className="pt-3 pb-4 grid grid-cols-6 gap-2">
                  <div className="flex items-end col-span-6">
                    <CustomText textClassName="font-bold pr-1">
                      ZERO Deposit Solution
                    </CustomText>
                    <CustomText textClassName="font-size-xxsmall pb-0.5">
                      (*Select either one)
                    </CustomText>
                  </div>

                  <div className="flex items-center col-span-3">
                    <input
                      type="radio"
                      name="is_zero_deposit"
                      value="true"
                      checked={isEqual(isZeroDeposit, "true") ? true : false}
                      onClick={onClickSelectIsZeroDeposit}
                      className="radio booking-radio mr-2"
                    />
                    <CustomText>ZERO Deposit</CustomText>
                  </div>

                  <div className="flex items-center col-span-3">
                    <input
                      type="radio"
                      name="is_zero_deposit"
                      value="false"
                      checked={isEqual(isZeroDeposit, "false") ? true : false}
                      onClick={onClickSelectIsZeroDeposit}
                      className="radio booking-radio mr-2"
                    />
                    <CustomText>Pay 2 Months Security Deposit</CustomText>
                  </div>
                </div>
              ) : (
                false
              )}
            </>
          )}
        </div>

        <div className="p-5 bg-color flex items-center justify-between">
          <CustomText textClassName="font-bold">Total Move-In Cost</CustomText>
          <CustomText textClassName="primary-text font-bold">
            RM {totalMoveInCost}
          </CustomText>
        </div>

        <div className="p-5">
          <CustomText textClassName="font-bold pb-1">Move In Cost</CustomText>
          <CustomText textClassName="font-size-xsmall font-light leading-4 disable-text">
            Please check the payment breakdown below. Should you have any
            inquiries, please contact the owner or agent before proceeding with
            your payment.
          </CustomText>

          <div
            className="divider-line"
            style={{ backgroundColor: "#D9D9D9" }}
          ></div>
          {isEmpty(firstMonthRentCharges) ? (
            false
          ) : (
            <RentChargesComponent
              title="First Month Rent Charges"
              onClickOpenCharges={onClickOpenFirstMonthCharges}
              openCharges={openFirstMonthCharges}
              rentChargesAmount={totalMoveInCostFirstMonth}
              rentChargesLists={firstMonthRentCharges}
            />
          )}

          {isEmpty(lastMonthRentCharges) ? (
            false
          ) : (
            <RentChargesComponent
              title="Last Month Rent Charges"
              onClickOpenCharges={onClickOpenLastMonthCharges}
              openCharges={openLastMonthCharges}
              rentChargesAmount={totalMoveInCostLastMonth}
              rentChargesLists={lastMonthRentCharges}
            />
          )}

          {isEmpty(othersList)
            ? false
            : map(othersList, (fessList, index) => {
                const label = listingSelector.getLabel(fessList);
                const value = listingSelector.getFeeAmount(fessList);

                return (
                  <div
                    className="flex justify-between items-center pb-1"
                    key={index}
                  >
                    <CustomText textClassName="font-bold pr-2">
                      {label}
                    </CustomText>
                    <CustomText>RM{value}</CustomText>
                  </div>
                );
              })}

          {isBookingOverview ? (
            false
          ) : (
            <>
              <div
                className="divider-line"
                style={{ backgroundColor: "#D9D9D9" }}
              ></div>

              <div className="flex justify-between items-center">
                <CustomText textClassName="font-bold pr-2">
                  Total Move-in Cost
                </CustomText>
                <CustomText textClassName="primary-text font-bold">
                  RM{totalMoveInCostFull}
                </CustomText>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="is_pay_partial"
                    value="false"
                    onClick={onClickSelectPaymentAmount}
                    className="radio booking-radio mr-2"
                  />
                  <CustomText>Pay in Full</CustomText>
                </div>

                <CustomText>RM{totalMoveInCostFull}</CustomText>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="is_pay_partial"
                    value="true"
                    onClick={onClickSelectPaymentAmount}
                    className="radio booking-radio mr-2"
                  />
                  <CustomText>Pay in Partial</CustomText>
                </div>

                <CustomText>RM{totalMoveInCostPartial}</CustomText>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopPriceSection;
