import Images from "@/src/utils/Image";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomButton from "@/components/CustomButton";
import { map, get, filter, isEqual, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import HelpCenterListingCard from "@/components/HelpCenterListingCard";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import DesktopLayout from "@/components/DesktopLayout";
import Constant from "@/src/utils/Constant";
import * as maintenanceTicketAction from "@/src/actions/maintenance-ticket";
import { useDispatch, useSelector } from "react-redux";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import Icons from "@/components/Icons";

export { getServerSideProps };

const HelpCenter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState("");

  const getMaintenanceTicketListingRequest = (perPage, page, status) =>
    dispatch(
      maintenanceTicketAction.getMaintenanceTicketListingRequest(
        perPage,
        page,
        status,
      ),
    );
  const maintenanceTicketListingData = useSelector((state) =>
    maintenanceTicketSelector.getMaintenanceTicketListingData(
      state,
      selectedStatus,
    ),
  );
  const maintenanceTicketListingDataLoading = useSelector((state) =>
    maintenanceTicketSelector.getMaintenanceTicketListingLoading(
      state,
      selectedStatus,
    ),
  );
  const maintenanceTicketListingDataPagination = useSelector((state) =>
    maintenanceTicketSelector.getMaintenanceTicketListingPagination(
      state,
      selectedStatus,
    ),
  );

  const hasMorePage = maintenanceTicketSelector.getHasMorePages(
    maintenanceTicketListingDataPagination,
  );
  const lastPage = maintenanceTicketSelector.getLastPage(
    maintenanceTicketListingDataPagination,
  );
  const currentPage = maintenanceTicketSelector.getCurrentPage(
    maintenanceTicketListingDataPagination,
  );

  const btnLists = [
    {
      label: "All",
      value: "",
    },
    {
      label: "New",
      value: Constant.TICKET_NEW,
    },
    {
      label: "Pending",
      value: Constant.TICKET_PENDING,
    },
    {
      label: "On Hold",
      value: Constant.TICKET_ON_HOLD,
    },
    {
      label: "In Progress",
      value: Constant.TICKET_IN_PROGRESS,
    },
    {
      label: "Closed",
      value: Constant.TICKET_CLOSED,
    },
    {
      label: "Cancelled",
      value: Constant.TICKET_CANCELLED,
    },
  ];

  useEffect(() => {
    fetchMaintenanceTicket();
  }, [selectedStatus]);

  const fetchMaintenanceTicket = (
    perPage = 20,
    page = 1,
    status = selectedStatus,
  ) => {
    getMaintenanceTicketListingRequest(perPage, page, status);
  };

  const onClickGoBack = () => {
    router.push("/user/account");
  };

  const onClickToNewRequest = () => {
    router.push("/user/help-center/new-request");
  };

  const onClickToRequestOverview = (id) => {
    router.push(`/agency/help-center/${id}`);
  };

  const onClickLoadMore = () => {
    fetchMaintenanceTicket(20, currentPage + 1, selectedStatus);
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="My Statement - CozyHomes" />

      <DesktopLayout
        hideFooter
        loading={
          maintenanceTicketListingDataLoading &&
          isEmpty(maintenanceTicketListingData)
        }
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
                src={Icons.leftIconBlack}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">Help Center</CustomText>
            </div>
          </div>
        }
      >
        <div className="flex flex-col flex-1 h-full">
          <div className="flex items-center pb-4 overflow-x-scroll overflow-y-hidden hide-scroll-bar">
            {map(btnLists, (list, index) => {
              const value = get(list, ["value"], "");
              const label = get(list, ["label"], "");

              return (
                <CustomButton
                  key={index}
                  buttonText={label}
                  buttonClassName={`btn-sm ${isEqual(selectedStatus, value) ? "btn-primary" : "btn-white"} mr-2`}
                  textClassName="text-xs"
                  onClick={() => setSelectedStatus(value)}
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-4 h-full">
            {isEmpty(maintenanceTicketListingData) ? (
              <div className="flex flex-1 items-center justify-center py-10 h-full">
                <CustomEmptyBox
                  variant="ticket"
                  emptyTitle="No tickets yet"
                  emptyDesc="New support requests from tenants will land here."
                />
              </div>
            ) : (
              map(maintenanceTicketListingData, (data, index) => {
                return (
                  <HelpCenterListingCard
                    key={index}
                    data={data}
                    onClickToRequestOverview={onClickToRequestOverview}
                  />
                );
              })
            )}
          </div>

          {hasMorePage &&
          lastPage > 1 &&
          !isEmpty(maintenanceTicketListingData) ? (
            <div className="flex justify-center pt-3">
              <CustomButton
                buttonClassName="btn-primary min-h-9 h-9 w-32"
                buttonText="Load More"
                textClassName="text-xs"
                loading={
                  maintenanceTicketListingDataLoading &&
                  !isEmpty(maintenanceTicketListingData)
                }
                onClick={onClickLoadMore}
              />
            </div>
          ) : (
            false
          )}
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(HelpCenter));
