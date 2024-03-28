import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomSelect from "@/components/CustomSelect";
import { useRouter } from "next/router";
import AmenitiesComponent from "@/components/Fliter/AmenitiesComponent";
import ListingCardComponent from "@/components/Fliter/ListingCardComponent";
import _ from "lodash";
import { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";

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

const optionList = [
  {
    name: "Sort by: Price (Low to High)",
    value: "Sort by: Price (Low to High)",
  },
  {
    name: "Sort by: Price (High to Low)",
    value: "Sort by: Price (High to Low)",
  },
];

const Filter = () => {
  const router = useRouter();

  const [iconLiat, setIconList] = useState(amenitiesList);
  const [listingLoading, setListingLoading] = useState(true);

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
    <CustomHeader pageTitle="Search" hideBgImage onClickGoBack={onClickGoBack}>
      <div className="body-container" style={{ paddingBottom: 0 }}>
        <div className="grid grid-cols-4 gap-2 pb-7">
          <CustomInput
            rightIcon={Images.searchOutlineActiveIcon}
            className="col-span-2"
            placeholder="Keyword"
          />

          <CustomInput placeholder="State" />

          <CustomSelect placeholder="City" optionList={cityList} />
        </div>

        <div className="w-full pb-7 flex gap-5">
          <div className="w-1/5">
            <AmenitiesComponent
              list={iconLiat}
              onClickSelectAmenities={onClickSelectAmenities}
            />
          </div>

          <div className="w-4/5">
            <div className="flex pb-5 justify-end">
              <CustomSelect
                styles={{ width: "75%" }}
                optionList={optionList}
                placeholder="Sort by: Price (Low to high)"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 ">
              {_.map(Array(12), (item) =>
                listingLoading ? (
                  <Skeleton />
                ) : (
                  <ListingCardComponent listingLoading={listingLoading} />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default Filter;
