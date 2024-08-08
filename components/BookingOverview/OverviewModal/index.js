import CustomText from "@/components/CustomText";
import CustomModal from "@/components/CustomModal";
import * as listingSelector from "@/src/selectors/listing";
import { isEmpty, map } from "lodash";
import RentChargesComponent from "@/components/Booking/RentChargesComponent";

const OverviewModal = ({
  t,
  data,
  onClickOpenFirstMonthCharges,
  openFirstMonthCharges,
  onClickOpenLastMonthCharges,
  openLastMonthCharges,
}) => {
  const fees = listingSelector.getFees(data);

  const firstMonthRentCharges = listingSelector.getFirstMonthRentCharges(fees);
  const lastMonthRentCharges = listingSelector.getLastMonthRentCharges(fees);
  const othersList = listingSelector.getOthers(fees);
  const totalMoveInCostFirstMonth =
    listingSelector.getTotalCostFirstMonthRentCharges(fees);
  const totalMoveInCostLastMonth =
    listingSelector.getTotalCostLastMonthRentCharges(fees);
  const totalFeesAmount = listingSelector.getTotalFeesAmount(data);
  const totalFeesFirstMonthAmount =
    listingSelector.getTotalFeesFirstMonthAmount(data);
  const totalFeesLastMonthAmount =
    listingSelector.getTotalFeesLastMonthAmount(data);

  return (
    <CustomModal id="booking_overview_modal">
      <CustomText textClassName="modal-title-font pb-2 ">
        {t("bookingOverview.paymentDetail")}
      </CustomText>
      <CustomText textClassName="modal-sub-font">
        Please check the payment breakdown below. Should you have any inquiries,
        please contact the owner or agent before proceeding with your payment.
      </CustomText>
      <div className="divider divider-bookingOverview"></div>

      {isEmpty(firstMonthRentCharges) ? (
        false
      ) : (
        <RentChargesComponent
          title="First Month Rent Charges"
          onClickOpenCharges={onClickOpenFirstMonthCharges}
          openCharges={openFirstMonthCharges}
          rentChargesAmount={totalFeesFirstMonthAmount}
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
          rentChargesAmount={totalFeesLastMonthAmount}
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
                <CustomText textClassName="font-bold pr-2">{label}</CustomText>
                <CustomText>RM{value}</CustomText>
              </div>
            );
          })}

      <div className="divider divider-bookingOverview"></div>

      <div className="payment-details-fee">
        <CustomText textClassName="modal-font-primary">
          {t("bookingOverview.total")}
        </CustomText>
        <CustomText textClassName="modal-font-main">
          RM{isEmpty(totalFeesAmount) ? "0" : totalFeesAmount}
        </CustomText>
      </div>
    </CustomModal>
  );
};

export default OverviewModal;
