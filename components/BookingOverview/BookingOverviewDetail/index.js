import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";

const BookingOverviewDetail = ({ t }) => {
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
          YOLO Type A, Kampung Baru Air Panas, 53200 SkySanctuary, Federal
          Territory of Kuala Lumpur.
        </CustomText>
        <CustomText textClassName="font-size-xsmall disable-text pb-4">
          YOLO Type A, Single Bedroom, 106 sqft.
        </CustomText>
        <div className="grid-cols-2 grid">
          <CustomButton
            buttonClassName="booking-overview-btn font-size-normal"
            buttonText={t("bookingOverview.viewMore")}
            onClick={() => document.getElementById("isOverview").showModal()}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingOverviewDetail;
