import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomHeader from "@/components/CustomHeader";
import BannerCarousel from "@/components/Explore/BannerCarousel";
import ListingSection from "@/components/Explore/ListingSection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FeaturesSection from "@/components/Explore/FeaturesSection";
import _ from "lodash";
import * as listingAction from "@/src/actions/listing";
import * as listingSelector from "@/src/selectors/listing";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "@/components/LoadingOverlay";
import AuthWrapper from "@/components/AuthWrapper";
import {NextSeo} from "next-seo";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const locale = _.get(router, ["locale"], "en");

  const getListingRequest = () => dispatch(listingAction.getListingRequest());
  const listingData = useSelector((state) =>
    listingSelector.getListingData(state),
  );
  const listingDataLoading = useSelector((state) =>
    listingSelector.getListingDataLoading(state),
  );

  const getListingBannerRequest = () =>
    dispatch(listingAction.getListingBannerRequest());
  const listingBannerData = useSelector((state) =>
    listingSelector.getListingBannerData(state),
  );
  const listingBannerDataLoading = useSelector((state) =>
    listingSelector.getListingBannerDataLoading(state),
  );

  const universityListing = listingSelector.getPopularUniCollege(listingData);
  const condoListing = listingSelector.getPopularCondo(listingData);
  const tagsListing = listingSelector.getTags(listingData);

  const [openSwitcher, setOpenSwitcher] = useState(false);

  const onClickChangeLanguage = (newLocale) => {
    const { pathname, asPath, query } = router;
    setOpenSwitcher(false);
    router.replace({ pathname, query }, asPath, { locale: newLocale });
  };

  useEffect(() => {
    fetchListingData();
    fetchListingBannerData();
  }, []);

  const fetchListingData = () => {
    getListingRequest();
  };

  const fetchListingBannerData = () => {
    getListingBannerRequest();
  };

  const onClickToFilter = () => {
    router.push("/search");
  };

  const onClickToPropertyListing = (key, id) => {
    router.push({
      pathname: `/search`,
      query: { key: key, id: id },
    });
  };

  const onClickOpenSwitcher = () => {
    setOpenSwitcher(!openSwitcher);
  };

  return (
    <CustomHeader hideGoBackButton hideRightButton padding>
      {/*<LanguageSwitcher*/}
      {/*  locale={locale}*/}
      {/*  openSwitcher={openSwitcher}*/}
      {/*  onClickOpenSwitcher={onClickOpenSwitcher}*/}
      {/*  onClickChangeLanguage={onClickChangeLanguage}*/}
      {/*/>*/}
      <NextSeo title="Explore - Spacify Asia" />

      <BannerCarousel
        listingBannerData={listingBannerData}
        listingBannerDataLoading={listingBannerDataLoading}
      />

      <div className="body-container pb-24">
        <FeaturesSection
          onClickToPropertyListing={onClickToPropertyListing}
          tags={tagsListing}
        />

        {/*<ListingSection*/}
        {/*  t={t}*/}
        {/*  title={t("explore.popularCity")}*/}
        {/*  lists={cityListing}*/}
        {/*  listingLoading={listingLoading}*/}
        {/*  className="pb-7"*/}
        {/*  onClickViewMore={onClickToFilter}*/}
        {/*  onClickToPropertyListing={onClickToPropertyListing}*/}
        {/*/>*/}

        <ListingSection
          t={t}
          title={t("explore.popularUniversity")}
          lists={universityListing}
          listingLoading={listingDataLoading}
          className="pb-7"
          onClickViewMore={onClickToFilter}
          onClickToPropertyListing={onClickToPropertyListing}
        />

        <ListingSection
          t={t}
          title={t("explore.popularCondo")}
          lists={condoListing}
          listingLoading={listingDataLoading}
          className="pb-3"
          onClickViewMore={onClickToFilter}
          onClickToPropertyListing={onClickToPropertyListing}
        />
      </div>
    </CustomHeader>
  );
}

export default withTranslation("common")(Home);
