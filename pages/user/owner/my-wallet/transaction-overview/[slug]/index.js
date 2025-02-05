import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";
import { NextSeo } from "next-seo";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import * as walletSelector from "@/src/selectors/wallet";
import { isEmpty } from "lodash";
import moment from "moment/moment";
import Constant from "@/src/utils/Constant";
import { getInvoiceNumber } from "@/src/selectors/wallet";

export { getServerSideProps };

const DetailLabel = ({ title, value, highlight = false }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <CustomText textClassName="text-sm">{title}</CustomText>
      <CustomText
        textClassName={`text-end text-sm col-span-2 ${highlight ? "text-primary" : ""}`}
      >
        {value}
      </CustomText>
    </div>
  );
};

const TransactionOverview = ({ id }) => {
  const router = useRouter();

  const [walletTransactionDetail, setWalletTransactionDetail] = useState(null);
  const [
    getWalletTransactionDetailLoading,
    setGetWalletTransactionDetailLoading,
  ] = useState(false);

  const updatedAt = walletSelector.getUpdatedAt(walletTransactionDetail);
  const remarks = walletSelector.getRemarks(walletTransactionDetail);
  const typeLabel = walletSelector.getTypeLabel(walletTransactionDetail);
  const typeValue = walletSelector.getTypeValue(walletTransactionDetail);
  const amount = walletSelector.getAmountValue(walletTransactionDetail);
  const currency = walletSelector.getAmountCurrency(walletTransactionDetail);
  const transactionNumber = walletSelector.getTransactionNumber(
    walletTransactionDetail,
  );
  const isAdd = walletSelector.getIsAdd(walletTransactionDetail);
  const paymentMethod = walletSelector.getPaymentMethod(
    walletTransactionDetail,
  );
  const withdrawStatus = walletSelector.getRequestStatus(
    walletTransactionDetail,
  );
  const status = walletSelector.getStatus(walletTransactionDetail);
  const invoiceNumber = walletSelector.getInvoiceNumber(
    walletTransactionDetail,
  );

  useEffect(() => {
    fetchWalletTransactionDetail();
  }, []);

  const fetchWalletTransactionDetail = async () => {
    await apiRequest.getWalletTransactionDetailRequest(
      id,
      setGetWalletTransactionDetailLoading,
      successCallback,
    );
  };

  const successCallback = (res) => {
    setWalletTransactionDetail(res);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const renderIcon = (type) => {
    switch (type) {
      case Constant.WALLET_RENTAL_INCOME:
        return Images.rentalInIcon;
      case Constant.WALLET_MANUAL_PAID_INVOICE_REVERT_PAYMENT:
        return Images.rentalInIcon;
      case Constant.WALLET_EXPENSE:
        return Images.rentalOutIcon;
      case Constant.WALLET_INVOICE_PAYMENT:
        return Images.rentalOutIcon;
      case Constant.WALLET_WITHDRAWAL:
        return Images.withdrawIcon;
    }
  };

  return (
    <CustomOwnerHeader
      title="Transaction Overview"
      onClickGoBack={onClickGoBack}
      className="pb-0"
    >
      <NextSeo title="Transaction Overview | Owner - Spacify Asia" />

      {/*<div className="px-4 absolute top-16 w-full z-10">*/}
      {/*  <div className="global-box-shadow global-border-radius p-5 flex items-center bg-white">*/}
      {/*    <CustomImage src={renderIcon(typeValue)} imageStyle={{ width: 30 }} />*/}

      {/*    <div>*/}
      {/*      <CustomText textClassName="text-lg font-bold px-3 leading-4">*/}
      {/*        {isEmpty(amount) ? "RM0" : amount}*/}
      {/*      </CustomText>*/}
      {/*      /!*<CustomText textClassName="text-xs text-disable px-3">*!/*/}
      {/*      /!*  {`withdraw amount`}*!/*/}
      {/*      /!*</CustomText>*!/*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="body-container bg-white flex-1 py-5">
        <DetailLabel
          title="Amount"
          value={`${currency} ${isEmpty(amount) ? "-" : amount}`}
        />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel
          title="Transaction Type"
          value={isEmpty(typeLabel) ? "-" : typeLabel}
        />

        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <a
          href={
            isEmpty(invoiceNumber) ? "#" : `/user/owner/my-invoice/${invoiceNumber}`
          }
        >
          <DetailLabel
            title="Invoice Number"
            value={isEmpty(invoiceNumber) ? "-" : invoiceNumber}
            highlight
          />
        </a>

        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel
          title="Payment Details"
          value={isEmpty(remarks) ? "-" : remarks}
        />

        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel
          title="Payment Method"
          value={isEmpty(paymentMethod) ? "-" : paymentMethod}
        />

        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel
          title="Updated Date/Time"
          value={
            isEmpty(updatedAt)
              ? moment().format("DD MMM YYYY, HH:mmm")
              : updatedAt
          }
        />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        {/*<DetailLabel title="Wallet Ref" value="202407011234567890000000000" />*/}
        {/*<div className="divider-line" style={{ margin: "20px 0" }}></div>*/}

        <DetailLabel
          title="Status"
          value={
            typeValue === Constant.WALLET_WITHDRAWAL ? withdrawStatus : status
          }
        />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>

        <DetailLabel
          title="Transactions No."
          value={isEmpty(transactionNumber) ? "-" : transactionNumber}
        />
        <div className="divider-line" style={{ margin: "20px 0" }}></div>
      </div>

      <LoadingOverlay loading={getWalletTransactionDetailLoading} />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(TransactionOverview));
