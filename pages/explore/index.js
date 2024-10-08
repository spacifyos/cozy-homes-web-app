import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomHeader from "@/components/CustomHeader";
import BannerCarousel from "@/components/Explore/BannerCarousel";
import ListingSection from "@/components/Explore/ListingSection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FeaturesSection from "@/components/Explore/FeaturesSection";
import { get, isEmpty, map } from "lodash";
import * as listingAction from "@/src/actions/listing";
import * as listingSelector from "@/src/selectors/listing";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "@/components/LoadingOverlay";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import BottomNavigate from "@/components/BottomNavigate";
import DesktopBanner from "@/components/Explore/DesktopBanner";
import DesktopSearchBar from "@/components/Explore/DesktopSearchBar";
import DesktopLayout from "@/components/DesktopLayout";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import DesktopPopularCitySection from "@/components/Explore/DesktopPopularCitySection";
import DesktopFeaturedRoomSection from "@/components/Explore/DesktopFeaturedRoomSection";
import DesktopPopularUniversitySection from "@/components/Explore/DesktopPopularUniversitySection";
import DesktopCheapestRoomSection from "@/components/Explore/DesktopCheapestRoomSection";
import DesktopPromotionSection from "@/components/Explore/DesktopPromotionSection";
import SignInModal from "@/components/Explore/SignInModal";
import Helper from "@/src/utils/Helper";

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

  const onClickOpenSwitcher = () => {
    setOpenSwitcher(!openSwitcher);
  };

  const onClickChangeTab = (route) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Explore - Spacify Asia" />

      <DesktopLayout hideNav>
        <div className="relative" style={{ height: 400 }}>
          <DesktopBanner />

          <DesktopSearchBar />
        </div>

        <div className="pt-60">
          <div className="flex justify-center items-center gap-4 pb-10 container mx-auto">
            <CustomText
              textClassName="primary-text font-bold"
              styles={{ fontSize: 24 }}
            >
              Space For All
            </CustomText>
            <CustomText textClassName="italic">
              Provides the safe and innovative platform for you need to ﬁnd your
              dream space.
            </CustomText>
          </div>

          <div className="grid grid-cols-2 gap-10 pb-10 container mx-auto">
            <div
              className="col-span-1 relative global-box-shadow global-border-radius"
              style={{ height: 350 }}
            >
              <Image
                src={Images.imageNotFound}
                sizes="100vw"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            <div
              className="col-span-1 relative global-box-shadow global-border-radius"
              style={{ height: 350 }}
            >
              <Image
                src={Images.imageNotFound}
                sizes="100vw"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="bg-color py-10">
            <DesktopPopularCitySection onClickToFilter={onClickToFilter} />
          </div>

          <DesktopFeaturedRoomSection />

          <div className="bg-color py-10">
            <DesktopPopularUniversitySection />
          </div>

          <DesktopCheapestRoomSection />

          <div className="primary-bg-color py-10">
            <DesktopPromotionSection />
          </div>

          <div className="grid grid-cols-2 gap-10 py-10 container mx-auto">
            <div
              className="col-span-1 relative global-box-shadow global-border-radius"
              style={{ height: 350 }}
            >
              <Image
                src={Images.imageNotFound}
                sizes="100vw"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            <div
              className="col-span-1 relative global-box-shadow global-border-radius"
              style={{ height: 350 }}
            >
              <Image
                src={Images.imageNotFound}
                sizes="100vw"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </DesktopLayout>

      <div className="bg-color pt-7 mobile-responsive">
        {/*<LanguageSwitcher*/}
        {/*  locale={locale}*/}
        {/*  openSwitcher={openSwitcher}*/}
        {/*  onClickOpenSwitcher={onClickOpenSwitcher}*/}
        {/*  onClickChangeLanguage={onClickChangeLanguage}*/}
        {/*/>*/}

        <BannerCarousel
          listingBannerData={listingBannerData}
          listingBannerDataLoading={listingBannerDataLoading}
        />

        <div className="body-container pb-24">
          <FeaturesSection tags={tagsListing} />

          {/*<ListingSection*/}
          {/*  t={t}*/}
          {/*  title={t("explore.popularCity")}*/}
          {/*  lists={cityListing}*/}
          {/*  listingLoading={listingLoading}*/}
          {/*  className="pb-7"*/}
          {/*  onClickViewMore={onClickToFilter}*/}
          {/*/>*/}

          <ListingSection
            t={t}
            title={t("explore.popularUniversity")}
            lists={universityListing}
            listingLoading={listingDataLoading}
            className="pb-7"
            onClickViewMore={onClickToFilter}
          />

          <ListingSection
            t={t}
            title={t("explore.popularCondo")}
            lists={condoListing}
            listingLoading={listingDataLoading}
            className="pb-3"
            onClickViewMore={onClickToFilter}
          />
        </div>

        <BottomNavigate t={t} routeName={routeName} routeQuery={routeQuery} />
      </div>
    </div>
  );
}

export default withTranslation("common")(Home);
