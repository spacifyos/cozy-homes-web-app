import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import UserDetailComponent from "@/components/Owner/UserDetailComponent";
import PropertyInfoComponent from "@/components/Owner/PropertyInfoComponent";
import PropertyCarouselComponent from "@/components/Owner/PropertyCarouselComponent";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as ownerSelector from "@/src/selectors/owner";
import * as authAction from "@/src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "@/src/selectors/auth";
import TransactionComponent from "@/components/Owner/TransactionComponent";
import * as invoiceAction from "@/src/actions/invoice";
import * as invoiceSelector from "@/src/selectors/invoice";
import BottomNavigate from "@/components/BottomNavigate";
import { get } from "lodash";
import DesktopLayout from "@/components/DesktopLayout";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const OwnerHome = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");

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
      icon: Images.spaceIconActive,
    },
    {
      name: "Room",
      value: `${ownerSelector.getTotalRoom(propertyListing)}`,
      icon: Images.bedIconActive,
    },
    {
      name: "Car Park",
      value: `${ownerSelector.getTotalCarPark(propertyListing)}`,
      icon: Images.carParkOccupancyIconActive,
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

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickSelectInvoiceCategory = (category) => {
    setSelectedInvoiceCategory(category);
  };

  const onClickToInvoiceList = () => {
    router.push("/user/owner/user/my-invoice");
  };

  const onClickToOverviewPage = (id) => {
    router.push();
  };

  const onClickChangeTab = (route) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="My Property | Owner - CozyHomes" />

      <DesktopLayout
        loading={
          propertyListingLoading ||
          transactionListingLoading ||
          invoiceListingLoading ||
          userProfileLoading
        }
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <CustomText textClassName="text-base">My Property</CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="pb-0 flex flex-col min-h-full">
          <UserDetailComponent data={userProfileData} />

          <PropertyInfoComponent lists={lists} />

          <PropertyCarouselComponent data={properties} />

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
      </DesktopLayout>

      {/*<BottomNavigate*/}
      {/*  t={t}*/}
      {/*  routeName={routeName}*/}
      {/*  routeQuery={routeQuery}*/}
      {/*  onClickChangeTab={onClickChangeTab}*/}
      {/*/>*/}
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(OwnerHome));
