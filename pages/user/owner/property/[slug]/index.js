import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import PropertyInfoComponent from "@/components/Owner/PropertyInfoComponent";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as ownerSelector from "@/src/selectors/owner";
import UnitCarouselComponent from "@/components/OwnerProperty/UnitCarouselComponent";
import { get, isEmpty, filter, isEqual, map } from "lodash";
import SpaceDetailComponent from "@/components/OwnerProperty/SpaceDetailComponent";
import CustomButton from "@/components/CustomButton";
import RentTrackerComponent from "@/components/OwnerProperty/RentTrackerComponent";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import moment from "moment";

export { getServerSideProps };

const PropertyDetail = ({ id }) => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("Space Details");

  const [propertyDetail, setPropertyDetail] = useState(null);
  const [propertyDetailLoading, setPropertyDetailLoading] = useState(false);

  const [rentTrackerData, setRentTrackerData] = useState(null);
  const [rentTrackerDataLoading, setRentTrackerDataLoading] = useState(false);

  const [selectedSlide, setSelectedSlide] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [selectedUnitID, setSelectedUnitID] = useState(0);

  const [yearValue, setYearValue] = useState(moment().format("YYYY"));

  const propertyName = ownerSelector.getPropertyName(propertyDetail);
  const propertyAddress = ownerSelector.getPropertyAddress(propertyDetail);
  const units = ownerSelector.getUnits(propertyDetail);
  const lists = [
    {
      name: "Unit",
      value: ownerSelector.getTotalUnits(propertyDetail),
      icon: Images.spaceIcon,
    },
    {
      name: "Room",
      value: ownerSelector.getTotalRoom(propertyDetail),
      icon: Images.bedIconActive,
    },
    {
      name: "Room Occupancy",
      value: `${ownerSelector.getOccupancyRoom(propertyDetail)}%`,
      icon: Images.occupancyIcon,
    },
    {
      name: "Car Park Occupancy",
      value: `${ownerSelector.getOccupancyCarPark(propertyDetail)}%`,
      icon: Images.carParkOccupancyIcon,
    },
  ];
  const colorList = [
    {
      label: "Paid",
      bgColor: "bg-aqua",
      textColor: "text-aqua",
    },
    {
      label: "Coming Due",
      bgColor: "bg-pending",
      textColor: "text-warning",
    },
    {
      label: "Overdue",
      bgColor: "bg-error",
      textColor: "text-error",
    },
  ];

  useEffect(() => {
    if (!isEmpty(units)) {
      const targetUnit = units[selectedSlide];
      const unitId = ownerSelector.getUnitId(targetUnit);
      setSelectedUnitID(unitId);
      const targetRoom = get(targetUnit, ["rooms"], []);

      setSelectedRoom(targetRoom);
    }
  }, [selectedSlide, units]);

  useEffect(() => {
    fetchPropertyDetail();
  }, []);

  useEffect(() => {
    if (isEqual(selectedCategory, "Rent Tracker") && selectedUnitID !== 0) {
      fetchRenTrackerData(selectedUnitID, yearValue);
    }
  }, [selectedCategory, selectedUnitID, yearValue]);

  const fetchRenTrackerData = async (unitId, year) => {
    await apiRequest.getRentTrackerRequest(
      unitId,
      year,
      setRentTrackerDataLoading,
      rentTrackerDataSuccessCallback,
    );
  };

  const rentTrackerDataSuccessCallback = (res) => {
    setRentTrackerData(res);
  };

  const fetchPropertyDetail = async () => {
    await apiRequest.getOwnerPropertyOverview(
      id,
      setPropertyDetailLoading,
      propertyDetailSuccessCallback,
    );
  };

  const propertyDetailSuccessCallback = (res) => {
    setPropertyDetail(res);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onSlideChange = (value) => {
    const activeIndex = get(value, ["activeIndex"], 0);

    setSelectedSlide(activeIndex);
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="My Property Overview | Owner - Spacify Asia" />

      <DesktopLayout
        hideFooter
        loading={propertyDetailLoading || rentTrackerDataLoading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/user/owner"}>
                    <CustomText textClassName="text-base text-disable">
                      My Property
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base">
                    {propertyName}
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">{propertyName}</CustomText>
            </div>
          </div>
        }
      >
        <div className="">
          <div>
            <div className="pb-4">
              <CustomText textClassName="font-bold text-base">
                {isEmpty(propertyName) ? "-" : propertyName}
              </CustomText>
              <CustomText textClassName="text-xs font-light">
                {isEmpty(propertyAddress) ? "-" : propertyAddress}
              </CustomText>
            </div>

            <PropertyInfoComponent paddingTop={"0"} lists={lists} />
          </div>

          <UnitCarouselComponent
            data={units}
            onSlideChange={onSlideChange}
            selectedSlide={selectedSlide}
            targetRooms={selectedRoom}
          />

          <div className="pt-6">
            <div className="pb-4 flex">
              <CustomButton
                buttonText="Space Details"
                buttonClassName={`btn-sm ${isEqual(selectedCategory, "Space Details") ? "btn-primary" : "default-btn"} mr-2`}
                textClassName="text-xs"
                onClick={() => setSelectedCategory("Space Details")}
              />
              <CustomButton
                buttonText="Rent Tracker"
                buttonClassName={`btn-sm ${isEqual(selectedCategory, "Rent Tracker") ? "btn-primary" : "default-btn"} mr-2`}
                textClassName="text-xs"
                onClick={() => setSelectedCategory("Rent Tracker")}
              />
            </div>

            {isEqual(selectedCategory, "Space Details") ? (
              <SpaceDetailComponent data={selectedRoom} />
            ) : (
              <RentTrackerComponent
                data={rentTrackerData}
                yearValue={yearValue}
                setYearValue={setYearValue}
                colorList={colorList}
              />
            )}
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(PropertyDetail));
