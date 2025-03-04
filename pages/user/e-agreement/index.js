import CustomButton from "@/components/CustomButton";
import { isEmpty, map, get, isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EAgreementCard from "@/components/EAgreement/EAgreementCard";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import * as agreementSelector from "@/src/selectors/agreement";
import * as agreementAction from "@/src/actions/agreement";
import { useDispatch, useSelector } from "react-redux";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import Constant from "@/src/utils/Constant";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

export { getServerSideProps };

const btnLists = [
  { name: "All", value: Constant.AGREEMENT_ALL },
  { name: "Draft", value: Constant.AGREEMENT_DRAFT },
  { name: "Pending", value: Constant.AGREEMENT_PENDING },
  { name: "Completed", value: Constant.AGREEMENT_COMPLETED },
];

const EAgreement = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState(Constant.AGREEMENT_ALL);

  const getAgreementListingRequest = (status, perPage, page) =>
    dispatch(agreementAction.getAgreementListingRequest(status, perPage, page));
  const agreementListingData = useSelector((state) =>
    agreementSelector.getAgreementListingData(state, selectedStatus),
  );
  const agreementListingDataLoading = useSelector((state) =>
    agreementSelector.getAgreementListingLoading(state, selectedStatus),
  );
  const agreementListingDataPagination = useSelector((state) =>
    agreementSelector.getAgreementListingPagination(state, selectedStatus),
  );

  const hasMorePage = agreementSelector.getHasMorePages(
    agreementListingDataPagination,
  );
  const lastPage = agreementSelector.getLastPage(
    agreementListingDataPagination,
  );
  const currentPage = agreementSelector.getCurrentPage(
    agreementListingDataPagination,
  );

  useEffect(() => {
    fetchAgreementListingData(selectedStatus);
  }, [selectedStatus]);

  const fetchAgreementListingData = (
    status = Constant.AGREEMENT_ALL,
    perPage = 20,
    page = 1,
  ) => {
    getAgreementListingRequest(status, perPage, page);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSelectStatus = (category) => {
    setSelectedStatus(category);
  };

  const onClickLoadMore = () => {
    fetchAgreementListingData(selectedStatus, 20, currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="My E-Agreement - CozyHomes" />

      <DesktopLayout
        hideFooter
        loading={agreementListingDataLoading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <CustomText textClassName="text-base">
                    My E-Agreement
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIconBlack}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">My E-Agreement</CustomText>
            </div>
          </div>
        }
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center pb-3">
            {map(btnLists, (item, index) => {
              const name = get(item, ["name"], "");
              const value = get(item, ["value"], "");

              return (
                <CustomButton
                  key={index}
                  buttonText={name}
                  buttonClassName={`btn-sm ${isEqual(selectedStatus, value) ? "btn-primary" : "btn-white"} mr-2`}
                  textClassName="text-xs"
                  onClick={() => onClickSelectStatus(value)}
                />
              );
            })}
          </div>

          {isEmpty(agreementListingData) ? (
            <div className="flex flex-col flex-1 justify-center items-center">
              <CustomEmptyBox />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {map(agreementListingData, (item, index) => (
                <EAgreementCard item={item} key={index} />
              ))}
            </div>
          )}

          {hasMorePage && lastPage > 1 && !isEmpty(agreementListingData) ? (
            <div className="flex justify-center pt-3">
              <CustomButton
                buttonClassName="btn-primary min-h-9 h-9 w-32"
                buttonText="Load More"
                textClassName="text-xs"
                loading={
                  agreementListingDataLoading && !isEmpty(agreementListingData)
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

export default withTranslation("common")(AuthWrapper(EAgreement));
