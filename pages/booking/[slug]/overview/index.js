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

export { getServerSideProps };

const BookingOverview = () => {
  const { t } = useTranslation("common");
  const [paymentSuccess, setPaymentSuccess] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const getBookingOverviewRequest = (id) =>
    dispatch(listingAction.getBookingOverviewRequest(id));
  const bookingOverviewData = useSelector((state) =>
    listingSelector.getBookingOverviewData(state),
  );
  const bookingOverviewLoading = useSelector((state) =>
    listingSelector.getBookingOverviewLoading(state),
  );

  useEffect(() => {
    const paymentSuccess = _.get(router, ["query", "paymentSuccess"], "");
    if (_.isEqual(paymentSuccess, "true")) {
      setPaymentSuccess(paymentSuccess);
    }
  }, []);

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.bookingOverview")}
      hideBgImage
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container pb-4">
        <BookingOverviewDetail t={t} data={bookingOverviewData} />

        <StepSection t={t} paymentSuccess={paymentSuccess} />

        <OverviewModal t={t} />

        <LoadingOverlay loading={bookingOverviewLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(BookingOverview);
