import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import moment from "moment";
import StatusLabel from "@/components/StatusLabel";
import Constant from "@/src/utils/Constant";

const StepSection = ({ t, paymentSuccess, data }) => {
  const createAt = listingSelector.getCreatedAt(data);
  const paymentStatus = listingSelector.getPaymentStatus(data);
  const authorizedAt = listingSelector.getAuthorizedAt(data);
  const agencyReviewStatus = listingSelector.getAgencyReviewStatus(data);
  const paymentLink = listingSelector.getPaymentLink(data);
  const onClickPayNow = () => {
    window.open(paymentLink, "_self");
  };

  const isPayment = _.isEqual(paymentSuccess, true);

  return (
    <div className="global-box-shadow global-border-radius primaryWhite-bg-color p-7">
      <div className="flex flex-row items-start gap-2 ">
        <CustomImage
          src={Images.stepCompleteIcon}
          imageStyle={{ width: "30px", height: "30px" }}
        />
        <div className="flex flex-col">
          <CustomText textClassName="step-section-step-font">
            {t("bookingOverview.step1")}
          </CustomText>
          <div className="leading-5">
            <CustomText textClassName="font-size-xsmall">
              {t("bookingOverview.booking")}
            </CustomText>
            <div className="flex gap-3 items-center pb-2 pt-1">
              <CustomText textClassName="font-size-xsmall">
                {t("bookingOverview.status")}
              </CustomText>
              <StatusLabel status={_.isEmpty(data) ? "" : "Completed"} />
            </div>
            <CustomText textClassName="step-section-infor-font">
              {t("bookingOverview.bookingCreatedAt")}{" "}
              {moment(createAt).format("YYYY-MM-DD HH:mm:ss")}
            </CustomText>
          </div>
        </div>
      </div>
      <div className="divider-line"></div>
      <div className="flex gap-2">
        <CustomImage
          src={
            _.isEqual(paymentSuccess, true)
              ? Images.step2Icon
              : Images.stepCompleteIcon
          }
          imageStyle={{ width: "30px", height: "30px" }}
        />
        <div className="flex flex-col ">
          <CustomText
            textClassName={`step-section-step-font ${_.isEqual(paymentSuccess, true) ? "disable-text" : ""}  py-2`}
          >
            {t("bookingOverview.step2")}
          </CustomText>
          <CustomText textClassName="font-size-xsmall">
            {t("bookingOverview.payment")}
          </CustomText>
          <div className="flex gap-3 items-center pb-2 pt-1">
            <CustomText textClassName="font-size-xsmall">
              {t("bookingOverview.status")}
            </CustomText>
            <StatusLabel status={paymentStatus} />
          </div>
          {_.isEqual(_.upperCase(paymentStatus), Constant.UNPAID) ? (
            <CustomButton
              buttonClassName="booking-overview-btn"
              buttonText={t("bookingOverview.payNow")}
              onClick={onClickPayNow}
            />
          ) : (
            <CustomText textClassName="step-section-infor-font">
              {t("bookingOverview.paymentAuthorizedAt")}{" "}
              {moment(authorizedAt).format("YYYY-MM-DD HH:mm:ss")}
            </CustomText>
          )}
        </div>
      </div>
      <div className="divider-line"></div>
      <div className="flex gap-2">
        <CustomImage
          src={Images.step3Icon}
          imageStyle={{ width: "30px", height: "30px" }}
        />
        <div className="flex flex-col">
          <CustomText textClassName="font-size-xlarge font-bold disable-text py-2">
            {t("bookingOverview.step3")}
          </CustomText>
          <CustomText textClassName="font-size-xsmall">
            {t("bookingOverview.agencyReview")}
          </CustomText>
          <div className="flex gap-3 items-center pt-1">
            <CustomText textClassName="font-size-xsmall">
              {t("bookingOverview.status")}
            </CustomText>
            <StatusLabel status={agencyReviewStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSection;
