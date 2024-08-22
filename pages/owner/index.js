import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import UserDetailComponent from "@/components/Owner/UserDetailComponent";
import PropertyInfoComponent from "@/components/Owner/PropertyInfoComponent";
import PropertyCarouselComponent from "@/components/Owner/PropertyCarouselComponent";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import RentalIncomeComponent from "@/components/Owner/RentalIncomeComponent";
import { useRouter } from "next/router";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as ownerSelector from "@/src/selectors/owner";
import * as authAction from "@/src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "@/src/selectors/auth";
import TransactionComponent from "@/components/Owner/TransactionComponent";
import * as invoiceAction from "@/src/actions/invoice";
import * as invoiceSelector from "@/src/selectors/invoice";

export { getServerSideProps };

const OwnerHome = () => {
  const { t } = useTranslation("common");
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

  const [selectedCategory, setSelectedCategory] = useState("Rental");
  const [selectedInvoiceCategory, setSelectedInvoiceCategory] =
    useState("HomeAll");

  const getInvoiceListingRequest = (paymentStatus, perPage, page) =>
    dispatch(
      invoiceAction.getInvoiceListingRequest(paymentStatus, perPage, page),
    );
  const invoiceListingData = useSelector((state) =>
    invoiceSelector.getInvoiceListingData(state, selectedInvoiceCategory),
  );
  const invoiceListingLoading = useSelector((state) =>
    invoiceSelector.getInvoiceListingLoading(state, selectedInvoiceCategory),
  );

  const [propertyListingLoading, setPropertyListingLoading] = useState(false);
  const [propertyListing, setPropertyListing] = useState([]);

  const [transactionListing, setTransactionListing] = useState([]);
  const [transactionListingLoading, setTransactionListingLoading] =
    useState(false);

  const properties = ownerSelector.getProperties(propertyListing);

  const lists = [
    {
      name: "Property",
      value: ownerSelector.getTotalProperty(propertyListing),
      icon: Images.buildingIconActive,
    },
    {
      name: "Unit",
      value: ownerSelector.getTotalUnits(propertyListing),
      icon: Images.spaceIcon,
    },
    {
      name: "Room",
      value: ownerSelector.getTotalRoom(propertyListing),
      icon: Images.bedIconActive,
    },
    {
      name: "Occupancy",
      value: `${ownerSelector.getOccupancy(propertyListing)}%`,
      icon: Images.percentIconActive,
    },
  ];

  useEffect(() => {
    fetchPropertyListing();
    fetchTransactionListing();
    fetchUserprofileData();
  }, []);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const fetchTransactionListing = async () => {
    await apiRequest.getOwnerTransaction(
      setTransactionListingLoading,
      getTransactionListingSuccess,
    );
  };

  useEffect(() => {
    fetchInvoiceListingData(selectedInvoiceCategory);
  }, [selectedInvoiceCategory]);

  const fetchInvoiceListingData = (paymentStatus, perPage = 3, page = 1) => {
    getInvoiceListingRequest(paymentStatus, perPage, page);
  };

  const getTransactionListingSuccess = (res) => {
    setTransactionListing(res);
  };

  const fetchPropertyListing = async () => {
    await apiRequest.getOwnerPropertyList(
      setPropertyListingLoading,
      getPropertyListingSuccess,
    );
  };

  const getPropertyListingSuccess = (res) => {
    setPropertyListing(res);
  };

  const onClickToPropertyDetail = (id) => {
    router.push({
      pathname: `/owner/property/${id}`,
    });
  };

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickSelectInvoiceCategory = (category) => {
    setSelectedInvoiceCategory(category);
  };

  const onClickToInvoiceList = () => {
    router.push("/owner/my-invoice");
  };

  const onClickToOverviewPage = (id) => {
    router.push(`/owner/my-invoice/${id}`);
  };

  const onClickToWallet = () => {
    router.push("/owner/my-wallet");
  };

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className="body-container pt-10 pb-12">
        <div className="flex items-center">
          <CustomText textClassName="white-text font-bold font-size-large">
            Welcome to{" "}
          </CustomText>
          <CustomImage
            src={Images.blackLogo}
            imageStyle={{ width: 80 }}
            className="mx-1.5"
          />
        </div>
      </div>

      <UserDetailComponent
        data={userProfileData}
        onClickToWallet={onClickToWallet}
      />

      <div className="body-container bg-color flex-1 pb-24">
        <PropertyInfoComponent lists={lists} paddingTop={"4rem"} />

        <PropertyCarouselComponent
          onClickToPropertyDetail={onClickToPropertyDetail}
          data={properties}
        />

        <TransactionComponent
          t={t}
          transactionListing={transactionListing}
          onClickSelectCategory={onClickSelectCategory}
          selectedCategory={selectedCategory}
          onClickSelectInvoiceCategory={onClickSelectInvoiceCategory}
          selectedInvoiceCategory={selectedInvoiceCategory}
          onClickToInvoiceList={onClickToInvoiceList}
          invoiceListingData={invoiceListingData}
          onClickToOverviewPage={onClickToOverviewPage}
        />
      </div>

      <LoadingOverlay
        loading={
          propertyListingLoading ||
          transactionListingLoading ||
          invoiceListingLoading
        }
      />
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(OwnerHome));
