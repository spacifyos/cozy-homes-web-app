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
import { NextSeo } from "next-seo";
import AuthWrapper from "@/components/AuthWrapper";
import DesktopLayout from "@/components/DesktopLayout";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Icons from "@/components/Icons";

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
    <div className="min-h-screen bg-white">
      <NextSeo title="My Meter - CozyHomes" />

      <DesktopLayout
        hideFooter
        loading={meterListingLoading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <CustomText textClassName="text-base">My Meter</CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Icons.leftIconBlack}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">My Meter</CustomText>
            </div>
          </div>
        }
      >
        <div className="flex flex-col flex-1 h-full gap-3">
          {isEmpty(meterListingData) ? (
            <div className="flex flex-col justify-center flex-1">
              <CustomEmptyBox
                variant="meter"
                emptyTitle="No meters connected"
                emptyDesc="Meter readings will appear here once your unit is set up."
              />
            </div>
          ) : (
            map(meterListingData, (item, index) => (
              <MeterComponent key={index} item={item} />
            ))
          )}

          {hasMorePage && lastPage > 1 && !isEmpty(meterListingData) ? (
            <div className="flex justify-center">
              <CustomButton
                buttonClassName="btn-primary min-h-9 h-9 w-32"
                buttonText="Load More"
                textClassName="text-xs"
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
