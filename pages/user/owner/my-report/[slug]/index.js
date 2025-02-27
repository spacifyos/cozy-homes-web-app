import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
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
import { NextSeo } from "next-seo";
import Helper from "@/src/utils/Helper";
import CustomImage from "@/components/CustomImage";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopModal from "@/components/DesktopModal";

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
    <div className="min-h-screen bg-white">
      <NextSeo title="PnL Statement Overview | Owner - Spacify Asia" />
      <DesktopLayout
        loading={loading}
        rightButtonIcon={Images.downloadIconBlack}
        onClickRightButton={onClickDownload}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul className="flex-wrap">
                <li>
                  <a href={"/user/owner"}>
                    <CustomText textClassName="text-base text-disable">
                      My Property
                    </CustomText>
                  </a>
                </li>
                <li>
                  <a href={"/user/owner/my-report"}>
                    <CustomText textClassName="text-base text-disable">
                      My Report
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base font-bold">
                    {month}
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIconBlack}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">{month}</CustomText>
            </div>
          </div>
        }
      >
        <div className="bg-white flex flex-col flex-1 p-10 h-full border global-border-radius">
          <div className="flex justify-between pb-2">
            <div className="flex justify-center items-center">
              <CustomText textClassName="font-bold text-primary pr-2">
                Monthly P&L Statement
              </CustomText>

              <CustomImage
                onClick={onClickOpenInformationModal}
                src={Images.infoIconBlack}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
            <CustomText>{isEmpty(month) ? "-" : month}</CustomText>
          </div>

          <div className="divider-line"></div>

          <CustomText textClassName="text-disable xl:text-base lg:text-base md:text-base sm:text-sm text-sm">
            Property
          </CustomText>

          <div className="divider-line"></div>

          <CustomText textClassName="pb-10 xl:text-base lg:text-base md:text-base sm:text-sm text-sm">
            {isEmpty(property) ? "" : property}, {isEmpty(unit) ? "" : unit}
          </CustomText>

          <div className="pb-10">
            <CustomText textClassName="text-disable xl:text-base lg:text-base md:text-base sm:text-sm text-sm">
              Rental Income
            </CustomText>

            <div className="divider-line"></div>

            {isEmpty(incomeList) ? (
              <div className="flex justify-center">
                <CustomText textClassName="text-disable xl:text-base lg:text-base md:text-base sm:text-sm text-sm">
                  No Rental Income
                </CustomText>
              </div>
            ) : (
              map(incomeList, (income) => {
                const label = reportSelector.getLabel(income);
                const items = reportSelector.getItems(income);

                return (
                  <div>
                    <CustomText textClassName="pb-2">
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
                              className="bg-disable rounded mr-1.5 mt-2"
                              style={{ width: 3, height: 3 }}
                            ></div>
                            <div className="">
                              <CustomText textClassName="text-disable text-xs">
                                {isEmpty(title) ? "-" : title}
                              </CustomText>
                              <CustomText textClassName="text-disable text-xs leading-1">
                                {isEmpty(period) ? "-" : period}
                              </CustomText>
                            </div>
                          </div>

                          <CustomText textClassName="text-disable text-xs">
                            {isEmpty(amount) ? "-" : amount}
                          </CustomText>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}

            <div className="divider-line"></div>

            <div className="flex justify-between">
              <CustomText textClassName="font-bold">
                Total Rental Income
              </CustomText>
              <CustomText textClassName="font-bold text-aqua">
                {isEmpty(totalIncome) ? "0" : totalIncome}
              </CustomText>
            </div>

            <div className="divider-line"></div>
          </div>

          <div className="pb-10">
            <CustomText textClassName="text-disable xl:text-base lg:text-base md:text-base sm:text-sm text-sm">
              Expenses
            </CustomText>

            <div className="divider-line"></div>

            {isEmpty(expenseList) ? (
              <div className="flex justify-center">
                <CustomText textClassName="text-disable xl:text-base lg:text-base md:text-base sm:text-sm text-sm">
                  No Expenses
                </CustomText>
              </div>
            ) : (
              map(expenseList, (expense) => {
                const label = reportSelector.getLabel(expense);
                const amount = reportSelector.getAmount(expense);
                const description = reportSelector.getDescription(expense);

                return (
                  <div className="flex justify-between items-center">
                    <div>
                      <CustomText textClassName="pb-2">
                        {isEmpty(label) ? "-" : label}
                      </CustomText>
                      <CustomText textClassName="text-disable text-xs">
                        {isEmpty(description) ? "-" : description}
                      </CustomText>
                    </div>

                    <CustomText textClassName="text-disable text-xs">
                      {isEmpty(amount) ? "0" : amount}
                    </CustomText>
                  </div>
                );
              })
            )}

            <div className="divider-line"></div>

            <div className="flex justify-between">
              <CustomText textClassName="font-bold">Total Expenses</CustomText>
              <CustomText textClassName="font-bold text-primary">
                {isEmpty(totalExpense) ? "0" : totalExpense}
              </CustomText>
            </div>

            <div className="divider-line"></div>
          </div>

          <div className="pb-10">
            <CustomText textClassName="text-disable xl:text-base lg:text-base md:text-base sm:text-sm text-sm">
              Outstanding
            </CustomText>

            <div className="divider-line"></div>

            {isEmpty(outstandingList) ? (
              <div className="flex justify-center">
                <CustomText textClassName="text-disable xl:text-base lg:text-base md:text-base sm:text-sm text-sm">
                  No Outstanding
                </CustomText>
              </div>
            ) : (
              map(outstandingList, (outstanding) => {
                const label = reportSelector.getLabel(outstanding);
                const amount = reportSelector.getAmount(outstanding);
                const description = reportSelector.getDescription(outstanding);
                const title = reportSelector.getTitle(outstanding);

                return (
                  <div className="flex justify-between items-center pb-1">
                    <div>
                      <CustomText textClassName="pb-2">
                        {isEmpty(label) ? "-" : label}
                      </CustomText>

                      <div className="flex items-start justify-center">
                        <div
                          className="bg-disable rounded mr-1.5 mt-2"
                          style={{ width: 3, height: 3 }}
                        ></div>
                        <div className="">
                          <CustomText textClassName="text-disable text-xs">
                            {isEmpty(title) ? "-" : title}
                          </CustomText>
                          <CustomText textClassName="text-disable text-xs leading-1">
                            {isEmpty(description) ? "-" : description}
                          </CustomText>
                        </div>
                      </div>
                    </div>

                    <CustomText textClassName="text-disable text-xs">
                      {isEmpty(amount) ? "0" : amount}
                    </CustomText>
                  </div>
                );
              })
            )}

            <div className="divider-line"></div>

            <div className="flex justify-between">
              <CustomText textClassName="font-bold">
                Total Outstanding
              </CustomText>
              <CustomText
                textClassName={`font-bold ${totalOutstandingIsAmountNegative ? "text-primary" : "text-aqua"}`}
              >
                {isEmpty(totalOutstandingAmount) ? "0" : totalOutstandingAmount}
              </CustomText>
            </div>

            <div className="divider-line"></div>
          </div>

          <div className="flex justify-between">
            <CustomText textClassName="font-bold">Current Month P&L</CustomText>
            <CustomText
              textClassName={`font-bold ${currentMonthPNLIsAmountNegative ? "text-primary" : "text-aqua"}`}
            >
              {isEmpty(currentMonthPNLAmount) ? "0" : currentMonthPNLAmount}
            </CustomText>
          </div>

          <div className="divider-line"></div>

          <div className="flex justify-between">
            <CustomText textClassName="font-bold">
              Carry Forward Deduction
            </CustomText>
            <CustomText
              textClassName={`font-bold ${carryForwardDeductionIsAmountNegative ? "text-primary" : "text-aqua"}`}
            >
              {isEmpty(carryForwardDeductionAmount)
                ? "0"
                : carryForwardDeductionAmount}
            </CustomText>
          </div>

          <div className="divider-line"></div>

          <div className="flex justify-between">
            <CustomText textClassName="font-bold">
              Current Month Payout
            </CustomText>
            <CustomText
              textClassName={`font-bold ${currentMonthPayoutIsAmountNegative ? "text-primary" : "text-aqua"}`}
            >
              {isEmpty(currentMonthPayoutAmount)
                ? "0"
                : currentMonthPayoutAmount}
            </CustomText>
          </div>

          <div className="divider-line"></div>

          <div className="flex justify-between">
            <CustomText textClassName="font-bold">Total Net Payout</CustomText>
            <CustomText
              textClassName={`font-bold ${totalNetPayoutIsAmountNegative ? "text-primary" : "text-aqua"}`}
            >
              {isEmpty(totalNetPayoutAmount) ? "0" : totalNetPayoutAmount}
            </CustomText>
          </div>

          <div className="divider-line"></div>
        </div>

        <DesktopModal id="report_information_modal">
          <div className="p-6">
            <div className="flex items-center">
              <CustomText textClassName="flex-1 text-center text-base font-bold">
                How to Read Your Profit and Loss Report
              </CustomText>
              <form method="dialog" className={`flex justify-end`}>
                <button className="btn btn-sm btn-circle btn-ghost right-2">
                  <CustomImage
                    className="xl:w-4 lg:w-4 md:w-4 sm:w-3 w-3"
                    src={Images.closeIconBlack}
                  />
                </button>
              </form>
            </div>

            <div className="divider-line"></div>

            <CustomText textClassName="font-bold pb-2">Total Income</CustomText>
            <CustomText textClassName="pb-4 font-light">
              This section reflects all rental payments received during the
              specified month. It includes both the current month’s rental paid
              within the same month as well as any outstanding rentals that were
              cleared during the payout month.
            </CustomText>

            <CustomText textClassName="font-bold pb-2">
              Total Expenses
            </CustomText>
            <CustomText textClassName="pb-4 font-light">
              This section outlines all expenses incurred during the payout
              month. It covers costs such as maintenance, repairs, or any other
              charges deducted from your income.
            </CustomText>

            <CustomText textClassName="font-bold pb-2">
              Total Outstanding
            </CustomText>
            <CustomText textClassName="pb-4 font-light">
              This section displays the total amount of rent still owed by
              tenants, as of the end of the payout month. It helps you track any
              unpaid rentals for future reference.
            </CustomText>

            <CustomText textClassName="font-bold pb-2">
              Current Month P&L (Profit & Loss)
            </CustomText>
            <CustomText textClassName="pb-4 font-light">
              This section is calculated by subtracting{" "}
              <span className="font-bold">Total Expenses</span> from{" "}
              <span className="font-bold">Total Income</span> for the payout
              month. It gives you an overview of your profit or loss during the
              current month.
            </CustomText>

            <CustomText textClassName="font-bold pb-2">
              Carry Forward Deduction
            </CustomText>
            <CustomText textClassName="pb-4 font-light">
              This section shows any deductions carried over from the previous
              month’s Payout Report. These are typically unresolved amounts that
              affect your current month’s balance.
            </CustomText>

            <CustomText textClassName="font-bold pb-2">
              Current Month Payout
            </CustomText>
            <CustomText textClassName="pb-4 font-light">
              This section is determined by adding the{" "}
              <span className="font-bold">Current Month P&L</span> to the{" "}
              <span className="font-bold">Carry Forward Deduction</span>. It
              reflects the payout for the current month, accounting for any past
              adjustments.
            </CustomText>

            <CustomText textClassName="font-bold pb-2">
              Total Net Payout
            </CustomText>
            <CustomText textClassName="font-light">
              This section displays the final net payout for the month. If the{" "}
              <span className="font-bold text-black">Current Month Payout</span>{" "}
              is positive, it will match the net payout. However, if the{" "}
              <span className="font-bold">Current Month Payout</span> is
              negative, the net payout will be zero.
            </CustomText>
          </div>
        </DesktopModal>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyReport));
