import Images from "@/src/utils/Image";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomButton from "@/components/CustomButton";
import { map, get, filter, isEqual } from "lodash";
import { useState } from "react";
import HelpCenterListingCard from "@/components/HelpCenterListingCard";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import DesktopLayout from "@/components/DesktopLayout";

export { getServerSideProps };
const lists = [
  {
    status: "New",
    secondStatus: "CRITICAL",
    date: "10 Dec 2022",
    requestNum: "RQ-230000007",
    request: "Maintenance / Amenities / Air-conditioner / Not Cold",
    address: "Icon City, A-01-01",
    state: "Room 1",
  },
  {
    status: "In Progress",
    secondStatus: "HIGH",
    date: "10 Dec 2022",
    requestNum: "RQ-230000006",
    request: "Maintenance / Amenities / Washer / Not Working",
    address: "Icon City, A-01-01",
    state: "Yard",
  },
  {
    status: "Completed",
    secondStatus: "NORMAL",
    date: "07 Dec 2022",
    requestNum: "RQ-230000005",
    request: "Maintenance / Electrical / Light / Not Working",
    address: "Icon City, A-01-01",
    state: "Kitchen",
  },
  {
    status: "Cancelled",
    secondStatus: "LOW",
    date: "07 Dec 2022",
    requestNum: "RQ-230000004",
    request: "Maintenance / Electrical / Light / Not Working",
    address: "Icon City, A-01-01",
    state: "Kitchen",
  },
];

const HelpCenter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const btnLists = [
    {
      btnText: "All",
      status: "All",
    },
    {
      btnText: "In Progress",
      status: "In Progress",
    },
    {
      btnText: "Complete",
      status: "Completed",
    },
    {
      btnText: "Cancelled",
      status: "Cancelled",
    },
  ];

  const onClickSelectStatusCategory = (status) => {
    setSelectedStatus(status);
  };

  const onClickGoBack = () => {
    router.push("/user/my-property");
  };

  const onClickToNewRequest = () => {
    router.push("/user/help-center/new-request");
  };

  const onClickToRequestOverview = (id) => {
    router.push(`/user/help-center/${id}`);
  };

  const formattedList = () => {
    if (isEqual(selectedStatus, "All")) {
      return lists;
    }

    return filter(lists, (item) => {
      return isEqual(item.status, selectedStatus);
    });
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="My Invoice - Spacify Asia" />

      <DesktopLayout
        // loading={invoiceListingLoading && isEmpty(invoiceListingData)}
        rightButtonIcon={Images.plusIcon}
        onClickRightButton={onClickToNewRequest}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul className="flex-wrap">
                <li>
                  <CustomText textClassName="text-base">Help Center</CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">Help Center</CustomText>
            </div>
          </div>
        }
      >
        <div className="flex flex-col flex-1 h-full">
          <div className="flex items-center pb-4">
            {map(btnLists, (item, index) => {
              return (
                <CustomButton
                  key={index}
                  buttonText={get(item, ["btnText"], "")}
                  buttonClassName={`btn-sm ${isEqual(selectedStatus, get(item, ["status"], "")) ? "primary-btn" : "default-btn"} mr-2`}
                  textClassName="text-xs"
                  onClick={() =>
                    onClickSelectStatusCategory(get(item, ["status"], ""))
                  }
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-4">
            {map(formattedList(), (item, index) => {
              return (
                <HelpCenterListingCard
                  key={index}
                  item={item}
                  onClickToRequestOverview={onClickToRequestOverview}
                />
              );
            })}
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(HelpCenter));
