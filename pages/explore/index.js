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

export { getServerSideProps };

const cityListing = [
  { image: "/images/building/image1.png", title: "Kuala Lumpur" },
  { image: "/images/building/image2.png", title: "Petaling Jaya" },
  { image: "/images/building/image3.png", title: "Subang Jaya" },
  { image: "/images/building/image4.png", title: "Puchong" },
];

// const universityListing = [
//   { image: "/images/college_university/Inti.png", title: "INTI" },
//   { image: "/images/college_university/mia.png", title: "MIA" },
//   { image: "/images/college_university/Saito.png", title: "SAITO" },
//   { image: "/images/college_university/TARUMT.png", title: "TARUNT" },
//   { image: "/images/college_university/UCSI.png", title: "UCSI" },
//   { image: "/images/college_university/Uni_KL.png", title: "UNI KL" },
//   { image: "/images/college_university/UTAR.png", title: "UTAR" },
//   { image: "/images/college_university/UTM.png", title: "UTM" },
//   {
//     image: "/images/college_university/Victori_Malaysia.png",
//     title: "Victori Malaysia",
//   },
// ];

// const condoListing = [
//   { image: "/images/condo/M_Vertica.png", title: "M Vertica" },
//   { image: "/images/condo/MAdora.png", title: "M Adora" },
//   { image: "/images/condo/granito.png", title: "Granito" },
//   { image: "/images/condo/Sinaran_Residence.png", title: "Sinaran Residence" },
//   { image: "/images/condo/Anggun_Residence.png", title: "Anggun Residence" },
// ];

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

      <BannerCarousel
        listingBannerData={listingBannerData}
        listingBannerDataLoading={listingBannerDataLoading}
      />

      <div className="body-container pb-4">
        <FeaturesSection onClickToPropertyListing={onClickToPropertyListing} tags={tagsListing} />

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
