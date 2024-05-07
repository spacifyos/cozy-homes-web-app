import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import { useState } from "react";
import HelpCenterListingCard from "@/components/HelpCenterListingCard";

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
  const btnlist = [
    {
      btnText: t("helpCenter.all"),
      status: "All",
    },
    {
      btnText: t("helpCenter.inProgress"),
      status: "In Progress",
    },
    {
      btnText: t("helpCenter.completed"),
      status: "Completed",
    },
    {
      btnText: t("helpCenter.cancelled"),
      status: "Cancelled",
    },
  ];

  const onClickSelectStatusCategory = (status) => {
    setSelectedStatus(status);
  };
  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.helpCenter")}
      hideBgImage
      rightButtonIcon={Images.plusIcon}
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container pb-1">
        <div className="flex justify-between items-end pb-4">
          <div className="flex items-center">
            {_.map(btnlist, (item, index) => {
              const btnText = _.get(item, ["btnText"], "");
              const status = _.get(item, ["status"], "");
              return (
                <CustomButton
                  key={index}
                  buttonText={btnText}
                  buttonClassName={`btn-sm ${_.isEqual(selectedStatus, status) ? "primary-btn" : "default-btn"} mr-2`}
                  textClassName="font-size-xsmall"
                  onClick={() => onClickSelectStatusCategory(status)}
                />
              );
            })}
          </div>
        </div>

        {_.map(lists, (item) => {
          if (
            _.isEqual(selectedStatus, "All") ||
            _.isEqual(item.status, selectedStatus)
          ) {
            return <HelpCenterListingCard t={t} item={item} />;
          }
        })}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(HelpCenter);
