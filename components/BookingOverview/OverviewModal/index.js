import CustomText from "@/components/CustomText";
import CustomModal from "@/components/CustomModal";
import * as listingSelector from "@/src/selectors/listing";
import _ from "lodash";

const OverviewModal = ({ t, data }) => {
  const fees = listingSelector.getFees(data);

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

      {_.isEmpty(fees)
        ? false
        : _.map(fees, (fee) => {
            const name = listingSelector.getName(fee);
            const amount = listingSelector.getAmount(fee);

            return (
              <div className="payment-details-fee">
                <CustomText textClassName="modal-font-primary">
                  {name}
                </CustomText>
                <CustomText textClassName="modal-font-secondary">
                  RM{amount}
                </CustomText>
              </div>
            );
          })}

      <div className="divider divider-bookingOverview"></div>
      <div className="payment-details-fee">
        <CustomText textClassName="modal-font-primary">
          {t("bookingOverview.total")}
        </CustomText>
        <CustomText textClassName="modal-font-main">RM1,600.00</CustomText>
      </div>
    </CustomModal>
  );
};

export default OverviewModal;
