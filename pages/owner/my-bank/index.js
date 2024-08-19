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
import { isEmpty, lowerCase, replace } from "lodash";
import BankCard from "@/components/MyBank/BankCard";
import Constant from "@/src/utils/Constant";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";

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

  const [getWalletTransactionListingLoading, setGetWalletTransactionLoading] =
    useState(false);
  const [getWalletTransactionListing, setGetWalletTransactionListing] = useState([]);

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
    params = { type: Constant.WALLET_WITHDRAWAL },
  ) => {
    await apiRequest.getWalletTransactionListingRequest(
      perPage,
      page,
      params,
      setGetWalletTransactionLoading,
      getWalletSuccessCallback,
    );
  };

  const getWalletSuccessCallback = (res) => {
    setGetWalletTransactionListing(res);
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

      <div className="body-container bg-color flex flex-1">
        <TransactionComponent
          data={getWalletTransactionListing}
          selectedCategory={selectedCategory}
          onClickSelectCategory={onClickSelectCategory}
        />
      </div>

      <LoadingOverlay
        loading={
          getWalletTransactionListingLoading ||
          (userProfileLoading && isEmpty(userProfileData))
        }
      />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyBank));
