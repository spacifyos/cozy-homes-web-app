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
import CustomText from "@/components/CustomText";

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
    <div className="bg-color pt-7 pb-24">
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

      <div className="body-container">
        <FeaturesSection tags={tagsListing} />
      </div>

      <ListingSection
        t={t}
        title={
          <CustomText textClassName="font-bold primary-text">
            Popular City
          </CustomText>
        }
        lists={popularCity}
        listingLoading={listingDataLoading}
        className="pb-7"
        onClickViewMore={onClickToFilter}
      />

      <div className="primaryWhite-bg-color py-7">
        <ListingSection
          t={t}
          title={
            <div className="flex">
              <CustomText textClassName="font-bold primary-text pr-1">
                Featured Rooms
              </CustomText>
              <CustomText textClassName="font-bold">Just For You</CustomText>
            </div>
          }
          lists={featuredRooms}
          listingLoading={listingDataLoading}
          onClickViewMore={onClickToFilter}
        />
      </div>

      <ListingSection
        t={t}
        title={
          <CustomText textClassName="font-bold primary-text">
            Popular University/College
          </CustomText>
        }
        lists={popularUniversity}
        listingLoading={listingDataLoading}
        className="py-7"
        onClickViewMore={onClickToFilter}
      />

      <div className="primaryWhite-bg-color py-7">
        <ListingSection
          t={t}
          title={
            <div className="flex">
              <CustomText textClassName="font-bold primary-text pr-1">
                Cheapest Rooms
              </CustomText>
              <CustomText textClassName="font-bold">Just For You</CustomText>
            </div>
          }
          lists={cheapestRooms}
          listingLoading={listingDataLoading}
          onClickViewMore={onClickToFilter}
        />
      </div>

      <div className="primary-bg-color py-7">
        <ListingSection
          t={t}
          title={
            <div className="flex items-center">
              <CustomText textClassName="font-size-large italic white-text pr-1">
                Special
              </CustomText>
              <CustomText textClassName="font-bold italic white-text">
                Promotion
              </CustomText>
            </div>
          }
          lists={specialPromotion}
          listingLoading={listingDataLoading}
          onClickViewMore={onClickToFilter}
          hideLabel
          hideViewMore
        />
      </div>

      <BottomNavigate t={t} routeName={routeName} routeQuery={routeQuery} />
    </div>
  );
}

export default withTranslation("common")(Home);
