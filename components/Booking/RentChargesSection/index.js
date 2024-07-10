import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _ from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import Helper from "@/src/utils/Helper";

const RentChargesSection = ({
  openCharges,
  onClickOpenCharges,
  moveInFees,
  title,
}) => {
  const feesLists = listingSelector.getFeesItemOthers(moveInFees);
  const rentChargesLists = listingSelector.getFeesItemRentCharges(moveInFees);
  const rentCharges = listingSelector.getTotalCostRentCharges(moveInFees);
  const totalMoveInCost = listingSelector.getTotalCostFull(moveInFees);

  return (
    <div
      className="col-span-6 flex flex-col primaryWhite-bg-color p-4 global-box-shadow"
      style={{ borderRadius: 15 }}
    >
      <div className="flex items-center">
        <CustomImage src={Images.logoImage} width={40} height={40} />

        <div className="flex flex-col pl-2">
          <CustomText textClassName="font-bold primary-text font-size-large">
            {_.isEmpty(title) ? "-" : title}
          </CustomText>
          <CustomText textClassName="font-light font-size-small disable-text">
            Hosted by Spacify
          </CustomText>
        </div>
      </div>

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9", margin: "15px 0" }}
      ></div>

      <CustomText textClassName="font-bold pb-1">Move In Cost</CustomText>
      <CustomText textClassName="font-size-xsmall font-light leading-4 disable-text">
        Please check the payment breakdown below. Should you have any inquiries,
        please contact the owner or agent before proceeding with your payment.
      </CustomText>

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9" }}
      ></div>

      <div
        className={`collapse ${openCharges ? "collapse-open" : ""} pb-1`}
        style={{ borderRadius: 0 }}
      >
        <div
          className="collapse-title flex justify-between items-center cursor-pointer pb-1"
          style={{ padding: 0, minHeight: 20 }}
        >
          <div className="flex items-center" onClick={onClickOpenCharges}>
            <CustomText textClassName="font-bold pr-2">Rent Charges</CustomText>
            <CustomImage
              src={!openCharges ? Images.upIcon : Images.downIcon}
              width={13}
              height={13}
            />
          </div>

          <CustomText>RM{rentCharges}</CustomText>
        </div>
        <div className="collapse-content p-0">
          <div className="flex items-center pt-1">
            <CustomImage
              src={Images.infoIcon}
              height={20}
              width={20}
              className="cursor-pointer"
              onClick={() =>
                Helper.documentGetElementById("rent_charges_details").showModal()
              }
            />
            <CustomText
              styles={{ color: "#1E1E1E" }}
              textClassName="pl-2 font-light font-size-small"
            >
              Inclusion of:
            </CustomText>
          </div>

          {_.map(rentChargesLists, (rentChargesList, index) => {
            const label = listingSelector.getLabel(rentChargesList);
            const value = listingSelector.getFeeAmount(rentChargesList);

            return (
              <ul className="pl-7" key={index}>
                <li className="flex justify-between">
                  <CustomText
                    styles={{ color: "#1E1E1E" }}
                    textClassName="font-light font-size-small"
                  >
                    - {label}
                  </CustomText>
                  <CustomText
                    styles={{ color: "#1E1E1E" }}
                    textClassName="font-light font-size-small"
                  >
                    {`RM${value}`}
                  </CustomText>
                </li>
              </ul>
            );
          })}
        </div>
      </div>

      {_.isEmpty(feesLists)
        ? false
        : _.map(feesLists, (fessList, index) => {
            const label = listingSelector.getLabel(fessList);
            const value = listingSelector.getFeeAmount(fessList);

            return (
              <div
                className="flex justify-between items-center pb-1"
                key={index}
              >
                <CustomText textClassName="font-bold pr-2">{label}</CustomText>
                <CustomText>RM{value}</CustomText>
              </div>
            );
          })}

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9" }}
      ></div>

      <div className="flex justify-between items-center">
        <CustomText textClassName="font-bold pr-2">
          Total Move-in Cost
        </CustomText>
        <CustomText textClassName="primary-text font-bold">
          RM{totalMoveInCost}
        </CustomText>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="is_pay_partial"
            value="full"
            onClick={(e) => console.log(e.target.value)}
            className="radio booking-radio mr-2"
          />
          <CustomText>Pay in Full</CustomText>
        </div>

        <CustomText>RM{totalMoveInCost}</CustomText>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="is_pay_partial"
            value="partial"
            onClick={(e) => console.log(e.target.value)}
            className="radio booking-radio mr-2"
          />
          <CustomText>Pay in Partial</CustomText>
        </div>

        <CustomText>RM1,328.00</CustomText>
      </div>
    </div>
  );
};

export default RentChargesSection;
