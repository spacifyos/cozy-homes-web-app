import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import { useDispatch, useSelector } from "react-redux";
import * as invoiceAction from "@/src/actions/invoice";
import * as invoiceSelector from "@/src/selectors/invoice";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { get, isEmpty, isEqual, map } from "lodash";
import moment from "moment";
import { NextSeo } from "next-seo";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as walletSelector from "@/src/selectors/wallet";
import { getTransferTo } from "@/src/selectors/wallet";

export { getServerSideProps };

const WithdrawSuccessful = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const userType = get(router, ["query", "type"], "");

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
  const transferTo = walletSelector.getTransferTo(walletTransactionDetail);
  const paymentMethod = walletSelector.getPaymentMethod(
    walletTransactionDetail,
  );
  const withdrawStatus = walletSelector.getRequestStatus(
    walletTransactionDetail,
  );
  const status = walletSelector.getStatus(walletTransactionDetail);

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

  const onClickClose = () => {
    router.replace(`/user/owner`);
  };

  return (
    <div className="relative p-4 pt-10 bg-primary-background flex flex-col flex-1 items-center">
      <NextSeo title="Invoice Payment Successful - CozyHomes" />

      <div className="absolute top-5 right-5 cursor-pointer">
        <CustomImage
          src={Images.closeIconBlack}
          imageStyle={{ width: 20 }}
          onClick={onClickClose}
        />
      </div>

      <CustomImage
        src={Images.paymentSuccessIcon}
        imageStyle={{ width: 150, height: 150 }}
      />

      {/*<CustomText textClassName="font-bold" styles={{ fontSize: 24 }}>*/}
      {/*  {t("invoiceSuccessful.spacifyCoinsEarned")}*/}
      {/*</CustomText>*/}

      {/*<CustomText textClassName="text-primary font-bold text-lg">*/}
      {/*  3,800*/}
      {/*</CustomText>*/}
      <CustomText textClassName="font-bold text-lg">
        Congratulations!
      </CustomText>

      <div className="flex flex-col global-border-radius bg-white py-2 px-4 global-box-shadow w-full my-7">
        <div className="flex items-center justify-center py-4">
          <CustomImage
            src={Images.checkGreenIcon}
            className="mr-2"
            width={30}
            height={30}
          />
          <CustomText textClassName="text-black font-bold text-base">
            Request
          </CustomText>
        </div>

        <div className="divider-line" style={{ margin: 0 }}></div>

        <div className="flex flex-col items-center py-4">
          <CustomText textClassName="text-primary font-bold text-base">
            RM {isEmpty(amount) ? "0" : amount}
          </CustomText>
          <CustomText textClassName="text-disable text-xs">
            {isEmpty(updatedAt)
              ? moment().format("DD MMM YYYY HH:mmm")
              : updatedAt}
          </CustomText>
        </div>
      </div>

      <div className="relative pt-6 flex justify-center w-full">
        <div className="bg-primary p-3 global-border-radius absolute top-0">
          <CustomImage
            src={Images.withdrawIconWhite}
            imageStyle={{ width: 30, height: 30 }}
          />
        </div>
        <div className="global-box-shadow global-border-radius p-5 bg-white pt-10 w-full">
          <CustomLabelValue
            value={isEmpty(transferTo) ? "-" : transferTo}
            label="Withdraw requestor"
          />
          <CustomLabelValue
            value={isEmpty(transactionNumber) ? "-" : transactionNumber}
            label="Transaction Number"
          />
          <CustomLabelValue
            value={isEmpty(remarks) ? "-" : remarks}
            label={"Remark"}
          />
          <CustomLabelValue
            value={isEmpty(paymentMethod) ? "-" : paymentMethod}
            label="Withdraw Method"
          />
          <CustomLabelValue
            value={isEmpty(withdrawStatus) ? "-" : withdrawStatus}
            label="Withdraw Status"
          />
        </div>
      </div>

      <LoadingOverlay loading={getWalletTransactionDetailLoading} />
    </div>
  );
};

export default withTranslation("common")(WithdrawSuccessful);
