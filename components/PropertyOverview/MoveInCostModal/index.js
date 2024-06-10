import CustomModal from "@/components/CustomModal";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import * as listingSelector from "@/src/selectors/listing";

const MoveInCostModal = ({ openCharges, onClickOpenModalCharges, lists }) => {
  const feesLists = listingSelector.getFeesItemOthers(lists);
  const rentChargesLists = listingSelector.getFeesItemRentCharges(lists);
  const rentCharges = listingSelector.getTotalCostRentCharges(lists);
  const totalMoveInCost = listingSelector.getTotalCostFull(lists);

  const isRentChargesListEmpty = _.isEmpty(rentChargesLists);

  return (
    <CustomModal id="move_in_cost_modal">
      <div
        className={`collapse ${openCharges ? "collapse-open" : ""} pb-1`}
        style={{ borderRadius: 0 }}
      >
        <div
          className="collapse-title flex justify-between items-center pb-1"
          style={{ padding: 0, minHeight: 20 }}
        >
          <div
            className="flex items-center cursor-pointer"
            onClick={
              isRentChargesListEmpty ? () => {} : onClickOpenModalCharges
            }
          >
            <CustomText textClassName="font-bold pr-2">Rent Charges</CustomText>
            {isRentChargesListEmpty ? (
              false
            ) : (
              <CustomImage
                src={!openCharges ? Images.upIcon : Images.downIcon}
                width={13}
                height={13}
              />
            )}
          </div>

          <CustomText>
            RM{_.isEmpty(rentCharges) ? "0" : rentCharges}
          </CustomText>
        </div>
        <div className="collapse-content p-0">
          <div className="flex items-center pt-1">
            <CustomImage
              src={Images.infoIcon}
              height={20}
              width={20}
              onClick={() =>
                document.getElementById("rent_charges_details").showModal()
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
            const amount = listingSelector.getAmount(rentChargesList);

            return (
              <ul className="pl-7" key={index}>
                <li className="flex justify-between">
                  <CustomText
                    styles={{ color: "#1E1E1E" }}
                    textClassName="font-light font-size-small"
                  >
                    - {_.isEmpty(label) ? "-" : label}
                  </CustomText>
                  <CustomText
                    styles={{ color: "#1E1E1E" }}
                    textClassName="font-light"
                  >
                    {_.isEmpty(amount) ? "0" : amount}
                  </CustomText>
                </li>
              </ul>
            );
          })}
        </div>
      </div>

      {_.isEmpty(feesLists)
        ? false
        : _.map(feesLists, (feesList, index) => {
            const label = listingSelector.getLabel(feesList);
            const amount = listingSelector.getAmount(feesList);

            return (
              <div
                className="flex justify-between items-center pb-1"
                key={index}
              >
                <CustomText textClassName="font-bold pr-2">
                  {_.isEmpty(label) ? "-" : label}
                </CustomText>
                <CustomText>RM{_.isEmpty(amount) ? "0" : amount}</CustomText>
              </div>
            );
          })}

      {/*<div className="flex justify-between items-center pb-1">*/}
      {/*  <CustomText textClassName="font-bold pr-2">Move In Fee</CustomText>*/}
      {/*  <CustomText>RM300.00</CustomText>*/}
      {/*</div>*/}
      {/*<div className="flex justify-between items-center pb-1">*/}
      {/*  <CustomText textClassName="font-bold pr-2">Security Deposit</CustomText>*/}
      {/*  <CustomText>RM1,400.00</CustomText>*/}
      {/*</div>*/}
      {/*<div className="flex justify-between items-center">*/}
      {/*  <CustomText textClassName="font-bold pr-2">Key Deposit</CustomText>*/}
      {/*  <CustomText>RM200.00</CustomText>*/}
      {/*</div>*/}

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9", marginTop: 16, marginBottom: 20 }}
      ></div>

      <div className="flex justify-between items-center">
        <CustomText textClassName="font-bold pr-2">
          Total Move-in Cost
        </CustomText>
        <CustomText textClassName="primary-text font-bold">
          RM{_.isEmpty(totalMoveInCost) ? "0" : totalMoveInCost}
        </CustomText>
      </div>
    </CustomModal>
  );
};

export default MoveInCostModal;
