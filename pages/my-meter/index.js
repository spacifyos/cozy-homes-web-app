import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import { map, isEmpty } from "lodash";
import * as meterAction from "@/src/actions/meter";
import * as meterSelector from "@/src/selectors/meter";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "@/components/CustomButton";
import { useEffect } from "react";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import * as invoiceSelector from "@/src/selectors/invoice";
import MeterComponent from "@/components/MyMeter/MeterComponent";
import LoadingOverlay from "@/components/LoadingOverlay";
import { NextSeo } from "next-seo";
import AuthWrapper from "@/components/AuthWrapper";
import DesktopLayout from "@/components/DesktopLayout";
import CustomText from "@/components/CustomText";

export { getServerSideProps };

const MyMeter = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const getMeterListingRequest = (per_page, page) =>
    dispatch(meterAction.getMeterListingRequest(per_page, page));
  const meterListingData = useSelector((state) =>
    meterSelector.getMeterListingData(state),
  );
  const meterListingLoading = useSelector((state) =>
    meterSelector.getMeterListingLoading(state),
  );
  const meterListingPagination = useSelector((state) =>
    meterSelector.getMeterListingPagination(state),
  );

  const hasMorePage = invoiceSelector.getHasMorePages(meterListingPagination);
  const lastPage = invoiceSelector.getLastPage(meterListingPagination);
  const currentPage = invoiceSelector.getCurrentPage(meterListingPagination);

  useEffect(() => {
    fetchMeterListingData();
  }, []);

  const fetchMeterListingData = (per_page = 20, page = 1) => {
    getMeterListingRequest(per_page, page);
  };

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="My Meter - Spacify Asia" />

      <DesktopLayout
        loading={meterListingLoading}
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href={"/my-property"}>
                  <CustomText textClassName="font-size-normal disable-text">
                    My Property
                  </CustomText>
                </a>
              </li>
              <li>
                <CustomText textClassName="font-size-xlarge font-bold">
                  My Meter
                </CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="flex flex-col flex-1 h-full">
          {isEmpty(meterListingData) ? (
            <div className="flex flex-col justify-center flex-1">
              <CustomEmptyBox emptyTitle="No meter found" />
            </div>
          ) : (
            map(meterListingData, (item, index) => (
              <MeterComponent t={t} key={index} item={item} />
            ))
          )}

          {hasMorePage && lastPage > 1 && !isEmpty(meterListingData) ? (
            <div className="flex justify-center">
              <CustomButton
                buttonClassName="primary-btn min-h-9 h-9 w-32"
                buttonText="Load More"
                textClassName="font-size-xsmall"
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

export default withTranslation("common")(AuthWrapper(MyMeter));
