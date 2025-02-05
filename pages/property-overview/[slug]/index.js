import { useTranslation, withTranslation } from "next-i18next";
import RoomPicCarousel from "@/components/PropertyOverview/RoomPicCarousel";
import DetailComponent from "@/components/PropertyOverview/DetailComponent";
import DetailFeatureSection from "@/components/PropertyOverview/DetailFeatureSection";
import Facilities from "@/components/PropertyOverview/Facilities";
import AgentSection from "@/components/PropertyOverview/AgentSection";
import SpacifyMap from "@/components/PropertyOverview/SpacifyMap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import PolicyDetail from "@/components/PropertyOverview/PolicyDetail";
import { isEmpty, isEqual, get, map, random, size, concat } from "lodash";
import Description from "@/components/Detail/Description";
import * as listingSelector from "@/src/selectors/listing";
import * as listingAction from "@/src/actions/listing";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "@/components/CustomButton";
import MoveInCostModal from "@/components/PropertyOverview/MoveInCostModal";
import Constant from "@/src/utils/Constant";
import Helper from "@/src/utils/Helper";
import ImageModal from "@/components/PropertyOverview/ImageModal";
import RentChargeModal from "@/components/Booking/RentChargeModal";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import CustomImage from "@/components/CustomImage";
import DesktopRecommendSection from "@/components/PropertyOverview/DesktopRecommendSection";
import DesktopNearbyRoomSection from "@/components/PropertyOverview/DesktopNearbyRoomSection";
import DesktopPropertyPriceSection from "@/components/PropertyOverview/DesktopPropertyPriceSection";
import CustomText from "@/components/CustomText";
import axios from "axios";
import Image from "next/image";
import DesktopModal from "@/components/DesktopModal";

export async function getServerSideProps(context) {
  const id = get(context, ["params", "slug"], "");

  let listingPropertyDetailData = null;

  try {
    const response = await axios.get(
      `${process.env.API_DOMAIN}/listing/property-details/${id}`,
      { headers: { "Content-Type": "application/json" } },
    );

    listingPropertyDetailData = get(response, ["data", "data"], null);
  } catch (error) {
    console.error("Error fetching listing details:", error);
  }

  return {
    props: {
      id: id,
      listingPropertyDetailData: listingPropertyDetailData,
    },
  };
}

