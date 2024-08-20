import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import WalletSummary from "@/components/MyWallet/WalletSummary";
import TransactionComponent from "@/components/MyWallet/TransactionComponent";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { useEffect, useState } from "react";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as walletSelector from "@/src/selectors/wallet";
import { get, isEmpty } from "lodash";
import moment from "moment";
import Constant from "@/src/utils/Constant";
import {NextSeo} from "next-seo";

export { getServerSideProps };

const MyWallet = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [walletData, setWalletData] = useState(null);
  const [walletDataLoading, setWalletDataLoading] = useState(false);

  const [getWalletTransactionListingLoading, setGetWalletTransactionLoading] =
    useState(false);
  const [getWalletTransactionListing, setGetWalletTransactionListing] =
    useState([]);

  const balance = walletSelector.getBalance(walletData);
  const updatedAt = walletSelector.getUpdatedAt(walletData);

  useEffect(() => {
    fetchWalletTransactionListing(20, 1, { type: selectedCategory });
  }, [selectedCategory]);

  const fetchWalletTransactionListing = async (
    perPage = 20,
    page = 1,
    params = { type: selectedCategory },
  ) => {
    await apiRequest.getWalletTransactionListingRequest(
      perPage,
      page,
      params,
      setGetWalletTransactionLoading,
      getWalletListingSuccessCallback,
    );
  };

  const getWalletListingSuccessCallback = (res) => {
    setGetWalletTransactionListing(res);
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    await apiRequest.getWalletRequest(
      setWalletDataLoading,
      getWalletDataSuccessCallBack,
    );
  };

  const getWalletDataSuccessCallBack = (res) => {
    setWalletData(res);
  };

  const onClickSelectCategory = (value) => {
    setSelectedCategory(value);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToTransactionOverview = (id) => {
    router.push({
      pathname: `/owner/my-wallet/transaction-overview/${id}`,
    });
  };

  const onClickViewReport = () => {
    router.push("/owner/my-report");
  };

  return (
    <CustomOwnerHeader
      className="pb-12"
      title="My Wallet"
      onClickGoBack={onClickGoBack}
      headerContent={
        <div className="flex justify-between items-center">
          <div className="">
            <CustomText
              textClassName="white-text font-bold"
              styles={{ fontSize: 30 }}
            >
              {isEmpty(balance) ? "RM 0" : balance}
            </CustomText>
            <CustomText textClassName="white-text font-size-xxsmall font-light">
              Updated on{" "}
              {isEmpty(updatedAt)
                ? moment().format("DD MMM YYYY, H:mmm")
                : updatedAt}
            </CustomText>
          </div>

          <div className="global-box-shadow global-border-radius p-3 primaryWhite-bg-color flex justify-center items-center">
            <CustomImage src={Images.withdrawIcon} imageStyle={{ width: 18 }} />
            <CustomText textClassName="primary-text pl-2 font-size-small">
              Withdraw
            </CustomText>
          </div>
        </div>
      }
    >

      <NextSeo title="My Wallet | Owner - Spacify Asia" />

      <WalletSummary data={walletData} />

      <div className="body-container bg-color flex-1 pb-4 pt-16">
        <TransactionComponent
          onClickViewReport={onClickViewReport}
          selectedCategory={selectedCategory}
          onClickSelectCategory={onClickSelectCategory}
          data={getWalletTransactionListing}
          onClickToTransactionOverview={onClickToTransactionOverview}
        />
      </div>

      <LoadingOverlay
        loading={walletDataLoading || getWalletTransactionListingLoading}
      />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyWallet));
