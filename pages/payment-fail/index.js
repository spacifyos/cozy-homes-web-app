import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import CustomHeader from "@/components/CustomHeader";
import Images from "@/src/utils/Image";
import {useRouter} from "next/router";
import CustomButton from "@/components/CustomButton";
import {useTranslation, withTranslation} from "next-i18next";
import {getServerSideProps} from "@/src/utils/getStatic";
import {useState} from "react";

export {getServerSideProps};
const PaymentSuccess = ({}) => {
    const router = useRouter();
    const {t} = useTranslation("common");
    const [viewBooking, setViewBooking] = useState(false);
    const onClickGoBack = () => {
        router.back();
    };
    const onClickViewBooking=() => {
        setViewBooking(viewBooking)
        router.push("/booking-overview");
    }
    return (
        <CustomHeader hideGoBackButton
                      rightButton={onClickGoBack}
                      rightButtonIcon={Images.xIcon}
                      HeaderImageStyle={{width: "20px"}}
                      hideBgImage
        >
            <div className="flex flex-col justify-center items-center pt-7">

                <CustomImage
                    src={Images.failIcon}
                    imageStyle={{width: "150px", height: "150px"}}
                />

                <CustomText textClassName="font-bold pt-4" styles={{fontSize: "25px"}}>
                    {t("payment.paymentFail")}

                </CustomText>

                <div className="pb-4 px-10 pt-4">
                    <CustomText textClassName="font-size-xsmall text-center">
                        Sorry. We encounter an error while processing your payment.
                        Please try again later.
                    </CustomText>

                </div>

                <CustomButton buttonClassName="primary-btn"
                              buttonText={t("payment.viewBooking")}
                              onClick={onClickViewBooking}
                />


            </div>


        </CustomHeader>
    );
};

export default PaymentSuccess;