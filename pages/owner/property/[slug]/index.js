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
import { get, isEmpty, filter, isEqual } from "lodash";
import SpaceDetailComponent from "@/components/OwnerProperty/SpaceDetailComponent";
import CustomButton from "@/components/CustomButton";
import RentTrackerComponent from "@/components/OwnerProperty/RentTrackerComponent";

export { getServerSideProps };

const PropertyDetail = ({ id }) => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("Space Details");

  const [propertyDetail, setPropertyDetail] = useState(null);
  const [propertyDetailLoading, setPropertyDetailLoading] = useState(false);

  const [selectedSlide, setSelectedSlide] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState([]);

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
      name: "Occupancy",
      value: `${ownerSelector.getOccupancy(propertyDetail)}%`,
      icon: Images.percentIconActive,
    },
    {
      name: "Room Vacant",
      value: `${ownerSelector.getVacantRoom(propertyDetail)}%`,
      icon: Images.percentIconActive,
    },
  ];

  useEffect(() => {
    const targetUnit = units[selectedSlide];
    const targetRoom = get(targetUnit, ["rooms"], []);

    setSelectedRoom(targetRoom);
  }, [selectedSlide, units]);

  useEffect(() => {
    fetchPropertyDetail();
  }, []);

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
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className="body-container py-5">
        <div
          className={`flex items-center justify-between overflow-hidden pb-6`}
        >
          <div className="flex justify-center items-center">
            <div onClick={onClickGoBack} className="cursor-pointer">
              <CustomImage
                className={"me-5 cursor-pointer"}
                src={Images.leftIconWhite}
                imageStyle={{ width: 10 }}
              />
            </div>

            <CustomText
              textClassName={"font-bold white-text"}
              styles={{ fontSize: 18 }}
            >
              My Property
            </CustomText>
          </div>

          {/*<CustomImage*/}
          {/*  src={rightButtonIcon}*/}
          {/*  imageStyle={{ width: 25, height: 25 }}*/}
          {/*  onClick={onClickRightButton}*/}
          {/*  className="cursor-pointer"*/}
          {/*/>*/}
        </div>

        <div className="pb-4">
          <CustomText textClassName="white-text font-bold font-size-xlarge">
            {isEmpty(propertyName) ? "-" : propertyName}
          </CustomText>
          <CustomText textClassName="white-text font-size-xsmall font-light">
            {isEmpty(propertyAddress) ? "-" : propertyAddress}
          </CustomText>
        </div>

        <PropertyInfoComponent paddingTop={"0"} lists={lists} />
      </div>

      <div className="bg-color flex-1">
        <UnitCarouselComponent
          data={units}
          onSlideChange={onSlideChange}
          selectedSlide={selectedSlide}
          targetRooms={selectedRoom}
        />
        <div className="pt-6">
          <div className="pb-4 body-container">
            <CustomButton
              buttonText="Space Details"
              buttonClassName={`btn-sm ${isEqual(selectedCategory, "Space Details") ? "primary-btn" : "default-btn"} mr-2`}
              textClassName="font-size-xsmall"
              onClick={() => setSelectedCategory("Space Details")}
            />
            {/*<CustomButton*/}
            {/*  buttonText="Rent Tracker"*/}
            {/*  buttonClassName={`btn-sm ${isEqual(selectedCategory, "Rent Tracker") ? "primary-btn" : "default-btn"} mr-2`}*/}
            {/*  textClassName="font-size-xsmall"*/}
            {/*  onClick={() => setSelectedCategory("Rent Tracker")}*/}
            {/*/>*/}
          </div>

          {isEqual(selectedCategory, "Space Details") ? (
            <SpaceDetailComponent data={selectedRoom} />
          ) : (
            <RentTrackerComponent />
          )}
        </div>
      </div>

      <LoadingOverlay loading={propertyDetailLoading} />
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(PropertyDetail));
