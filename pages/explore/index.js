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
import AuthManager from "@/src/utils/AuthManager";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const locale = get(router, ["locale"], "en");
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");

  const queryReferralCode = get(router, ["query", "referral_code"], "");

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

  useEffect(() => {
    if (!isEmpty(queryReferralCode)) {
      AuthManager.setReferralCode(queryReferralCode);
    }
  }, [queryReferralCode]);

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

  const onClickToSearch = (keyword, state, city) => {
    const params = [];
    if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);
    if (state) params.push(`state=${encodeURIComponent(state)}`);
    if (city) params.push(`city=${encodeURIComponent(city)}`);

    const queryString = params.length > 0 ? `?${params.join("&")}` : "";

    router.push(`/search${queryString}`);
  };

  const onClickOpenSwitcher = () => {
    setOpenSwitcher(!openSwitcher);
  };

  const onClickChangeTab = (route) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo
        title={`Explore Available Rooms for Rent Anytime, Anywhere in Malaysia | ${process.env.DOMAIN}`}
        description={`Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!`}
        canonical={process.env.DOMAIN}
        openGraph={{
          url: process.env.DOMAIN,
          title: `Explore Available Rooms for Rent Anytime, Anywhere in Malaysia | ${process.env.DOMAIN}`,
          description: `Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!`,
          images: [
            {
              url: Images.logoImage,
              width: 800,
              height: 600,
              alt: `Spacify Image`,
            },
          ],
          siteName: `${process.env.DOMAIN}`,
        }}
      />

      <DesktopLayout hideNav>
        <div className="relative xl:h-96">
          <Image
            loader={() => "/images/desktop_banner.png"}
            loading="lazy"
            alt={"image"}
            src={"/images/desktop_banner.png"}
            width={0}
            height={0}
            className="xl:block lg:block md:block sm:hidden hidden xl:object-cover lg:object-cover md:object-contain sm:object-contain object-contain xl:h-125 lg:125 md:h-full sm:full h-full"
            style={{ width: "100%" }}
          />

          <DesktopSearchBar
            optionList={selectOptionData}
            searchTypeValue={searchTypeValue}
            setSearchTypeValue={setSearchTypeValue}
            onClickSearch={onClickToSearch}
          />
        </div>

        <div className="xl:pt-52">
          <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col justify-center items-center gap-4 container mx-auto">
            <CustomText
              textClassName="primary-text font-bold"
              styles={{ fontSize: 24 }}
            >
              Space For All
            </CustomText>
            <CustomText textClassName="italic text-center">
              Provides the safe and innovative platform for you need to ﬁnd your
              dream space.
            </CustomText>
          </div>

          <DesktopBanner imageData={listingBannerData} />

          <div className="bg-color xl:py-10 lg:py-8 md:py-6 sm:py-6 py-4">
            <DesktopPopularCitySection
              onClickViewMore={onClickToSearch}
              data={popularCity}
              loading={listingDataLoading}
            />
          </div>

          <DesktopFeaturedRoomSection
            data={featuredRooms}
            loading={listingDataLoading}
            onClickViewMore={onClickToSearch}
          />

          <div className="bg-color xl:py-10 lg:py-8 md:py-6 sm:py-6 py-4">
            <DesktopPopularUniversitySection
              data={popularUniversity}
              loading={listingDataLoading}
              onClickViewMore={onClickToSearch}
            />
          </div>

          <DesktopCheapestRoomSection
            data={cheapestRooms}
            loading={listingDataLoading}
            onClickViewMore={onClickToSearch}
          />

          <div className="primary-bg-color xl:py-10 lg:py-8 md:py-6 sm:py-6 py-4">
            <DesktopPromotionSection
              data={specialPromotion}
              loading={listingDataLoading}
              onClickViewMore={onClickToSearch}
            />
          </div>

          {/*<DesktopBanner imageData={listingBannerData} />*/}
        </div>
      </DesktopLayout>

      <BottomNavigate
        t={t}
        routeName={routeName}
        routeQuery={routeQuery}
        onClickChangeTab={onClickChangeTab}
      />
    </div>
  );
}

export default withTranslation("common")(Home);
