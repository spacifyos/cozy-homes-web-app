import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
const BookingOverviewDetail = ({t}) => {


    return (
        <div className="p-4 pb-7">
        <div className="flex items-center gap-1 pb-4">
            <CustomText textClassName="font-size-xsmall disable-text">
                {t("bookingOverview.bookingCode")}
            </CustomText>
            <CustomText textClassName="primary-text font-bold">
                OIBTHVQJPN
            </CustomText>
        </div>
        <div className="flex flex-col">
            <CustomText textClassName="primary-text font-bold">
                {t("bookingOverview.roomForRent")}
            </CustomText>
            <CustomText textClassName="font-size-xsmall disable-text pb-4">
                YOLO Type A, Kampung Baru Air Panas, 53200 SkySanctuary, Federal Territory of Kuala Lumpur.
            </CustomText>
            <CustomText textClassName="font-size-xsmall disable-text pb-4">
                YOLO Type A, Single Bedroom, 106 sqft.
            </CustomText>

            <div className="grid-cols-2 grid">
                <CustomButton
                    buttonClassName="primary-btn view-more-btn font-size-xsmall"
                    buttonText={t("bookingOverview.viewMore")}
                    onClick={() => document.getElementById('booking-overview-modal').showModal()}
                />
            </div>

            <dialog id="booking-overview-modal" className="modal">
                <div className="modal-box" style={{width: "90%"}}>
                    <form method="dialog">

                        <CustomButton buttonClassName="modal-x-btn"
                                      buttonText="x"
                                      buttonStyles={{outline: "none", outlineOffset: "unset", border: "none"}}
                        />
                    </form>

                    <CustomText textClassName="modal-title-font pb-2">
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
                </div>
            </dialog>
        </div>
    </div>);
};

export default BookingOverviewDetail;
