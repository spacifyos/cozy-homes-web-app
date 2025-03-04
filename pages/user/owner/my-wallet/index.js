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
import { isEmpty } from "lodash";
import moment from "moment";
import { NextSeo } from "next-seo";
import CustomButton from "@/components/CustomButton";

export { getServerSideProps };

const MyWallet = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loadMore, setLoadMore] = useState(false);

  const [walletData, setWalletData] = useState(null);
  const [walletDataLoading, setWalletDataLoading] = useState(false);

  const [walletTransactionListingLoading, setWalletTransactionLoading] =
    useState(false);
  const [walletTransactionListing, setWalletTransactionListing] = useState([]);
  const [
    walletTransactionListingPagination,
    setWalletTransactionListingPagination,
  ] = useState([]);

  const hasMorePage = walletSelector.getHasMorePages(
    walletTransactionListingPagination,
  );
  const lastPage = walletSelector.getLastPage(
    walletTransactionListingPagination,
  );
  const currentPage = walletSelector.getCurrentPage(
    walletTransactionListingPagination,
  );

  const balance = walletSelector.getBalance(walletData);
  const updatedAt = walletSelector.getUpdatedAt(walletData);

  useEffect(() => {
    setLoadMore(false);
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
      setWalletTransactionLoading,
      getWalletListingSuccessCallback,
    );
  };

  const getWalletListingSuccessCallback = (res, pagination) => {
    const checkCurrentPage = walletSelector.getCurrentPage(pagination);

    setWalletTransactionListingPagination(pagination);
    setWalletTransactionListing((prevState) =>
      checkCurrentPage > 1 ? [...prevState, ...res] : res,
    );
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

  const onClickLoadMore = async () => {
    setLoadMore(true);
    await fetchWalletTransactionListing(20, currentPage + 1);
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
              textClassName="text-white font-bold"
              styles={{ fontSize: 30 }}
            >
              {isEmpty(balance) ? "RM 0" : balance}
            </CustomText>
            <CustomText textClassName="text-white text-xs font-light">
              Updated on{" "}
              {isEmpty(updatedAt)
                ? moment().format("DD MMM YYYY, H:mmm")
                : updatedAt}
            </CustomText>
          </div>

          <a
            href={"/user/owner/my-wallet/withdraw"}
            className="global-box-shadow global-border-radius p-3 bg-white flex justify-center items-center cursor-pointer"
          >
            <CustomImage src={Images.withdrawIcon} imageStyle={{ width: 25 }} />
            <CustomText textClassName="text-primary pl-2 text-sm">
              Withdraw
            </CustomText>
          </a>
        </div>
      }
    >
      <NextSeo title="My Wallet | Owner - CozyHomes" />

      <WalletSummary data={walletData} />

      <div className="body-container bg-primary-background flex-1 pb-4 pt-24">
        <TransactionComponent
          selectedCategory={selectedCategory}
          onClickSelectCategory={onClickSelectCategory}
          data={walletTransactionListing}
        />

        {hasMorePage && lastPage > 1 && !isEmpty(walletTransactionListing) ? (
          <div className="flex justify-center  pt-3">
            <CustomButton
              buttonClassName="btn-primary min-h-9 h-9 w-32"
              buttonText="Load More"
              textClassName="text-xs"
              loading={
                walletTransactionListingLoading &&
                !isEmpty(walletTransactionListing)
              }
              onClick={onClickLoadMore}
            />
          </div>
        ) : (
          false
        )}
      </div>

      <LoadingOverlay
        loading={
          walletDataLoading || (walletTransactionListingLoading && !loadMore)
        }
      />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyWallet));
