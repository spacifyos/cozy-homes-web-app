import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { get, isEmpty, map } from "lodash";
import moment from "moment";
import * as reportSelector from "@/src/selectors/report";
import AuthManager from "@/src/utils/AuthManager";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";
import { NextSeo } from "next-seo";
import {
  getCurrentMonthPayoutAmount,
  getCurrentMonthPayoutIsAmountNegative,
  getOutstanding,
  getTotalNetPayoutAmount,
  getTotalNetPayoutIsAmountNegative,
  getTotalOutstandingAmount,
  getTotalOutstandingIsAmountNegative,
  getTotalPayoutAIsAmountNegative,
  getTotalPayoutAmount,
} from "@/src/selectors/report";
import CustomLabelValue from "@/components/CustomLabelValue";
import Helper from "@/src/utils/Helper";
import CustomModal from "@/components/CustomModal";

export { getServerSideProps };

const MyReport = ({ id }) => {
  const router = useRouter();
  const monthQuery = get(
    router,
    ["query", "month"],
    moment().startOf("month").format("DD-MM-YYYY"),
  );

  const [loading, setLoading] = useState(false);
  const [reportDetail, setReportDetail] = useState(null);

  const month = reportSelector.getMonth(reportDetail);
  const property = reportSelector.getProperty(reportDetail);
  const unit = reportSelector.getUnit(reportDetail);
  const incomeList = reportSelector.getIncome(reportDetail);
  const totalIncome = reportSelector.getTotalIncome(reportDetail);
  const expenseList = reportSelector.getExpense(reportDetail);
  const outstandingList = reportSelector.getOutstanding(reportDetail);
  const totalExpense = reportSelector.getTotalExpense(reportDetail);
  const grandTotal = reportSelector.getGrandTotal(reportDetail);
  const pdf = reportSelector.getPdf(reportDetail);
  const carryForwardDeductionAmount =
    reportSelector.getCarryForwardDeductionAmount(reportDetail);
  const carryForwardDeductionIsAmountNegative =
    reportSelector.getCarryForwardDeductionIsAmountNegative(reportDetail);
  const currentMonthPayoutAmount =
    reportSelector.getCurrentMonthPayoutAmount(reportDetail);
  const currentMonthPayoutIsAmountNegative =
    reportSelector.getCurrentMonthPayoutIsAmountNegative(reportDetail);
  const totalNetPayoutAmount =
    reportSelector.getTotalNetPayoutAmount(reportDetail);
  const totalNetPayoutIsAmountNegative =
    reportSelector.getTotalNetPayoutIsAmountNegative(reportDetail);
  const totalOutstandingAmount =
    reportSelector.getTotalOutstandingAmount(reportDetail);
  const totalOutstandingIsAmountNegative =
    reportSelector.getTotalOutstandingIsAmountNegative(reportDetail);
  const currentMonthPNLAmount =
    reportSelector.getCurrentMonthPNLAmount(reportDetail);
  const currentMonthPNLIsAmountNegative =
    reportSelector.getCurrentMonthPNLIsAmountNegative(reportDetail);

  useEffect(() => {
    fetchOwnerReportListing();
  }, [monthQuery]);

  const fetchOwnerReportListing = async () => {
    await apiRequest.getOwnerReportOverviewRequest(
      id,
      monthQuery,
      setLoading,
      fetchSuccessCallback,
    );
  };

  const fetchSuccessCallback = (res) => {
    setReportDetail(res);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickDownload = async () => {
    const filename = property + " - " + month;
    const headers = {
      "Content-Type": "application/json",
      // AGSC: gallerySecretKey,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    if (!isEmpty(pdf)) {
      await apiRequest.downloadFileRequest(pdf, headers, filename);
    }
  };

  const onClickOpenInformationModal = () => {
    Helper.documentGetElementById("report_information_modal").showModal();
  };

  return (
    <CustomOwnerHeader
      className="pb-0"
      rightButtonIcon={Images.downloadWhiteIcon}
      onClickRightButton={onClickDownload}
      title="Statement Overview"
      onClickGoBack={onClickGoBack}
    >
      <NextSeo title="Statement Overview | Owner - Spacify Asia" />

      <div className="bg-color flex flex-col flex-1 global-horizontal-padding py-5">
        <div className="flex justify-between pb-2">
          <div className="flex justify-center items-center">
            <CustomText textClassName="font-bold primary-text pr-2">
              Monthly P&L Statement
            </CustomText>

            <CustomImage
              onClick={onClickOpenInformationModal}
              src={Images.infoIconBlack}
              imageStyle={{ width: 16, height: 16 }}
            />
          </div>
          <CustomText>{isEmpty(month) ? "-" : month}</CustomText>
        </div>

        <CustomLabelValue
          label="Property"
          value={isEmpty(property) ? "-" : property}
        />

        <CustomLabelValue label="Unit" value={isEmpty(unit) ? "-" : unit} />

        <div className="divider-line" style={{ margin: "10px 0 18px 0" }}></div>

        <CustomText textClassName="disable-text font-size-xsmall pb-1">
          Income
        </CustomText>

        <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5 mb-4">
          {isEmpty(incomeList)
            ? false
            : map(incomeList, (income) => {
                const label = reportSelector.getLabel(income);
                const items = reportSelector.getItems(income);

                return (
                  <div>
                    <CustomText textClassName="font-bold pb-2">
                      {isEmpty(label) ? "-" : label}
                    </CustomText>

                    {map(items, (item) => {
                      const title = reportSelector.getTitle(item);
                      const period = reportSelector.getPeriod(item);
                      const amount = reportSelector.getAmount(item);

                      return (
                        <div className="flex justify-between">
                          <div className="flex items-start justify-center">
                            <div
                              className="cancelled-bg-color rounded mr-1.5 mt-2"
                              style={{ width: 3, height: 3 }}
                            ></div>
                            <div className="">
                              <CustomText textClassName="disable-text font-size-xsmall">
                                {isEmpty(title) ? "-" : title}
                              </CustomText>
                              <CustomText textClassName="disable-text font-size-xsmall leading-1">
                                {isEmpty(period) ? "-" : period}
                              </CustomText>
                            </div>
                          </div>

                          <CustomText textClassName="disable-text font-size-xsmall">
                            {isEmpty(amount) ? "-" : amount}
                          </CustomText>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

          {isEmpty(incomeList) ? (
            false
          ) : (
            <div className="divider-line" style={{ margin: "10px 0" }}></div>
          )}

          <div className="flex justify-between">
            <CustomText textClassName="font-bold">Total Income</CustomText>
            <CustomText textClassName="font-bold power-on-text">
              {isEmpty(totalIncome) ? "0" : totalIncome}
            </CustomText>
          </div>
        </div>

        <CustomText textClassName="disable-text font-size-xsmall pb-1">
          Expenses
        </CustomText>

        <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5 mb-4">
          {isEmpty(expenseList)
            ? false
            : map(expenseList, (expense) => {
                const label = reportSelector.getLabel(expense);
                const amount = reportSelector.getAmount(expense);
                const description = reportSelector.getDescription(expense);

                return (
                  <div className="flex justify-between items-center">
                    <div>
                      <CustomText textClassName="font-bold">
                        {isEmpty(label) ? "-" : label}
                      </CustomText>
                      <CustomText textClassName="disable-text font-size-xsmall">
                        {isEmpty(description) ? "-" : description}
                      </CustomText>
                    </div>

                    <CustomText textClassName="disable-text font-size-xsmall">
                      {isEmpty(amount) ? "0" : amount}
                    </CustomText>
                  </div>
                );
              })}

          {isEmpty(expenseList) ? (
            false
          ) : (
            <div className="divider-line" style={{ margin: "10px 0" }}></div>
          )}

          <div className="flex justify-between">
            <CustomText textClassName="font-bold">Total Expenses</CustomText>
            <CustomText textClassName="font-bold primary-text">
              {isEmpty(totalExpense) ? "0" : totalExpense}
            </CustomText>
          </div>
        </div>

        {isEmpty(outstandingList) ? (
          false
        ) : (
          <CustomText textClassName="disable-text font-size-xsmall pb-1">
            Outstanding
          </CustomText>
        )}

        {isEmpty(outstandingList) ? (
          false
        ) : (
          <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5 mb-4">
            {map(outstandingList, (outstanding) => {
              const label = reportSelector.getLabel(outstanding);
              const amount = reportSelector.getAmount(outstanding);
              const description = reportSelector.getDescription(outstanding);

              return (
                <div className="flex justify-between items-center pb-1">
                  <div>
                    <CustomText textClassName="font-bold">
                      {isEmpty(label) ? "-" : label}
                    </CustomText>
                    <CustomText textClassName="disable-text font-size-xsmall">
                      {isEmpty(description) ? "-" : description}
                    </CustomText>
                  </div>

                  <CustomText textClassName="disable-text font-size-xsmall">
                    {isEmpty(amount) ? "0" : amount}
                  </CustomText>
                </div>
              );
            })}

            {isEmpty(outstandingList) ? (
              false
            ) : (
              <div className="divider-line" style={{ margin: "10px 0" }}></div>
            )}

            <div className="flex justify-between">
              <CustomText textClassName="font-bold">
                Total Outstanding
              </CustomText>
              <CustomText
                textClassName={`font-bold ${totalOutstandingIsAmountNegative ? "primary-text" : "power-on-text"}`}
              >
                {isEmpty(totalOutstandingAmount) ? "0" : totalOutstandingAmount}
              </CustomText>
            </div>
          </div>
        )}

        {isEmpty(totalIncome) ? (
          false
        ) : (
          <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5 mb-4">
            <div className="flex justify-between">
              <CustomText textClassName="font-bold">Total Income</CustomText>
              <CustomText textClassName={`font-bold power-on-text`}>
                {totalIncome}
              </CustomText>
            </div>
          </div>
        )}

        {isEmpty(totalExpense) ? (
          false
        ) : (
          <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5 mb-4">
            <div className="flex justify-between">
              <CustomText textClassName="font-bold">Total Expense</CustomText>
              <CustomText textClassName={`font-bold primary-text`}>
                {totalExpense}
              </CustomText>
            </div>
          </div>
        )}

        {isEmpty(currentMonthPNLAmount) ? (
          false
        ) : (
          <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5 mb-4">
            <div className="flex justify-between">
              <CustomText textClassName="font-bold">
                Current Month P&L
              </CustomText>
              <CustomText
                textClassName={`font-bold ${currentMonthPNLIsAmountNegative ? "primary-text" : "power-on-text"}`}
              >
                {currentMonthPNLAmount}
              </CustomText>
            </div>
          </div>
        )}

        {isEmpty(carryForwardDeductionAmount) ? (
          false
        ) : (
          <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5 mb-4">
            <div className="flex justify-between">
              <CustomText textClassName="font-bold">
                Carry Forward Deduction
              </CustomText>
              <CustomText
                textClassName={`font-bold ${carryForwardDeductionIsAmountNegative ? "primary-text" : "power-on-text"}`}
              >
                {carryForwardDeductionAmount}
              </CustomText>
            </div>
          </div>
        )}

        {isEmpty(currentMonthPayoutAmount) ? (
          false
        ) : (
          <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5 mb-4">
            <div className="flex justify-between">
              <CustomText textClassName="font-bold">
                Current Month Payout
              </CustomText>
              <CustomText
                textClassName={`font-bold ${currentMonthPayoutIsAmountNegative ? "primary-text" : "power-on-text"}`}
              >
                {currentMonthPayoutAmount}
              </CustomText>
            </div>
          </div>
        )}

        {isEmpty(totalNetPayoutAmount) ? (
          false
        ) : (
          <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5">
            <div className="flex justify-between">
              <CustomText textClassName="font-bold">
                Total Net Payout
              </CustomText>
              <CustomText
                textClassName={`font-bold ${totalNetPayoutIsAmountNegative ? "primary-text" : "power-on-text"}`}
              >
                {totalNetPayoutAmount}
              </CustomText>
            </div>
          </div>
        )}

        {isEmpty(grandTotal) ? (
          false
        ) : (
          <div className="primaryWhite-bg-color global-box-shadow global-border-radius p-4 py-5">
            <div className="flex justify-between">
              <CustomText textClassName="font-bold">Grand Total</CustomText>
              <CustomText textClassName="font-bold">{grandTotal}</CustomText>
            </div>
          </div>
        )}
      </div>

      <CustomModal id="report_information_modal">
        <CustomText textClassName="font-bold pb-4">
          How to Read Your Profit and Loss Report
        </CustomText>

        <CustomText textClassName="font-bold pb-2">Total Income</CustomText>
        <CustomText textClassName="pb-4">
          This section reflects all rental payments received during the
          specified month. It includes both the current month’s rental paid
          within the same month as well as any outstanding rentals that were
          cleared during the payout month.
        </CustomText>

        <CustomText textClassName="font-bold pb-2">Total Expenses</CustomText>
        <CustomText textClassName="pb-4">
          This section outlines all expenses incurred during the payout month.
          It covers costs such as maintenance, repairs, or any other charges
          deducted from your income.
        </CustomText>

        <CustomText textClassName="font-bold pb-2">
          Total Outstanding
        </CustomText>
        <CustomText textClassName="pb-4">
          This section displays the total amount of rent still owed by tenants,
          as of the end of the payout month. It helps you track any unpaid
          rentals for future reference.
        </CustomText>

        <CustomText textClassName="font-bold pb-2">
          Current Month P&L (Profit & Loss)
        </CustomText>
        <CustomText textClassName="pb-4">
          This section is calculated by subtracting Total Expenses from Total
          Income for the payout month. It gives you an overview of your profit
          or loss during the current month.
        </CustomText>

        <CustomText textClassName="font-bold pb-2">
          Carry Forward Deduction
        </CustomText>
        <CustomText textClassName="pb-4">
          This section shows any deductions carried over from the previous
          month’s Payout Report. These are typically unresolved amounts that
          affect your current month’s balance.
        </CustomText>

        <CustomText textClassName="font-bold">Current Month Payout</CustomText>
        <CustomText textClassName="pb-4">
          This section is determined by adding the Current Month P&L to the
          Carry Forward Deduction. It reflects the payout for the current month,
          accounting for any past adjustments.
        </CustomText>

        <CustomText textClassName="font-bold">Total Net Payout</CustomText>
        <CustomText textClassName="pb-2">
          This section displays the final net payout for the month. If the
          Current Month Payout is positive, it will match the net payout.
          However, if the Current Month Payout is negative, the net payout will
          be zero.
        </CustomText>
      </CustomModal>

      <LoadingOverlay loading={loading} />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyReport));
