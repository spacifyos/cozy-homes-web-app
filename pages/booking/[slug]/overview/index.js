import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useEffect, useState } from "react";
import * as listingAction from "@/src/actions/listing";
import * as listingSelector from "@/src/selectors/listing";
import { useDispatch, useSelector } from "react-redux";
import { NextSeo } from "next-seo";
import RentChargeModal from "@/components/Booking/RentChargeModal";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopPriceSection from "@/components/Booking/DesktopPriceSection";
import DesktopBookingStatusSection from "@/components/BookingOverview/DesktopBookingStatusSection";
import CustomText from "@/components/CustomText";

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
    listingSelector.getFeesTotalCostAmount(bookingOverviewData);
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

      <DesktopLayout
        hideNav
        loading={bookingOverviewLoading}
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href={"/explore"}>
                  <CustomText textClassName="text-base disable-text">
                    Explore
                  </CustomText>
                </a>
              </li>
              <li>
                <CustomText textClassName="font-size-xlarge font-bold">
                  {id}
                </CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="container mx-auto flex-1 xl:pb-6 lg:pb-6 md:pb-6 sm:pb-40 pb-40">
          <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 grid-cols-4 gap-5">
            <DesktopPriceSection
              targetRental={0}
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

      <RentChargeModal />
    </div>
  );
};

export default withTranslation("common")(BookingOverview);
