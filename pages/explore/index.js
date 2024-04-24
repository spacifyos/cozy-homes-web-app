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

export { getServerSideProps };

const cityListing = [
  { image: "/images/building/image1.png", title: "Kuala Lumpur" },
  { image: "/images/building/image2.png", title: "Petaling Jaya" },
  { image: "/images/building/image3.png", title: "Subang Jaya" },
  { image: "/images/building/image4.png", title: "Puchong" },
];

const universityListing = [
  { image: "/images/college_university/Inti.png", title: "INTI" },
  { image: "/images/college_university/mia.png", title: "MIA" },
  { image: "/images/college_university/Saito.png", title: "SAITO" },
  { image: "/images/college_university/TARUMT.png", title: "TARUNT" },
  { image: "/images/college_university/UCSI.png", title: "UCSI" },
  { image: "/images/college_university/Uni_KL.png", title: "UNI KL" },
  { image: "/images/college_university/UTAR.png", title: "UTAR" },
  { image: "/images/college_university/UTM.png", title: "UTM" },
  {
    image: "/images/college_university/Victori_Malaysia.png",
    title: "Victori Malaysia",
  },
];

const condoListing = [
  { image: "/images/condo/M_Vertica.png", title: "M Vertica" },
  { image: "/images/condo/MAdora.png", title: "M Adora" },
  { image: "/images/condo/granito.png", title: "Granito" },
  { image: "/images/condo/Sinaran_Residence.png", title: "Sinaran Residence" },
  { image: "/images/condo/Anggun_Residence.png", title: "Anggun Residence" },
];

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const locale = _.get(router, ["locale"], "en");

  const [listingLoading, setListingLoading] = useState(true);
  const [openSwitcher, setOpenSwitcher] = useState(false);

  const onClickChangeLanguage = (newLocale) => {
    const { pathname, asPath, query } = router;
    setOpenSwitcher(false);
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  useEffect(() => {
    setTimeout(() => {
      setListingLoading(false);
    }, 1000);
  }, []);

  const onChangeCity = (value) => {
    console.log(value.target.value);
  };

  const onClickToFilter = () => {
    router.push("/search");
  };

  const onClickToPropertyDetail = () => {
    router.push("/property-overview/1");

  const onClickOpenSwitcher = () => {
    setOpenSwitcher(!openSwitcher);
  };

  return (
    <CustomHeader hideGoBackButton hideRightButton padding>
      <LanguageSwitcher
        locale={locale}
        openSwitcher={openSwitcher}
        onClickOpenSwitcher={onClickOpenSwitcher}
        onClickChangeLanguage={onClickChangeLanguage}
      />

      <BannerCarousel />

      <div className="body-container pb-24">
        <FeaturesSection />
        {/*<div className="grid grid-cols-6 gap-4 pb-7">*/}
        {/*  <CustomInput*/}
        {/*    rightIcon={Images.searchOutlineActiveIcon}*/}
        {/*    className="col-span-5"*/}
        {/*    placeholder={t("explore.keyword")}*/}
        {/*  />*/}

        {/*  <CustomButton*/}
        {/*    buttonClassName="default-btn"*/}
        {/*    icon={Images.filterIcon}*/}
        {/*    onClick={onClickToFilter}*/}
        {/*  />*/}

        {/*  <CustomInput*/}
        {/*    className="col-span-3"*/}
        {/*    placeholder={t("explore.state")}*/}
        {/*  />*/}

        {/*  <CustomSelect*/}
        {/*    className="col-span-3"*/}
        {/*    placeholder={t("explore.city")}*/}
        {/*    optionList={cityList}*/}
        {/*    onChange={onChangeCity}*/}
        {/*  />*/}
        {/*</div>*/}

        <ListingSection
          t={t}
          title={t("explore.popularCity")}
          lists={cityListing}
          listingLoading={listingLoading}
          className="pb-7"
          onClickViewMore={onClickToFilter}
          onClickToPropertyOverview={onClickToPropertyOverview}
        />

        <ListingSection
          t={t}
          title={t("explore.popularUniversity")}
          lists={universityListing}
          listingLoading={listingLoading}
          className="pb-7"
          onClickViewMore={onClickToFilter}
          onClickToPropertyOverview={onClickToPropertyOverview}
        />

        <ListingSection
          t={t}
          title={t("explore.popularCondo")}
          lists={condoListing}
          listingLoading={listingLoading}
          onClickViewMore={onClickToFilter}
          onClickToPropertyOverview={onClickToPropertyOverview}
        />
      </div>
    </CustomHeader>
  );
}

export default withTranslation("common")(Home);
