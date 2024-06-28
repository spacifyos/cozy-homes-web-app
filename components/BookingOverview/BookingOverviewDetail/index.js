import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import * as listingSelector from "@/src/selectors/listing";
import _ from "lodash";
import Helper from "@/src/utils/Helper";

const BookingOverviewDetail = ({ t, data, id }) => {
  const referenceNumber = listingSelector.getReferenceNumber(data);
  const title = listingSelector.getTitle(data);
  const address = listingSelector.getAddress(data);

  return (
    <div className="p-4 pb-7">
      <div className="flex items-center gap-1 pb-4">
        <CustomText textClassName="font-size-xsmall disable-text">
          {t("bookingOverview.bookingCode")}
        </CustomText>
        <CustomText textClassName="primary-text font-bold">
          {_.isEmpty(referenceNumber) ? "-" : referenceNumber}
        </CustomText>
      </div>

      {_.isEmpty(data) ? (
        false
      ) : (
        <div className="flex flex-col">
          <CustomText textClassName="primary-text font-bold">
            {_.isEmpty(title) ? "-" : title}
          </CustomText>
          <CustomText textClassName="font-size-xsmall disable-text pb-4">
            {_.isEmpty(address) ? "-" : address}
          </CustomText>
          {/*<CustomText textClassName="font-size-xsmall disable-text pb-4">*/}
          {/*  YOLO Type A, Single Bedroom, 106 sqft.*/}
          {/*</CustomText>*/}
          <div className="grid-cols-2 grid">
            <CustomButton
              buttonClassName="booking-overview-btn font-size-normal"
              buttonText={t("bookingOverview.viewMore")}
              onClick={() =>
                Helper.documentGetElementById("booking_overview_modal").showModal()
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingOverviewDetail;
