import CustomModal from "@/components/CustomModal";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _, { isEqual } from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import Helper from "@/src/utils/Helper";
import { useEffect, useState } from "react";
import RentChargesComponent from "@/components/Booking/RentChargesComponent";

const MoveInCostModal = ({
  openModalFirstMonthCharges,
  openModalLastMonthCharges,
  onClickOpenModalFirstMonthCharges,
  onClickOpenModalLastMonthCharges,
  lists,
}) => {
  const firstMonthRentCharges = listingSelector.getFirstMonthRentCharges(lists);
  const lastMonthRentCharges = listingSelector.getLastMonthRentCharges(lists);
  const othersList = listingSelector.getOthers(lists);
  const totalMoveInCostFull = listingSelector.getTotalCostFull(lists);
  const totalMoveInCostPartial = listingSelector.getTotalCostPartial(lists);
  const totalMoveInCostFirstMonth =
    listingSelector.getTotalCostFirstMonthRentCharges(lists);
  const totalMoveInCostLastMonth =
    listingSelector.getTotalCostLastMonthRentCharges(lists);

  return (
    <CustomModal id="move_in_cost_modal">
      <RentChargesComponent
        title="First Month Rent Charges"
        onClickOpenCharges={onClickOpenModalFirstMonthCharges}
        openCharges={openModalFirstMonthCharges}
        rentChargesAmount={totalMoveInCostFirstMonth}
        rentChargesLists={firstMonthRentCharges}
      />

      <RentChargesComponent
        title="Last Month Rent Charges"
        onClickOpenCharges={onClickOpenModalLastMonthCharges}
        openCharges={openModalLastMonthCharges}
        rentChargesAmount={totalMoveInCostLastMonth}
        rentChargesLists={lastMonthRentCharges}
      />

      {_.isEmpty(othersList)
        ? false
        : _.map(othersList, (feesList, index) => {
            const label = listingSelector.getLabel(feesList);
            const amount = listingSelector.getFeeAmount(feesList);

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

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9", marginTop: 16, marginBottom: 20 }}
      ></div>

      <CustomText textClassName="font-bold pr-2 pb-1">
        Total Move-in Cost
      </CustomText>

      <div className="flex justify-between items-center">
        <CustomText textClassName="pr-2">Full Amount</CustomText>
        <CustomText textClassName="primary-text font-bold">
          RM{_.isEmpty(totalMoveInCostFull) ? "0" : totalMoveInCostFull}
        </CustomText>
      </div>

      <div className="flex justify-between items-center">
        <CustomText textClassName="pr-2">Partial Amount</CustomText>
        <CustomText textClassName="primary-text font-bold">
          RM{_.isEmpty(totalMoveInCostPartial) ? "0" : totalMoveInCostPartial}
        </CustomText>
      </div>
    </CustomModal>
  );
};

export default MoveInCostModal;
