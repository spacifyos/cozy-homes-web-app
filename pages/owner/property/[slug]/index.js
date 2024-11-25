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
import LoadingOverlay from "@/components/LoadingOverlay";
import UnitCarouselComponent from "@/components/OwnerProperty/UnitCarouselComponent";
import { get, isEmpty, filter, isEqual, map } from "lodash";
import SpaceDetailComponent from "@/components/OwnerProperty/SpaceDetailComponent";
import CustomButton from "@/components/CustomButton";
import RentTrackerComponent from "@/components/OwnerProperty/RentTrackerComponent";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";

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
      bgColor: "available-bg-color",
      textColor: "power-on-text",
    },
    {
      label: "Coming Due",
      bgColor: "pending-bg-color",
      textColor: "pending-text",
    },
    {
      label: "Overdue",
      bgColor: "error-bg-color",
      textColor: "error-text",
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
      fetchRenTrackerData(selectedUnitID);
    }
  }, [selectedCategory, selectedUnitID]);

  const fetchRenTrackerData = async (unitId) => {
    await apiRequest.getRentTrackerRequest(
      unitId,
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
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="My Property Overview | Owner - Spacify Asia" />

      <DesktopLayout
        loading={propertyDetailLoading || rentTrackerDataLoading}
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href={"/owner"}>
                  <CustomText textClassName="text-base disable-text">
                    My Property
                  </CustomText>
                </a>
              </li>
              <li>
                <CustomText textClassName="font-size-xlarge font-bold">
                  {propertyName}
                </CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="">
          <div>
            <div className="pb-4">
              <CustomText textClassName="font-bold font-size-xlarge">
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
                buttonClassName={`btn-sm ${isEqual(selectedCategory, "Space Details") ? "primary-btn" : "default-btn"} mr-2`}
                textClassName="text-xs"
                onClick={() => setSelectedCategory("Space Details")}
              />
              <CustomButton
                buttonText="Rent Tracker"
                buttonClassName={`btn-sm ${isEqual(selectedCategory, "Rent Tracker") ? "primary-btn" : "default-btn"} mr-2`}
                textClassName="text-xs"
                onClick={() => setSelectedCategory("Rent Tracker")}
              />
            </div>

            {isEqual(selectedCategory, "Rent Tracker") ? (
              <div className="flex gap-4 px-6 pb-2">
                {map(colorList, (item, index) => {
                  const label = get(item, ["label"], "");
                  const bgColor = get(item, ["bgColor"], "");
                  const textColor = get(item, ["textColor"], "");

                  return (
                    <div key={index} className="flex items-center">
                      <div
                        className={`${bgColor} rounded-3xl mr-1`}
                        style={{ width: 10, height: 10 }}
                      ></div>
                      <CustomText textClassName={textColor}>{label}</CustomText>
                    </div>
                  );
                })}
              </div>
            ) : (
              false
            )}

            {isEqual(selectedCategory, "Space Details") ? (
              <SpaceDetailComponent data={selectedRoom} />
            ) : (
              <RentTrackerComponent data={rentTrackerData} />
            )}
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(PropertyDetail));
