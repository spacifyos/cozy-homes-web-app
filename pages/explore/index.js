import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomHeader from "@/components/CustomHeader";
import BannerCarousel from "@/components/Explore/BannerCarousel";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import ListingSection from "@/components/Explore/ListingSection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FeaturesSection from "@/components/Explore/FeaturesSection";

export { getServerSideProps };

const cityListing = [
  { image: "/images/building/image1.png", title: "Kuala Lumpur" },
  { image: "/images/building/image2.png", title: "Petaling Jaya" },
  { image: "/images/building/image3.png", title: "Subang Jaya" },
  { image: "/images/building/image4.png", title: "Puchong" },
];

const universityListing = [
  { image: "/images/building/image5.png", title: "UTAR" },
  { image: "/images/building/image6.png", title: "TARUMT" },
  { image: "/images/building/image7.png", title: "INTI" },
  { image: "/images/building/image8.png", title: "ALFA" },
];

const condoListing = [
  { image: "/images/building/image9.png", title: "M Vertica" },
  { image: "/images/building/image10.png", title: "M Adora" },
  { image: "/images/building/image11.png", title: "Granito" },
  { image: "/images/building/image12.png", title: "Sinaran Residence" },
];

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [listingLoading, setListingLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setListingLoading(false);
    }, 1000);
  }, []);

  const onClickToFilter = () => {
    router.push("/filter");
  };

  const onClickToPropertyDetail = () => {
    router.push("/property-detail");
  };

  return (
    <CustomHeader hideGoBackButton hideRightButton padding>
      <LanguageSwitcher />

      <BannerCarousel />

      <div className="body-container">
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
          onClickToPropertyDetail={onClickToPropertyDetail}
        />

        <ListingSection
          t={t}
          title={t("explore.popularUniversity")}
          lists={universityListing}
          listingLoading={listingLoading}
          className="pb-7"
          onClickViewMore={onClickToFilter}
          onClickToPropertyDetail={onClickToPropertyDetail}
        />

        <ListingSection
          t={t}
          title={t("explore.popularCondo")}
          lists={condoListing}
          listingLoading={listingLoading}
          onClickViewMore={onClickToFilter}
          onClickToPropertyDetail={onClickToPropertyDetail}
        />
      </div>
    </CustomHeader>
  );
}

export default withTranslation("common")(Home);
