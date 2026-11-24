import { withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { useEffect, useState } from "react";
import * as walletSelector from "@/src/selectors/wallet";
import { NextSeo } from "next-seo";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import DesktopLayout from "@/components/DesktopLayout";
import CustomImage from "@/components/CustomImage";
import Icons from "@/components/Icons";
import RentalIncomeComponent from "@/components/Owner/RentalIncomeComponent";

export { getServerSideProps };

const PER_PAGE = 20;

const RentalIncome = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [pagination, setPagination] = useState(null);

  const hasMorePage = walletSelector.getHasMorePages(pagination);
  const currentPage = walletSelector.getCurrentPage(pagination);

  useEffect(() => {
    fetchListing(1);
  }, []);

  const fetchListing = async (page) => {
    await apiRequest.getOwnerTransaction(
      setLoading,
      fetchSuccessCallback,
      PER_PAGE,
      page,
    );
  };

  const fetchSuccessCallback = (res, resPagination) => {
    setPagination(resPagination);
    setListing((prevState) =>
      walletSelector.getCurrentPage(resPagination) > 1
        ? [...prevState, ...res]
        : res,
    );
  };

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Rental Income | Owner - CozyHomes" />
      <DesktopLayout
        loading={loading && isEmpty(listing)}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul className="flex-wrap">
                <li>
                  <a href={"/user/owner"}>
                    <CustomText textClassName="text-base text-disable">
                      My Property
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base font-bold">
                    Rental Income
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Icons.leftIconBlack}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">Rental Income</CustomText>
            </div>
          </div>
        }
      >
        <div className="flex flex-col h-full">
          <RentalIncomeComponent data={listing} />

          {hasMorePage ? (
            <div className="flex justify-center pt-4">
              <CustomButton
                buttonClassName="btn-primary min-h-9 h-9 w-32"
                buttonText="Load More"
                textClassName="text-xs"
                loading={loading}
                onClick={() => fetchListing(currentPage + 1)}
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

export default withTranslation("common")(OwnerAuthWrapper(RentalIncome));
