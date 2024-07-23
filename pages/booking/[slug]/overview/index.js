import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import BookingOverviewDetail from "@/components/BookingOverview/BookingOverviewDetail";
import StepSection from "@/components/BookingOverview/StepSection";
import { useEffect, useState } from "react";
import _ from "lodash";
import OverviewModal from "@/components/BookingOverview/OverviewModal";
import * as listingAction from "@/src/actions/listing";
import * as listingSelector from "@/src/selectors/listing";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "@/components/LoadingOverlay";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const BookingOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const [paymentSuccess, setPaymentSuccess] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const getBookingOverviewRequest = (id) =>
    dispatch(listingAction.getBookingOverviewRequest(id));
  const bookingOverviewData = useSelector((state) =>
    listingSelector.getBookingOverviewData(state, id),
  );
  const bookingOverviewLoading = useSelector((state) =>
    listingSelector.getBookingOverviewLoading(state),
  );

  const [openFirstMonthCharges, setOpenFirstMonthCharges] = useState(false);
  const [openLastMonthCharges, setOpenLastMonthCharges] = useState(false);

  useEffect(() => {
    fetchBookingOverviewData(id);
  }, []);

  useEffect(() => {
    const paymentSuccess = _.get(router, ["query", "paymentSuccess"], "");
    if (_.isEqual(paymentSuccess, "true")) {
      setPaymentSuccess(paymentSuccess);
    }
  }, []);

  const fetchBookingOverviewData = (id) => {
    getBookingOverviewRequest(id);
  };

  const onClickGoBack = () => {
    router.replace("/explore");
  };

  const onClickOpenFirstMonthCharges = () => {
    setOpenFirstMonthCharges(!openFirstMonthCharges);
  };

  const onClickOpenLastMonthCharges = () => {
    setOpenLastMonthCharges(!openLastMonthCharges);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.bookingOverview")}
      hideBgImage
      onClickGoBack={onClickGoBack}
    >
      <NextSeo title="Booking Overview - Spacify Asia" />
      <div className="body-container pb-4">
        <BookingOverviewDetail t={t} data={bookingOverviewData} id={id} />

        <StepSection
          t={t}
          paymentSuccess={paymentSuccess}
          data={bookingOverviewData}
        />

        <OverviewModal
          t={t}
          data={bookingOverviewData}
          openFirstMonthCharges={openFirstMonthCharges}
          onClickOpenFirstMonthCharges={onClickOpenFirstMonthCharges}
          openLastMonthCharges={openLastMonthCharges}
          onClickOpenLastMonthCharges={onClickOpenLastMonthCharges}
        />

        <LoadingOverlay loading={bookingOverviewLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(BookingOverview);
