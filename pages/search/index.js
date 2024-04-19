import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomSelect from "@/components/CustomSelect";
import { useRouter } from "next/router";
import AmenitiesComponent from "@/components/Search/AmenitiesComponent";
import ListingCardComponent from "@/components/Search/ListingCardComponent";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/Skeleton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import TagComponent from "@/components/Search/TagComponent";

export { getServerSideProps };

const cityList = [
  { name: "Skudai", value: "skudai" },
  { name: "Kluang", value: "kluang" },
  { name: "Batu Pahat", value: "batu pahat" },
];

const amenitiesList = [
  {
    name: "Whole Unit",
    icon: Images.unitAmenitiesIcon,
    iconActive: Images.unitAmenitiesIconActive,
    isActive: false,
  },
  {
    name: "Room City",
    icon: Images.bedAmenitiesIcon,
    iconActive: Images.bedAmenitiesIconActive,
    isActive: true,
  },
  {
    name: "Window",
    icon: Images.windowAmenitiesIcon,
    iconActive: Images.windowAmenitiesIconActive,
    isActive: true,
  },
  {
    name: "Female Unit",
    icon: Images.femaleAmenitiesIcon,
    iconActive: Images.femaleAmenitiesIconActive,
    isActive: true,
  },
  {
    name: "Private Bathroom",
    icon: Images.bathAmenitiesIcon,
    iconActive: Images.bathAmenitiesIconActive,
    isActive: false,
  },
  {
    name: "Air-conditioner",
    icon: Images.aircornAmenitiesIcon,
    iconActive: Images.aircornAmenitiesIconActive,
    isActive: false,
  },
  {
    name: "WiFi",
    icon: Images.wifiAmenitiesIcon,
    iconActive: Images.wifiAmenitiesIconActive,
    isActive: false,
  },
  {
    name: "Laundry Area",
    icon: Images.laundryAmenitiesIcon,
    iconActive: Images.laundryAmenitiesIconActive,
    isActive: true,
  },
  {
    name: "Kitchen",
    icon: Images.cookAmenitiesIcon,
    iconActive: Images.cookAmenitiesIconActive,
    isActive: true,
  },
  {
    name: "Swimming Pool",
    icon: Images.swimmingAmenitiesIcon,
    iconActive: Images.swimmingAmenitiesIconActive,
    isActive: false,
  },
  {
    name: "GYM Room",
    icon: Images.gymAmenitiesIcon,
    iconActive: Images.gymAmenitiesIconActive,
    isActive: false,
  },
];

const Filter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const amenitiesTarget = useRef();
  const [dimensions, setDimensions] = useState(0);
  const [scrollTop, setScrollTop] = useState(235);

  useEffect(() => {
    if (amenitiesTarget.current) {
      setDimensions(amenitiesTarget.current.offsetWidth);
    }
  }, [amenitiesTarget]);

  useEffect(() => {
    const handleScroll = _.debounce(() => {
      const currentPosition = window.scrollY;
      setScrollTop(currentPosition >= 223 ? 10 : 235 - currentPosition);
    }, 1);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [tagList, setTagList] = useState([
    { name: "Verified Room", isActive: false },
    { name: "Verified Host", isActive: false },
    { name: "Zero Deposit", isActive: false },
    { name: "6 months", isActive: false },
  ]);
  const [tagList2, setTagList2] = useState([
    { name: "TARUMT", isActive: false },
    { name: "UTAR", isActive: false },
    { name: "ALFA", isActive: false },
    { name: "CATS", isActive: false },
    { name: "SUNWAY", isActive: false },
    { name: "INTI", isActive: false },
    { name: "UTM", isActive: false },
  ]);
  const [iconList, setIconList] = useState(amenitiesList);
  const [listingLoading, setListingLoading] = useState(true);

  const optionList = [
    {
      name: t("search.sortBy") + ": " + t("search.priceLowToHigh"),
      value: "Sort by: Price (Low to High)",
    },
    {
      name: t("search.sortBy") + ": " + t("search.priceHighToLow"),
      value: "Sort by: Price (High to Low)",
    },
  ];

  const onClickSelectTag = (tag) => {
    setTagList((prevState) => {
      return _.map(prevState, (item) => {
        if (_.get(item, ["name"], "") === tag) {
          console.log(tag);
          return {
            ...item,
            ...{ isActive: !_.get(item, ["isActive"], false) },
          };
        } else {
          return {
            ...item,
          };
        }
      });
    });
  };

  const onClickSelectTag2 = (tag) => {
    setTagList2((prevState) => {
      return _.map(prevState, (item) => {
        if (_.get(item, ["name"], "") === tag) {
          console.log(tag);
          return {
            ...item,
            ...{ isActive: !_.get(item, ["isActive"], false) },
          };
        } else {
          return {
            ...item,
          };
        }
      });
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setListingLoading(false);
    }, 1000);
  }, []);

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSelectAmenities = (name) => {
    setIconList((prevState) => {
      return _.map(prevState, (item) => {
        if (_.get(item, ["name"], "") === name) {
          return {
            ...item,
            ...{ isActive: !_.get(item, ["isActive"], false) },
          };
        } else {
          return {
            ...item,
          };
        }
      });
    });
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.search")}
      hideBgImage
      hideRightButton
      onClickGoBack={onClickGoBack}
    >
      <div className="grid grid-cols-4 gap-2 pb-5 global-horizontal-padding">
        <CustomInput
          rightIcon={Images.searchOutlineActiveIcon}
          className="col-span-2"
          placeholder={t("search.keyword")}
        />

        <CustomInput placeholder={t("search.state")} />

        <CustomSelect placeholder={t("search.city")} optionList={cityList} />
      </div>

      <div className="pb-3 pl-4">
        <TagComponent lists={tagList} onClickSelectTag={onClickSelectTag} />

        <TagComponent lists={tagList2} onClickSelectTag={onClickSelectTag2} />
      </div>

      <div className="pb-4">
        <div className="w-full flex gap-5">
          <div className="w-1/5" ref={amenitiesTarget}>
            <div
              className="fixed"
              style={{
                width: dimensions,
                top: scrollTop,
              }}
            >
              <AmenitiesComponent
                list={iconList}
                onClickSelectAmenities={onClickSelectAmenities}
              />
            </div>
          </div>

          <div className="w-4/5 pr-4">
            <div className="flex pb-5 justify-end">
              <CustomSelect
                styles={{ width: "75%" }}
                optionList={optionList}
                placeholder={
                  t("search.sortBy") + ": " + t("search.priceLowToHigh")
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {listingLoading
                ? _.map(Array(4), (item) => (
                    <Skeleton width="100%" height={140} />
                  ))
                : _.map(Array(12), (item) => (
                    <ListingCardComponent
                      listingLoading={listingLoading}
                      t={t}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(Filter);
