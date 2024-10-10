import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import BookingOverviewDetail from "@/components/BookingOverview/BookingOverviewDetail";
import StepSection from "@/components/BookingOverview/StepSection";
import { useEffect, useState } from "react";
import OverviewModal from "@/components/BookingOverview/OverviewModal";
import * as listingAction from "@/src/actions/listing";
import * as listingSelector from "@/src/selectors/listing";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "@/components/LoadingOverlay";
import { NextSeo } from "next-seo";
import RentChargeModal from "@/components/Booking/RentChargeModal";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopPriceSection from "@/components/Booking/DesktopPriceSection";
import { getTotalFeesAmount, getUnitName } from "@/src/selectors/listing";
import DesktopBookingStatusSection from "@/components/BookingOverview/DesktopBookingStatusSection";

export { getServerSideProps };

const BookingOverview = ({ id }) => {
  const { t } = useTranslation("common");
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

  const title = listingSelector.getTitle(bookingOverviewData);
  const propertyName = listingSelector.getPropertyName(bookingOverviewData);
  const unitRoomName = listingSelector.getUnitName(bookingOverviewData);
  const address = listingSelector.getAddress(bookingOverviewData);
  const totalMoveInCost =
    listingSelector.getTotalFeesAmount(bookingOverviewData);
  const moveInFees = listingSelector.getFees(bookingOverviewData);

  const [openFirstMonthCharges, setOpenFirstMonthCharges] = useState(false);
  const [openLastMonthCharges, setOpenLastMonthCharges] = useState(false);

  useEffect(() => {
    fetchBookingOverviewData(id);
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
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Booking Overview - Spacify Asia" />

      <DesktopLayout hideNav>
        <div className="container mx-auto flex-1 py-10">
          <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 gap-5">
            <DesktopPriceSection
              isBookingOverview
              title={title}
              propertyName={propertyName}
              unitRoomName={unitRoomName}
              address={address}
              totalMoveInCost={totalMoveInCost}
              openFirstMonthCharges={openFirstMonthCharges}
              onClickOpenFirstMonthCharges={onClickOpenFirstMonthCharges}
              openLastMonthCharges={openLastMonthCharges}
              onClickOpenLastMonthCharges={onClickOpenLastMonthCharges}
              moveInFees={moveInFees}
            />

            <DesktopBookingStatusSection t={t} data={bookingOverviewData} />
          </div>
        </div>
      </DesktopLayout>

      <CustomHeader
        pageTitle={t("pageTitle.bookingOverview")}
        hideBgImage
        onClickGoBack={onClickGoBack}
      >
        <div className="body-container pb-4">
          <BookingOverviewDetail t={t} data={bookingOverviewData} id={id} />

          <StepSection t={t} data={bookingOverviewData} />

          <OverviewModal
            t={t}
            data={bookingOverviewData}
            openFirstMonthCharges={openFirstMonthCharges}
            onClickOpenFirstMonthCharges={onClickOpenFirstMonthCharges}
            openLastMonthCharges={openLastMonthCharges}
            onClickOpenLastMonthCharges={onClickOpenLastMonthCharges}
          />

          <RentChargeModal />

          <LoadingOverlay loading={bookingOverviewLoading} />
        </div>
      </CustomHeader>
    </div>
  );
};

export default withTranslation("common")(BookingOverview);
