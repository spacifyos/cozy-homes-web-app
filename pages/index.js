import { withTranslation, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { get, isEmpty, map, toString } from "lodash";
import * as listingAction from "@/src/actions/listing";
import * as listingSelector from "@/src/selectors/listing";
import { useDispatch, useSelector } from "react-redux";
import { NextSeo } from "next-seo";
import DesktopBanner from "@/components/Explore/DesktopBanner";
import DesktopSearchBar from "@/components/Explore/DesktopSearchBar";
import DesktopLayout from "@/components/DesktopLayout";
import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import Image from "next/image";
import DesktopPopularCitySection from "@/components/Explore/DesktopPopularCitySection";
import DesktopFeaturedRoomSection from "@/components/Explore/DesktopFeaturedRoomSection";
import DesktopPopularUniversitySection from "@/components/Explore/DesktopPopularUniversitySection";
import DesktopCheapestRoomSection from "@/components/Explore/DesktopCheapestRoomSection";
import DesktopPromotionSection from "@/components/Explore/DesktopPromotionSection";
import * as commonSelector from "@/src/selectors/common";
import AuthManager from "@/src/utils/AuthManager";
import CustomImage from "@/components/CustomImage";

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
    // handleEventModalOpen();
  }, []);

  // const handleEventModalOpen = () => {
  //   Helper.documentGetElementById("event-modal").showModal();
  // };

  const fetchListingData = () => {
    getListingRequest();
  };

  const fetchListingBannerData = () => {
    getListingBannerRequest();
  };

  const onClickToSearch = (keyword, state, city) => {
    const params = [];
    if (keyword) params.push(`s=${encodeURIComponent(keyword)}`);
    if (state) params.push(`state=${encodeURIComponent(state)}`);
    if (city) params.push(`c=${encodeURIComponent(city)}`);

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
        title={`Explore available rooms for rent anywhere in malaysia | Spacify.asia`}
        description={`Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!`}
        canonical={process.env.DOMAIN}
        openGraph={{
          url: process.env.DOMAIN,
          title: `Explore available rooms for rent anywhere in malaysia | Spacify.asia`,
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

      <a
        target="_blank"
        href={`https://wa.me/+601137354267`}
        className="fixed bottom-10 right-6 z-10"
      >
        <CustomImage src={Images.beliveWhatsAppIcon} className="w-16 h-16" />
      </a>

      <DesktopLayout hideNav>
        <div className="relative xl:h-96">
          <Image
            loader={() => "/images/desktop_banner.webp"}
            // loading="lazy"
            alt={"image"}
            src={"/images/desktop_banner.webp"}
            width={0}
            height={0}
            className="xl:block lg:block md:block sm:hidden hidden xl:object-cover lg:object-cover md:object-contain sm:object-contain object-contain xl:h-125 lg:125 md:h-full"
            style={{ width: "100%" }}
          />

          <Image
            loader={() => "/images/desktop_banner.webp"}
            // loading="lazy"
            alt={"image"}
            src={"/images/desktop_banner.webp"}
            width={0}
            height={0}
            className="xl:hidden lg:hidden md:hidden sm:block block md:object-cover sm:object-cover object-cover"
            style={{ width: "100%", height: 200 }}
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
            <CustomText textClassName="primary-text font-bold xl:text-2xl lg:text-2xl md:text-xl sm:text-lg text-md">
              Space For All
            </CustomText>
            <CustomText textClassName="italic text-center xl:text-base lg:text-base md:text-sm sm:text-sm text-xs ">
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
        </div>
      </DesktopLayout>

      {/*<EventBanner />*/}

      {/*<BottomNavigate*/}
      {/*  t={t}*/}
      {/*  routeName={routeName}*/}
      {/*  routeQuery={routeQuery}*/}
      {/*  onClickChangeTab={onClickChangeTab}*/}
      {/*/>*/}
    </div>
  );
}

export default Home;
