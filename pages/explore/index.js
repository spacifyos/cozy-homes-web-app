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

export { getServerSideProps };

const cityList = [
  { name: "Skudai", value: "skudai" },
  { name: "Kluang", value: "kluang" },
  { name: "Batu Pahat", value: "batu pahat" },
];

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("City");
  const [listingLoading, setListingLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setListingLoading(false);
    }, 1000);
  }, []);

  const onChangeCity = (value) => {
    console.log(value.target.value);
  };

  const onClickToFilter = () => {
    router.push("/filter");
  };

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CustomHeader hideGoBackButton padding>
      <BannerCarousel />

      <div className="body-container">
        <div className="grid grid-cols-6 gap-4 pb-7">
          <CustomInput
            rightIcon={Images.searchOutlineActiveIcon}
            className="col-span-5"
            placeholder="Keyword"
          />

          <CustomButton
            buttonClassName="default-btn"
            icon={Images.filterIcon}
            onClick={onClickToFilter}
          />

          <CustomInput className="col-span-3" placeholder="State" />

          <CustomSelect
            className="col-span-3"
            placeholder="City"
            optionList={cityList}
            onChange={onChangeCity}
          />
        </div>

        <ListingSection
          lists={Array(6)}
          onClickSelectCategory={onClickSelectCategory}
          selectedCategory={selectedCategory}
          listingLoading={listingLoading}
        />
      </div>
    </CustomHeader>
  );
}

export default withTranslation("common")(Home);
