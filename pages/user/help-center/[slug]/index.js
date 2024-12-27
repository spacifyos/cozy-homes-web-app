import Images from "@/src/utils/Image";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import RequestOverviewDetail from "@/components/Help-center/RequestOverviewDetail";
import MaintenanceScheduleInformationComponent from "@/components/Help-center/MaintenanceScheduleInformationComponent";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import DesktopLayout from "@/components/DesktopLayout";
import * as maintenanceTicketAction from "@/src/actions/maintenance-ticket";
import { useDispatch, useSelector } from "react-redux";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import { useEffect } from "react";

export { getServerSideProps };

const RequestOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const getMaintenanceTicketOverviewRequest = (id) =>
    dispatch(maintenanceTicketAction.getMaintenanceTicketOverviewRequest(id));
  const maintenanceTicketOverviewData = useSelector((state) =>
    maintenanceTicketSelector.getMaintenanceTicketOverviewData(state, id),
  );
  const maintenanceTicketOverviewDataLoading = useSelector((state) =>
    maintenanceTicketSelector.getMaintenanceTicketOverviewLoading(state),
  );

  const requestNumber = maintenanceTicketSelector.getRequestNumber(
    maintenanceTicketOverviewData,
  );

  useEffect(() => {
    fetchMaintenanceData();
  }, []);

  const fetchMaintenanceData = () => {
    getMaintenanceTicketOverviewRequest(id);
  };

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Help Center Overview - Spacify Asia" />

      <DesktopLayout
        loading={maintenanceTicketOverviewDataLoading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/user/help-center"}>
                    <CustomText textClassName="text-base disable-text">
                      Help Center
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base ">
                    {requestNumber}
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">{requestNumber}</CustomText>
            </div>
          </div>
        }
      >
        <div className="relative flex flex-col justify-center">
          <RequestOverviewDetail data={maintenanceTicketOverviewData} />

          <MaintenanceScheduleInformationComponent />

          {/*<CommentComponent t={t} chatList={chatList} />*/}
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(RequestOverview));
