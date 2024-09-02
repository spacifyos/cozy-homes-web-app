import CustomText from "@/components/CustomText";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const ListingSection = ({
  t,
  lists,
  title,
  listingLoading,
  onClickViewMore,
  onClickToPropertyListing,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center pb-2">
        <CustomText textClassName="section-title">{title}</CustomText>

        <a
          onClick={onClickViewMore}
          className="cursor-pointer"
          href={`/search`}
        >
          <CustomText textClassName="font-size-xsmall">
            {"View More >"}
          </CustomText>
        </a>
      </div>

      {/*<CustomButton*/}
      {/*  buttonText="City"*/}
      {/*  buttonClassName={`btn-sm ${isEqual(selectedCategory, "City") ? "primary-btn" : "default-btn"} mr-2`}*/}
      {/*  textClassName="font-size-xsmall"*/}
      {/*  onClick={() => onClickSelectCategory("City")}*/}
      {/*/>*/}
      {/*<CustomButton*/}
      {/*  buttonText="College"*/}
      {/*  buttonClassName={`btn-sm ${isEqual(selectedCategory, "College") ? "primary-btn" : "default-btn"} mr-2`}*/}
      {/*  textClassName="font-size-xsmall"*/}
      {/*  onClick={() => onClickSelectCategory("College")}*/}
      {/*/>*/}
      {/*<CustomButton*/}
      {/*  buttonText="Condominium"*/}
      {/*  buttonClassName={`btn-sm ${isEqual(selectedCategory, "Condominium") ? "primary-btn" : "default-btn"} mr-2`}*/}
      {/*  textClassName="font-size-xsmall"*/}
      {/*  onClick={() => onClickSelectCategory("Condominium")}*/}
      {/*/>*/}
      {/*<CustomButton*/}
      {/*  buttonText="All"*/}
      {/*  buttonClassName={`btn-sm ${isEqual(selectedCategory, "All") ? "primary-btn" : "default-btn"} mr-2`}*/}
      {/*  textClassName="font-size-xsmall"*/}
      {/*  onClick={() => onClickSelectCategory("All")}*/}
      {/*/>*/}

      <div className="gap-1">
        {listingLoading ? (
          <div className="flex" style={{ height: 144 }}>
            {map(Array(4), (item, index) => (
              <Skeleton width={105} height={105} key={index} />
            ))}
          </div>
        ) : isEmpty(lists) ? (
          <div className="flex justify-center" style={{ height: 144 }}>
            <CustomEmptyBox emptyTitle="Property not available now." />
          </div>
        ) : (
          <Swiper
            style={{ width: "100%" }}
            slidesPerView={4}
            spaceBetween={8}
            loop={true}
            pagination={{
              clickable: true,
              enabled: false,
            }}
            // navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper explore-swiper"
          >
            {map(lists, (item, index) => {
              return (
                <SwiperSlide style={{ minWidth: 100 }} key={index}>
                  <ListingCardComponent
                    item={item}
                    onClickToPropertyListing={onClickToPropertyListing}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ListingSection;