const PropertyOverview = ({ id, listingPropertyDetailData }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  // const getListingPropertyDetailRequest = (id) =>
  //   dispatch(listingAction.getListingPropertyDetailRequest(id));
  // const listingPropertyDetailData = useSelector((state) =>
  //   listingSelector.getListingPropertyDetailData(state, id),
  // );
  // const listingPropertyDetailDataLoading = useSelector((state) =>
  //   listingSelector.getListingPropertyDetailDataLoading(state),
  // );

  const getListingCancellationRequest = () =>
    dispatch(listingAction.getListingCancellationRequest());
  const listingCancellationData = useSelector((state) =>
    listingSelector.getListingCancellationData(state),
  );
  const listingCancellationDataLoading = useSelector((state) =>
    listingSelector.getListingCancellationDataLoading(state),
  );

  const [selectDetail, setSelectedDetail] = useState(Constant.TENANCY);
  // const [isBookMarks, setIsBookMarks] = useState(true);
  const [openModalFirstMonthCharges, setOpenFirstMonthModalCharges] =
    useState(false);
  const [openModalLastMonthCharges, setOpenModalLastMonthCharges] =
    useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);

  const propertyName = listingSelector.getPropertyName(
    listingPropertyDetailData,
  );
  const unitRoomName = listingSelector.getUnitRoomName(
    listingPropertyDetailData,
  );
  const address = listingSelector.getAddress(listingPropertyDetailData);
  const description = listingSelector.getDescription(listingPropertyDetailData);
  const rental = listingSelector.getRental(listingPropertyDetailData);
  const recommendedList = listingSelector.getRecommended(
    listingPropertyDetailData,
  );
  const facilitiesList = listingSelector.getFacilities(
    listingPropertyDetailData,
  );
  const bedType = listingSelector.getBedType(listingPropertyDetailData);
  const bathroom = listingSelector.getBathroom(listingPropertyDetailData);
  const squareFeet = listingSelector.getSquareFeet(listingPropertyDetailData);
  const propertyImageUrl = listingSelector.getPropertyImagesUrl(
    listingPropertyDetailData,
  );
  const unitImageUrl = listingSelector.getUnitImagesUrl(
    listingPropertyDetailData,
  );
  const roomImageUrl = listingSelector.getRoomImagesUrl(
    listingPropertyDetailData,
  );
  const mobileImageList = concat(
    roomImageUrl,
    isEmpty(propertyImageUrl) ? [] : propertyImageUrl,
    isEmpty(unitImageUrl) ? [] : unitImageUrl,
  );

  const videoUrl = listingSelector.getVideoUrl(listingPropertyDetailData);
  const moveInFees = listingSelector.getMoveInFees(listingPropertyDetailData);
  const picName = listingSelector.getPicName(listingPropertyDetailData);

  const isAllowedZeroDeposit = listingSelector.isAllowedZeroDeposit(
    listingPropertyDetailData,
  );

  const normalItems = listingSelector.getItems(moveInFees);
  const zeroDepositItems = listingSelector.getItemsWithZeroDeposit(moveInFees);

  const [targetItems, setTargetItems] = useState(normalItems);

  const totalMoveInCost = listingSelector.getTotalCostFull(targetItems);

  useEffect(() => {
    if (!isAllowedZeroDeposit) {
      setTargetItems(normalItems);
    } else {
      setTargetItems(zeroDepositItems);
    }
  }, [listingPropertyDetailData]);

  const [selectedImage, setSelectedImage] = useState(2);

  const onClickToBookAppointment = () => {
    router.push("/property-overview/1/book-appointment");
  };
  const onClickGoBack = () => {
    router.back();
  };

  // const onClickRightButton = () => {
  //   setIsBookMarks(!isBookMarks);
  // };

  const fetchListingCancellation = () => {
    getListingCancellationRequest();
  };

  const onClickSelectDetail = (select) => {
    setSelectedDetail(select);

    if (isEqual(select, Constant.POLICY)) {
      fetchListingCancellation();
    }
  };

  const onClickOpenMoveInCostModal = () => {
    Helper.documentGetElementById("move_in_cost_modal").showModal();
  };

  const onClickPopupImage = (selectedImage) => {
    setSelectedImage(selectedImage);
    setOpenImageModal(true);
  };

  const onClickCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const onClickOpenModalFirstMonthCharges = () => {
    setOpenFirstMonthModalCharges(!openModalFirstMonthCharges);
  };

  const onClickOpenModalLastMonthCharges = () => {
    setOpenModalLastMonthCharges(!openModalLastMonthCharges);
  };

  const onClickViewMore = () => {
    router.push("search");
  };

  const onClickCloseRentChargeModal = () => {
    Helper.documentGetElementById("rent_charges_details").close();
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo
        title={`${propertyName} at RM ${rental} per month for rent by ${isEmpty(picName) ? "Spacify Asia" : picName} | Spacify.asia`}
        description={`${propertyName} at RM ${rental} per month for rent by ${isEmpty(picName) ? "Spacify Asia" : picName}. Learn more about this ${isEmpty(bathroom) ? "-" : bathroom} bathroom, ${isEmpty(bedType) ? "-" : bedType} bedroom, ${isEmpty(squareFeet) ? "-" : squareFeet} Sqft Room at ${process.env.DOMAIN}.`}
        canonical={`${process.env.DOMAIN}/property-overview/${id}`}
        openGraph={{
          url: `${process.env.DOMAIN}/property-overview/${id}`,
          title: `${propertyName} at RM ${rental} per month for rent by ${isEmpty(picName) ? "Spacify Asia" : picName} | Spacify.asia`,
          description: `${propertyName} at RM ${rental} per month for rent by ${isEmpty(picName) ? "Spacify Asia" : picName}. Learn more about this ${isEmpty(bathroom) ? "-" : bathroom} bathroom, ${isEmpty(bedType) ? "-" : bedType} bedroom, ${isEmpty(squareFeet) ? "-" : squareFeet} Sqft Room at ${process.env.DOMAIN}.`,
          images: isEmpty(roomImageUrl)
            ? [
                {
                  url: Images.logoImage,
                  width: 800,
                  height: 600,
                  alt: `${propertyName} Image`,
                },
              ]
            : map(roomImageUrl, (item, index) => {
                return {
                  url: item,
                  width: 800,
                  height: 600,
                  alt: `${propertyName} image ${index + 1}`,
                };
              }),
          siteName: `${process.env.DOMAIN}/property-overview/${id}`,
        }}
      />

      <DesktopLayout
        hideNav
        backgroundColor="bg-white"
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul className="flex-wrap gap-1">
                <li>
                  <a href={"/"}>
                    <CustomText textClassName="text-base text-disable">
                      Explore
                    </CustomText>
                  </a>
                </li>
                <li>
                  <a href={"/search"}>
                    <CustomText textClassName="text-base text-disable">
                      Room Listing
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
        <div className="container mx-auto pb-6">
          <div
            className="xl:grid lg:grid md:grid sm:hidden hidden grid-rows-2 grid-cols-4 grid-flow-col gap-5 pb-4"
            style={{ height: 500 }}
          >
            <div className="row-span-2 col-span-2 global-border-radius border overflow-hidden">
              {isEmpty(videoUrl) ? (
                <CustomImage className="w-full h-full" src={Images.logoImage} />
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  title={propertyName}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {map(Array(4), (item, index) => {
              return (
                <div
                  key={index}
                  className={`col-span-1 global-border-radius border relative h-full ${isEmpty(mobileImageList[index]) || index === 3 ? "" : "cursor-pointer"} flex justify-center items-center overflow-hidden`}
                  onClick={
                    isEmpty(mobileImageList[index]) || index === 3
                      ? () => {}
                      : () => onClickPopupImage(index)
                  }
                >
                  <Image
                    layout="responsive"
                    className={`object-contain ${isEmpty(mobileImageList[index]) || index === 3 ? "" : "image-zoom-in"} `}
                    loading="lazy"
                    width={0}
                    height={0}
                    src={
                      isEmpty(mobileImageList[index])
                        ? Images.imageNotFound
                        : mobileImageList[index]
                    }
                  />

                  {size(roomImageUrl) > 1 && index === 3 ? (
                    <div
                      className="absolute bottom-6 right-4"
                      onClick={() => onClickPopupImage(0)}
                    >
                      <CustomText textClassName="text-xs hover:text-white px-4 py-2 border rounded hover:border-primary bg-gray-100 hover:bg-primary cursor-pointer">
                        View All Images
                      </CustomText>
                    </div>
                  ) : (
                    false
                  )}
                </div>
              );
            })}
          </div>

          <RoomPicCarousel
            imageUrl={mobileImageList}
            onClickPopupImage={onClickPopupImage}
          />

          <div class="grid grid-cols-5 gap-10">
            <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-5 col-span-5">
              <DetailComponent
                propertyName={propertyName}
                unitRoomName={unitRoomName}
                address={address}
              />

              <div className="pb-6">
                <div role="tablist" className="tabs tabs-bordered">
                  <a
                    onClick={() => onClickSelectDetail(Constant.TENANCY)}
                    role="tab"
                    className={`tab ${isEqual(selectDetail, Constant.TENANCY) ? "tab-active" : ""} h-10 gap-2`}
                  >
                    <CustomText
                      textClassName={`${isEqual(selectDetail, Constant.TENANCY) ? "text-black font-bold" : "text-disable"}`}
                    >
                      {"Tenancy"}
                    </CustomText>
                  </a>
                  <a
                    onClick={() => onClickSelectDetail(Constant.POLICY)}
                    role="tab"
                    className={`tab ${isEqual(selectDetail, Constant.TENANCY) ? "" : "tab-active"} h-10 gap-2`}
                  >
                    <CustomText
                      textClassName={`${isEqual(selectDetail, Constant.TENANCY) ? "text-disable" : "text-black font-bold"}`}
                    >
                      {"Policy"}
                    </CustomText>
                  </a>
                </div>
              </div>

              {isEqual(selectDetail, Constant.TENANCY) ? (
                <div>
                  <DetailFeatureSection
                    t={t}
                    rental={rental}
                    bedType={bedType}
                    bathroom={bathroom}
                    squareFeet={squareFeet}
                  />

                  <Description t={t} description={description} />

                  <Facilities t={t} facilitiesList={facilitiesList} />

                  {/*<SpacifyMap t={t} />*/}
                </div>
              ) : (
                <PolicyDetail
                  t={t}
                  loading={listingCancellationDataLoading}
                  data={listingCancellationData}
                />
              )}
            </div>

            <div className="xl:col-span-2 lg:col-span-2 md:col-span-2 xl:block lg:block md:block sm:hidden hidden">
              <DesktopPropertyPriceSection
                t={t}
                data={listingPropertyDetailData}
                lists={targetItems}
                totalMoveInCost={totalMoveInCost}
                rental={rental}
                openModalFirstMonthCharges={openModalFirstMonthCharges}
                openModalLastMonthCharges={openModalLastMonthCharges}
                onClickOpenModalFirstMonthCharges={
                  onClickOpenModalFirstMonthCharges
                }
                onClickOpenModalLastMonthCharges={
                  onClickOpenModalLastMonthCharges
                }
                propertyId={id}
              />
            </div>
          </div>

          <DesktopRecommendSection
            t={t}
            data={recommendedList}
            // loading={listingPropertyDetailDataLoading}
            onClickViewMore={onClickViewMore}
          />

          {/*<DesktopNearbyRoomSection*/}
          {/*  t={t}*/}
          {/*  data={[]}*/}
          {/*  loading={listingPropertyDetailDataLoading}*/}
          {/*  onClickViewMore={onClickViewMore}*/}
          {/*/>*/}
        </div>
      </DesktopLayout>

      <AgentSection
        t={t}
        onClickToBookAppointment={onClickToBookAppointment}
        data={listingPropertyDetailData}
        onClickOpenMoveInCostModal={onClickOpenMoveInCostModal}
        totalMoveInCost={totalMoveInCost}
        propertyId={id}
      />

      <MoveInCostModal
        openModalFirstMonthCharges={openModalFirstMonthCharges}
        openModalLastMonthCharges={openModalLastMonthCharges}
        onClickOpenModalFirstMonthCharges={onClickOpenModalFirstMonthCharges}
        onClickOpenModalLastMonthCharges={onClickOpenModalLastMonthCharges}
        lists={targetItems}
      />

      <ImageModal
        data={mobileImageList}
        selectedImage={selectedImage}
        onClickCloseImageModal={onClickCloseImageModal}
        openImageModal={openImageModal}
      />

      <RentChargeModal
        onClickCloseRentChargeModal={onClickCloseRentChargeModal}
      />
    </div>
  );
};

export default withTranslation("common")(PropertyOverview);
