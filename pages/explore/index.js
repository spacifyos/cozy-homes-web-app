import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomHeader from "@/components/CustomHeader";
import BannerCarousel from "@/components/Explore/BannerCarousel";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import ListingSection from "@/components/Explore/ListingSection";

export { getServerSideProps };

const cityList = [
  { name: "Skudai", value: "skudai" },
  { name: "Kluang", value: "kluang" },
  { name: "Batu Pahat", value: "batu pahat" },
];

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const onChangeCity = (value) => {
    console.log(value.target.value);
  };

  const onClickToFilter = () => {
    router.push("/filter");
  };

  return (
    <CustomHeader hideGoBackButton padding>
      <div className="pb-24">
        <BannerCarousel />

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

        <ListingSection lists={Array(6)} />
      </div>
    </CustomHeader>
  );
}

export default withTranslation("common")(Home);
