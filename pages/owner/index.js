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

export { getServerSideProps };

const OwnerHome = () => {
  const router = useRouter();

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
  }, []);

  const fetchTransactionListing = async () => {
    await apiRequest.getOwnerTransaction(
      setTransactionListingLoading,
      getTransactionListingSuccess,
    );
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

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className="body-container pt-10 pb-12">
        <div className="flex items-center">
          <CustomText textClassName="white-text font-bold font-size-large">
            Welcome to{" "}
          </CustomText>
          <CustomImage
            src={Images.blackLogo}
            width={80}
            height={20}
            className="mx-1.5"
          />
        </div>
      </div>

      <UserDetailComponent data={propertyListing} />

      <div className="body-container primaryWhite-bg-color flex-1 pb-24">
        <PropertyInfoComponent lists={lists} />

        <PropertyCarouselComponent
          onClickToPropertyDetail={onClickToPropertyDetail}
          data={properties}
        />

        <RentalIncomeComponent data={transactionListing} />
      </div>

      <LoadingOverlay
        loading={propertyListingLoading || transactionListingLoading}
      />
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(OwnerHome));
