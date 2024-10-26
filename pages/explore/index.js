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
import * as commonSelector from "@/src/selectors/common";
import { getMobileImageUrl } from "@/src/selectors/listing";

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
  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );

  const banner1 = listingSelector.getMobileImageUrl(
    listingBannerData && listingBannerData[0],
  );
  const banner2 = listingSelector.getMobileImageUrl(
    listingBannerData && listingBannerData[1],
  );

  const tagsListing = listingSelector.getTags(listingData);

  const [openSwitcher, setOpenSwitcher] = useState(false);
  const [searchTypeValue, setSearchTypeValue] = useState("coLiving");

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

          <DesktopSearchBar
            optionList={selectOptionData}
            searchTypeValue={searchTypeValue}
            setSearchTypeValue={setSearchTypeValue}
            onClickSearch={onClickToFilter}
          />
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
                loader={() => banner1}
                loading="lazy"
                src={isEmpty(banner1) ? Images.imageNotFound : banner1}
                sizes="100vw"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div
              className="col-span-1 relative global-box-shadow global-border-radius"
              style={{ height: 350 }}
            >
              <Image
                loader={() => banner2}
                loading="lazy"
                src={isEmpty(banner2) ? Images.imageNotFound : banner2}
                sizes="100vw"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="bg-color py-10">
            <DesktopPopularCitySection
              onClickViewMore={onClickToFilter}
              data={popularCity}
              loading={listingDataLoading}
            />
          </div>

          <DesktopFeaturedRoomSection
            data={featuredRooms}
            loading={listingDataLoading}
            onClickViewMore={onClickToFilter}
          />

          <div className="bg-color py-10">
            <DesktopPopularUniversitySection
              data={popularUniversity}
              loading={listingDataLoading}
              onClickViewMore={onClickToFilter}
            />
          </div>

          <DesktopCheapestRoomSection
            data={cheapestRooms}
            loading={listingDataLoading}
            onClickViewMore={onClickToFilter}
          />

          <div className="primary-bg-color py-10">
            <DesktopPromotionSection
              data={specialPromotion}
              loading={listingDataLoading}
              onClickViewMore={onClickToFilter}
            />
          </div>

          <div className="grid grid-cols-2 gap-10 py-10 container mx-auto">
            <div
              className="col-span-1 relative global-box-shadow global-border-radius"
              style={{ height: 350 }}
            >
              <Image
                loader={() => banner1}
                loading="lazy"
                src={isEmpty(banner1) ? Images.imageNotFound : banner1}
                sizes="100vw"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div
              className="col-span-1 relative global-box-shadow global-border-radius"
              style={{ height: 350 }}
            >
              <Image
                loader={() => banner2}
                loading="lazy"
                src={isEmpty(banner2) ? Images.imageNotFound : banner2}
                sizes="100vw"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </DesktopLayout>

      <div className="bg-color pt-7 pb-24 mobile-responsive">
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
    </div>
  );
}

export default withTranslation("common")(Home);
