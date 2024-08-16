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

export { getServerSideProps };

const MyReport = ({ id }) => {
  const router = useRouter();
  const monthQuery = get(
    router,
    ["query", "month"],
    moment().format("D-M-YYYY"),
  );

  const [loading, setLoading] = useState(false);
  const [reportDetail, setReportDetail] = useState(null);

  const month = reportSelector.getMonth(reportDetail);
  const property = reportSelector.getProperty(reportDetail);
  const unit = reportSelector.getUnit(reportDetail);
  const incomeList = reportSelector.getIncome(reportDetail);
  const totalIncome = reportSelector.getTotalIncome(reportDetail);
  const expenseList = reportSelector.getExpense(reportDetail);
  const totalExpense = reportSelector.getTotalExpense(reportDetail);
  const grandTotal = reportSelector.getGrandTotal(reportDetail);
  const pdf = reportSelector.getPdf(reportDetail);

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

  return (
    <div className="flex flex-col flex-1 ">
      <div className="body-container py-5 owner-bg-color">
        <div className={`flex items-center justify-between overflow-hidden`}>
          <div className="flex justify-center items-center">
            <div onClick={onClickGoBack} className="cursor-pointer">
              <CustomImage
                className={"me-5 cursor-pointer"}
                src={Images.leftIconWhite}
                imageStyle={{ width: 10 }}
              />
            </div>

            <CustomText
              textClassName={"font-bold white-text"}
              styles={{ fontSize: 18 }}
            >
              Statement Overview
            </CustomText>
          </div>

          <CustomImage
            src={Images.downloadWhiteIcon}
            imageStyle={{ width: 20, height: 20 }}
            onClick={onClickDownload}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 global-horizontal-padding py-4">
        <div className="global-box-shadow global-border-radius p-4 py-5">
          <div className="flex justify-between">
            <CustomText textClassName="font-bold primary-text">
              Monthly P&L Statement
            </CustomText>
            <CustomText>{isEmpty(month) ? "-" : month}</CustomText>
          </div>

          <div className="divider-line" style={{ margin: "10px 0" }}></div>

          <CustomText textClassName="disable-text font-size-xxsmall">
            Property
          </CustomText>

          <div className="divider-line" style={{ margin: "10px 0" }}></div>

          <CustomText textClassName="font-bold">
            {isEmpty(property) ? "-" : property}
          </CustomText>

          <div className="divider-line" style={{ margin: "10px 0" }}></div>

          <CustomText textClassName="disable-text font-size-xxsmall">
            Unit
          </CustomText>

          <div className="divider-line" style={{ margin: "10px 0" }}></div>

          <CustomText textClassName="font-bold">
            {isEmpty(unit) ? "-" : unit}
          </CustomText>

          <div
            className="divider-line"
            style={{ margin: "10px 0 24px 0" }}
          ></div>

          <CustomText textClassName="disable-text font-size-xxsmall">
            Income
          </CustomText>

          {isEmpty(incomeList) ? (
            false
          ) : (
            <div className="divider-line" style={{ margin: "10px 0" }}></div>
          )}

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

          <div className="divider-line" style={{ margin: "10px 0" }}></div>

          <div className="flex justify-between">
            <CustomText textClassName="font-bold">Total Income</CustomText>
            <CustomText textClassName="font-bold power-on-text">
              {isEmpty(totalIncome) ? "0" : totalIncome}
            </CustomText>
          </div>

          <div className="divider-line" style={{ margin: "10px 0 24px" }}></div>

          <CustomText textClassName="disable-text font-size-xxsmall">
            Expenses
          </CustomText>

          {isEmpty(expenseList) ? (
            false
          ) : (
            <div className="divider-line" style={{ margin: "10px 0" }}></div>
          )}

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

          <div className="divider-line" style={{ margin: "10px 0" }}></div>

          <div className="flex justify-between">
            <CustomText textClassName="font-bold">Total Expenses</CustomText>
            <CustomText textClassName="font-bold primary-text">
              {isEmpty(totalExpense) ? "0" : totalExpense}
            </CustomText>
          </div>

          <div className="divider-line" style={{ margin: "10px 0" }}></div>

          <div className="flex justify-between">
            <CustomText textClassName="font-bold">Grand Total</CustomText>
            <CustomText textClassName="font-bold power-on-text">
              {isEmpty(grandTotal) ? "0" : grandTotal}
            </CustomText>
          </div>

          <div className="divider-line" style={{ margin: "10px 0" }}></div>
        </div>
      </div>

      <LoadingOverlay loading={loading} />
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyReport));
