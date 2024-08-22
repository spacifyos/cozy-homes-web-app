import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { NextSeo } from "next-seo";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import { useRouter } from "next/router";
import TransactionComponent from "@/components/MyBank/TransactionComponent";
import { useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as authAction from "@/src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "@/src/selectors/auth";
import { isEmpty, lowerCase, map, replace } from "lodash";
import BankCard from "@/components/MyBank/BankCard";
import Constant from "@/src/utils/Constant";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import TransactionCard from "@/components/MyWallet/TransactionCard";
import CustomButton from "@/components/CustomButton";
import * as walletSelector from "@/src/selectors/wallet";

export { getServerSideProps };

const MyBank = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const bankDetails = authSelector.getBankDetails(userProfileData);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [walletTransactionListingLoading, setWalletTransactionListingLoading] =
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

  useEffect(() => {
    fetchWalletTransactionListing();
    fetchUserprofileData();
  }, []);

  useEffect(() => {
    fetchWalletTransactionListing();
  }, [selectedCategory]);

  const fetchWalletTransactionListing = async (
    perPage = 20,
    page = 1,
    params = { type: "Withdraw" },
  ) => {
    await apiRequest.getWalletTransactionListingRequest(
      perPage,
      page,
      params,
      setWalletTransactionListingLoading,
      getWalletSuccessCallback,
    );
  };

  const getWalletSuccessCallback = (res, pagination) => {
    const checkCurrentPage = walletSelector.getCurrentPage(pagination);

    setWalletTransactionListingPagination(pagination);
    setWalletTransactionListing((prevState) =>
      checkCurrentPage > 1 ? [...prevState, ...res] : res,
    );
  };

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickGoBack = () => {
    router.replace("/owner/account");
  };

  const onClickToAddBank = () => {
    router.push("/owner/my-bank/add-bank");
  };

  const onClickEditBankInfo = (id) => {
    const formatBankName = replace(lowerCase(id), " ", "_");

    router.push(`/owner/my-bank/${formatBankName}`);
  };

  const onClickToTransactionOverview = (id) => {
    router.push({
      pathname: `/owner/my-wallet/transaction-overview/${id}`,
    });
  };

  const onClickLoadMore = () => {
    fetchWalletTransactionListing(20, currentPage + 1);
  };

  return (
    <CustomOwnerHeader
      className="pb-28"
      title="My Bank"
      onClickGoBack={onClickGoBack}
    >
      <NextSeo title="My Bank | Owner - Spacify Asia" />

      <BankCard
        bankDetails={bankDetails}
        onClickToAddBank={onClickToAddBank}
        onClickEditBankInfo={onClickEditBankInfo}
      />

      <div className="body-container bg-color flex flex-col flex-1 pb-4">
        <div className="pt-16 flex flex-col flex-1">
          <div className="flex justify-between items-end pb-3 pt-2">
            <CustomText textClassName="font-bold">Transactions</CustomText>
          </div>

          <div className="flex flex-col flex-1">
            {isEmpty(walletTransactionListing) ? (
              <div className="flex justify-center flex-1">
                <CustomEmptyBox />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {map(walletTransactionListing, (item, index) => {
                  return (
                    <TransactionCard
                      data={item}
                      key={index}
                      onClickToTransactionOverview={
                        onClickToTransactionOverview
                      }
                    />
                  );
                })}

                {hasMorePage &&
                lastPage > 1 &&
                !isEmpty(walletTransactionListing) ? (
                  <div className="flex justify-center pb-3 pt-1">
                    <CustomButton
                      buttonClassName="primary-btn min-h-9 h-9 w-32"
                      buttonText="Load More"
                      textClassName="font-size-xsmall"
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
            )}
          </div>
        </div>
      </div>

      <LoadingOverlay
        loading={
          (walletTransactionListingLoading &&
            isEmpty(walletTransactionListing)) ||
          (userProfileLoading && isEmpty(userProfileData))
        }
      />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyBank));
