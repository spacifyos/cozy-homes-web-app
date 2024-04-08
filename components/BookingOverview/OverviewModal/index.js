import CustomText from "@/components/CustomText";
import CustomModal from "@/components/CustomModal";

const OverviewModal = ({t}) => {
    return (
        <CustomModal>
            <CustomText textClassName="modal-title-font pb-2 ">
                {t("bookingOverview.paymentDetail")}
            </CustomText>
            <CustomText textClassName="modal-sub-font">
                Please check the payment breakdown below. Should you have any inquiries, please contact the
                owner or agent before proceeding with your payment.
            </CustomText>
            <div className="divider divider-bookingOverview"></div>
            <div className="payment-details-fee">
                <CustomText textClassName="modal-font-primary">
                    {t("bookingOverview.moveInFee")}
                </CustomText>
                <CustomText textClassName="modal-font-secondary">
                    RM400.00
                </CustomText>
            </div>
            <div className="payment-details-fee">
                <CustomText textClassName="modal-font-primary">
                    {t("bookingOverview.tenancyAgreementFee")}
                </CustomText>
                <CustomText textClassName="modal-font-secondary">
                    RM800.00
                </CustomText>
            </div>
            <div className="payment-details-fee">
                <CustomText textClassName="modal-font-primary">
                    {t("bookingOverview.securityDeposit")}
                </CustomText>
                <CustomText textClassName="modal-font-secondary">
                    RM400.00
                </CustomText>
            </div>
            <div className="divider divider-bookingOverview"></div>
            <div className="payment-details-fee">
                <CustomText textClassName="modal-font-primary">
                    Total
                </CustomText>
                <CustomText textClassName="modal-font-main">
                    RM1,600.00
                </CustomText>
            </div>
        </CustomModal>
    );
};

export default OverviewModal;
