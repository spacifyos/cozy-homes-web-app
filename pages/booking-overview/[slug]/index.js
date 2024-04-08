import CustomHeader from "@/components/CustomHeader";
import {useRouter} from "next/router";
import {useTranslation, withTranslation} from "next-i18next";
import {getServerSideProps} from "@/src/utils/getStatic";
import BookingOverviewDetail from "@/components/BookingOverview/BookingOverviewDetail";
import StepSection from "@/components/BookingOverview/StepSection";
import {useEffect, useState} from "react";
import _ from "lodash";
import OverviewModal from "@/components/BookingOverview/OverviewModal";

export {getServerSideProps};
const BookingOverview = ({}) => {
    const {t} = useTranslation("common");
    const [paymentSuccess, setPaymentSuccess] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const paymentSuccess = _.get(router, ['query', 'paymentSuccess'], "");
        if (_.isEqual(paymentSuccess,"true")) {
            setPaymentSuccess(paymentSuccess);
        }
    }, [router.query]);

    const onClickGoBack = () => {
        router.back();
    };
    return (
        <CustomHeader pageTitle={t("pageTitle.bookingOverview")} hideBgImage
                      onClickGoBack={onClickGoBack}
        >
            <div className="body-container" style={{paddingBottom: 40}}>
                <BookingOverviewDetail t={t}/>
                <StepSection t={t}
                             paymentSuccess={paymentSuccess}
                />
                <OverviewModal t={t}/>
            </div>

        </CustomHeader>
    );
};

export default BookingOverview;