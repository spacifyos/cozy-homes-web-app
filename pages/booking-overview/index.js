import CustomHeader from "@/components/CustomHeader";
import {useRouter} from "next/router";
import {useTranslation, withTranslation} from "next-i18next";
import {getServerSideProps} from "@/src/utils/getStatic";
import BookingOverviewDetail from "@/components/BookingOverview/BookingOverviewDetail";
import StepSection from "@/components/BookingOverview/StepSection";
import {useEffect, useState} from "react";
import _ from "lodash";

export {getServerSideProps};
const bookingOverview = ({}) => {
    const {t} = useTranslation("common");
    const router = useRouter();
    const [viewBooking, setViewBooking] = useState(true);

    const onClickGoBack = () => {
        router.back();
    };
    useEffect(() => {
        const viewBooking = _.get(router, 'query.viewBooking', undefined);
        if (viewBooking !== undefined) {
            setViewBooking(viewBooking);
        }
    }, [router.query]);


    return (
        <CustomHeader pageTitle={t("pageTitle.bookingOverview")} hideBgImage
                      onClickGoBack={onClickGoBack}
        >
            <div className="body-container">
                <BookingOverviewDetail t={t}/>

                <StepSection t={t} viewBooking={viewBooking}/>

            </div>

        </CustomHeader>
    );
};

export default bookingOverview;