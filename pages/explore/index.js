import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomHeader from "@/components/CustomHeader";
import BannerCarousel from "@/components/Explore/BannerCarousel";
import ListingSection from "@/components/Explore/ListingSection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FeaturesSection from "@/components/Explore/FeaturesSection";
import { get } from "lodash";
import * as listingAction from "@/src/actions/listing";
import * as listingSelector from "@/src/selectors/listing";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "@/components/LoadingOverlay";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import BottomNavigate from "@/components/BottomNavigate";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const locale = get(router, ["locale"], "en");
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");

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

  const cheapestRooms = listingSelector.getCheapestRooms(listingData);
  const featuredRooms = listingSelector.getFeaturedRooms(listingData);
  const popularCity = listingSelector.getPopularCity(listingData);
  const popularUniversity = listingSelector.getPopularUniversity(listingData);
  const specialPromotion = listingSelector.getSpecialPromotion(listingData);
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

  const onClickOpenSwitcher = () => {
    setOpenSwitcher(!openSwitcher);
  };

  const onClickChangeTab = (route) => {
    router.push(route);
  };

  return (
    <div className="bg-color pt-7">
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
        <FeaturesSection tags={tagsListing} />

        <ListingSection
          t={t}
          title={t("explore.popularCity")}
          lists={popularCity}
          listingLoading={listingDataLoading}
          className="pb-7"
          onClickViewMore={onClickToFilter}
        />

        <ListingSection
          t={t}
          title={"Featured Rooms Just For You"}
          lists={featuredRooms}
          listingLoading={listingDataLoading}
          className="pb-7"
          onClickViewMore={onClickToFilter}
        />

        <ListingSection
          t={t}
          title={"Popular University/College"}
          lists={popularUniversity}
          listingLoading={listingDataLoading}
          className="pb-3"
          onClickViewMore={onClickToFilter}
        />

        <ListingSection
          t={t}
          title={"Cheapest Rooms Just For You"}
          lists={cheapestRooms}
          listingLoading={listingDataLoading}
          className="pb-3"
          onClickViewMore={onClickToFilter}
        />

        <ListingSection
          t={t}
          title={"Special Promotion"}
          lists={specialPromotion}
          listingLoading={listingDataLoading}
          className="pb-3"
          onClickViewMore={onClickToFilter}
        />
      </div>

      <BottomNavigate t={t} routeName={routeName} routeQuery={routeQuery} />
    </div>
  );
}

export default withTranslation("common")(Home);
