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
import Helper from "@/src/utils/Helper";
import AuthManager from "@/src/utils/AuthManager";
import axios from "axios";
import Toast from "@/src/utils/Toast";

export { getServerSideProps };

const PropertyDetail = ({ id }) => {
  const router = useRouter();

  const [gallerySecretKey, setGallerySecretKey] = useState("");
  const [rootDataLoading, setRootDataLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
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
      icon: Images.spaceIconActive,
    },
    {
      name: "Room",
      value: ownerSelector.getTotalRoom(propertyDetail),
      icon: Images.bedIconActive,
    },
    {
      name: "Room Occupancy",
      value: `${ownerSelector.getOccupancyRoom(propertyDetail)}%`,
      icon: Images.occupancyIconActive,
    },
    {
      name: "Car Park Occupancy",
      value: `${ownerSelector.getOccupancyCarPark(propertyDetail)}%`,
      icon: Images.carParkOccupancyIconActive,
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
      bgColor: "bg-warning",
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
    fetchRootData();
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

  const onClickDownloadAgreement = async (url, extension) => {
    if (!isEmpty(url) && !isEmpty(gallerySecretKey)) {
      await fetchDocumentData(url, gallerySecretKey, extension);
    }
  };

  const fetchRootData = async () => {
    await apiRequest.getRootDataRequest(
      setRootDataLoading,
      getRootDataSuccessCallback,
    );
  };

  const getRootDataSuccessCallback = (res) => {
    const chiper1 = get(res, ["chiper1"], "");
    const chiper2 = get(res, ["chiper2"], "");

    setGallerySecretKey(Helper.generateSecretKey(chiper1, chiper2));
  };

  const fetchDocumentData = async (url, key, extension) => {
    const headers = {
      "Content-Type": "application/json",
      AGSC: key,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    setDownloading(true);

    axios
      .get(url + "/download", { headers: headers })
      .then(async (response) => {
        const resUrl = get(response, ["data", "data", "url"], "");

        if (!isEmpty(resUrl)) {
          await apiRequest.downloadFileRequest(resUrl, {}, "", extension);
        }
      })
      .catch((error) => {
        Toast.error("Download document failed");
      })
      .finally(() => setDownloading(false));
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="My Property Overview | Owner - CozyHomes" />

      <DesktopLayout
        hideFooter
        loading={propertyDetailLoading || rentTrackerDataLoading || downloading}
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
                src={Images.leftIconBlack}
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
                buttonClassName={`btn-sm ${isEqual(selectedCategory, "Space Details") ? "btn-primary" : "btn-white"} mr-2`}
                textClassName="text-xs"
                onClick={() => setSelectedCategory("Space Details")}
              />
              <CustomButton
                buttonText="Rent Tracker"
                buttonClassName={`btn-sm ${isEqual(selectedCategory, "Rent Tracker") ? "btn-primary" : "btn-white"} mr-2`}
                textClassName="text-xs"
                onClick={() => setSelectedCategory("Rent Tracker")}
              />
            </div>

            {isEqual(selectedCategory, "Space Details") ? (
              <SpaceDetailComponent
                data={selectedRoom}
                onClickDownloadAgreement={onClickDownloadAgreement}
              />
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
