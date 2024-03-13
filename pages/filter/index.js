import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomSelect from "@/components/CustomSelect";
import { useRouter } from "next/router";
import AmenitiesComponent from "@/components/Fliter/AmenitiesComponent";
import ListingCardComponent from "@/components/Fliter/ListingCardComponent";
import _ from "lodash";

const cityList = [
  { name: "Skudai", value: "skudai" },
  { name: "Kluang", value: "kluang" },
  { name: "Batu Pahat", value: "batu pahat" },
];

const amenitiesList = [
  {
    name: "Whole Unit",
    icon: Images.unitAmenitiesIcon,
    isActive: false,
  },
  {
    name: "Room City",
    icon: Images.bedAmenitiesIcon,
    isActive: true,
  },
  {
    name: "Window",
    icon: Images.windowAmenitiesIcon,
    isActive: true,
  },
  {
    name: "Female Unit",
    icon: Images.femaleAmenitiesIcon,
    isActive: true,
  },
  {
    name: "Private Bathroom",
    icon: Images.bathAmenitiesIcon,
    isActive: false,
  },
  {
    name: "Air-conditioner",
    icon: Images.aircornAmenitiesIcon,
    isActive: false,
  },
  {
    name: "WiFi",
    icon: Images.wifiAmenitiesIcon,
    isActive: false,
  },
  {
    name: "Laundry Area",
    icon: Images.laundryAmenitiesIcon,
    isActive: true,
  },
  {
    name: "Kitchen",
    icon: Images.cookAmenitiesIcon,
    isActive: true,
  },
  {
    name: "Swimming Pool",
    icon: Images.swimmingAmenitiesIcon,
    isActive: false,
  },
  {
    name: "GYM Room",
    icon: Images.gymAmenitiesIcon,
    isActive: false,
  },
];

const optionList = [
  {
    name: "Sort by: Price (Low to high)",
    value: "Sort by: Price (Low to high)",
  },
];

const Filter = () => {
  const router = useRouter();

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader pageTitle="Search" hideBgImage onClickGoBack={onClickGoBack}>
      <div className="grid grid-cols-4 gap-2 pb-7">
        <CustomInput
          rightIcon={Images.searchOutlineActiveIcon}
          className="col-span-2"
          placeholder="Keyword"
        />

        <CustomInput placeholder="State" />

        <CustomSelect placeholder="City" optionList={cityList} />
      </div>

      <div className="grid grid-cols-4 gap-5 pb-7">
        <div>
          <AmenitiesComponent list={amenitiesList} />
        </div>

        <div className="col-span-3">
          <div className="flex pb-5 justify-end">
            <CustomSelect
              className="w-3/4"
              optionList={optionList}
              placeholder="Sort by: Price (Low to high)"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 ">
            {_.map(Array(12), (item) => (
              <ListingCardComponent />
            ))}
          </div>
        </div>
      </div>
    </CustomHeader>
  );
};

export default Filter;
