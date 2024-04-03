import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import {useRouter} from "next/router";

const StepSection = ({t, viewBooking}) => {
    const router = useRouter();
    const onClickPayNow = () => {
        router.push("/payment-successful");
    };
    const completed = t("bookingOverview.completed");
    const pending = t("bookingOverview.pending");
    const isPayment = _.isEqual(viewBooking, true);

    return (<div className="global-box-shadow global-border-radius primaryWhite-bg-color p-7">

            <div className="flex flex-row items-start gap-2 pb-10">
                <CustomImage
                    src={Images.stepCompleteIcon}
                    imageStyle={{width: "30px", height: "30px"}}
                />
                <div className="flex flex-col">

                    <CustomText textClassName="step-section-step-font">
                        {t("bookingOverview.step1")}
                    </CustomText>

                    <div className="leading-5">

                        <CustomText textClassName="font-size-xsmall">
                            {t("bookingOverview.booking")}
                        </CustomText>

                        <div className="flex gap-3 items-center pb-2 pt-1">

                            <CustomText textClassName="font-size-xsmall">
                                {t("bookingOverview.status")}
                            </CustomText>

                            <CustomText
                                textClassName="step-section-complete-font">
                                {t("bookingOverview.completed")}
                            </CustomText>

                        </div>
                        <CustomText textClassName="step-section-infor-font">
                            {t("bookingOverview.bookingCreatedAt")} 2022-07-27 18:55:50
                        </CustomText>
                    </div>

                </div>
            </div>

            <div className="flex flex-row items-start gap-2 pb-10">
                <CustomImage

                    src={_.isEqual(viewBooking, true) ? Images.step2Icon : Images.stepCompleteIcon}
                    imageStyle={{width: "30px", height: "30px"}}
                />

                <div className="flex flex-col ">
                    <CustomText
                        textClassName={`step-section-step-font ${_.isEqual(viewBooking, true) ? "disable-text" : ""}  py-2`}>
                        {t("bookingOverview.step2")}
                    </CustomText>
                    <CustomText textClassName="font-size-xsmall">
                        {t("bookingOverview.payment")}
                    </CustomText>
                    <div className="flex gap-3 items-center pb-2 pt-1">
                        <CustomText textClassName="font-size-xsmall">
                            {t("bookingOverview.status")}
                        </CustomText>
                        <CustomText
                            textClassName={isPayment ? "step-section-pending-font" : "step-section-complete-font"}
                        >
                            {isPayment ? pending : completed}
                        </CustomText>
                    </div>

                    {_.isEqual(viewBooking, true) ? (<>
                        <CustomButton
                            buttonClassName="primary-btn"
                            buttonText=  {t("bookingOverview.payNow")}
                            onClick={onClickPayNow}
                        />
                    </>) : (

                        <>
                            <CustomText textClassName="step-section-infor-font">
                                {t("bookingOverview.paymentAuthorizedAt")} 2022-07-27 19:55:50
                            </CustomText>
                        </>)}

                </div>
            </div>

            <div className="flex flex-row items-start gap-2">
                <CustomImage
                    src={Images.step3Icon}
                    imageStyle={{width: "30px", height: "30px"}}
                />
                <div className="flex flex-col">
                    <CustomText textClassName="font-size-xlarge font-bold disable-text py-2">
                        {t("bookingOverview.step3")}
                    </CustomText>
                    <CustomText textClassName="font-size-xsmall">
                        {t("bookingOverview.agencyReview")}
                    </CustomText>
                    <div className="flex gap-3 items-center pb-2 pt-1">
                        <CustomText textClassName="font-size-xsmall">
                            {t("bookingOverview.status")}
                        </CustomText>

                        <CustomText
                            textClassName="step-section-pending-font">
                            {t("bookingOverview.pending")}
                        </CustomText>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default StepSection;
