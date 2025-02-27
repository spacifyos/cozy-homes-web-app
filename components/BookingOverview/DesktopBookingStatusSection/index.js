import StepSection from "@/components/BookingOverview/StepSection";
import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import StatusLabel from "@/components/StatusLabel";
import { isEmpty, isEqual, upperCase } from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import Constant from "@/src/utils/Constant";
import CustomButton from "@/components/CustomButton";
import moment from "moment/moment";

const DesktopBookingStatusSection = ({ t, data }) => {
  const createAt = listingSelector.getCreatedAt(data);
  const paymentStatus = listingSelector.getPaymentStatus(data);
  const authorizedAt = listingSelector.getAuthorizedAt(data);
  const agencyReviewStatus = listingSelector.getAgencyReviewStatus(data);
  const paymentLink = listingSelector.getPaymentLink(data);

  const onClickPayNow = () => {
    window.open(paymentLink, "_self");
  };

  return (
    <div className="xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-4 col-span-4 relative">
      <div className="global-border-radius global-box-shadow p-5 sticky top-10">
        <CustomText textClassName="text-primary text-lg font-bold pb-5">
          Booking Status
        </CustomText>

        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <CustomImage
              src={Images.stepCompletedIcon}
              imageStyle={{ width: 30, height: 30 }}
            />

            <CustomText textClassName="text-base font-bold pt-2">
              Step 1
            </CustomText>

            <div className="flex gap-3 items-center pb-2 pt-1">
              <CustomText textClassName="text-xs">Booking Status:</CustomText>
              <StatusLabel status={isEmpty(data) ? "" : "Completed"} />
            </div>
          </div>

          <div className="flex justify-center pb-5 pt-2">
            <div style={{ height: 50, borderLeft: "2px dashed #FDC8D4" }}></div>
          </div>

          <div className="flex flex-col items-center">
            <CustomImage
              src={
                !isEqual(paymentStatus, "Paid")
                  ? Images.step2Icon
                  : Images.paymentFailedIcon
              }
              imageStyle={{ width: 30, height: 30 }}
            />

            <CustomText
              textClassName={`text-base font-bold pt-2`}
            >
              Step 2
            </CustomText>

            <div className="flex gap-3 items-center pb-2 pt-1">
              <CustomText textClassName="text-xs">Payment Status:</CustomText>
              <StatusLabel status={paymentStatus} />
            </div>

            {isEqual(upperCase(paymentStatus), Constant.UNPAID) ? (
              <CustomButton
                buttonClassName="booking-overview-btn"
                buttonStyles={{ width: 150 }}
                buttonText={"Pay Now"}
                onClick={onClickPayNow}
              />
            ) : (
              <CustomText textClassName="step-section-infor-font">
                Payment Authorized At{" "}
                {moment(authorizedAt).format("YYYY-MM-DD HH:mm:ss")}
              </CustomText>
            )}
          </div>

          <div className="flex justify-center pb-5 pt-3">
            <div style={{ height: 50, borderLeft: "2px dashed #FDC8D4" }}></div>
          </div>

          <div className="flex flex-col items-center">
            <CustomImage
              src={
                isEqual(agencyReviewStatus, "Approved")
                  ? Images.paymentFailedIcon
                  : Images.step3Icon
              }
              imageStyle={{ width: 30, height: 30 }}
            />

            <CustomText textClassName="text-base font-bold pt-2">
              Step 3
            </CustomText>

            <div className="flex gap-3 items-center pb-2 pt-1">
              <CustomText textClassName="text-xs">
                Agency Review Status:
              </CustomText>
              <StatusLabel status={agencyReviewStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopBookingStatusSection;
