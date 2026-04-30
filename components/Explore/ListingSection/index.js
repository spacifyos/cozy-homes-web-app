import CustomText from "@/components/CustomText";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const ListingSection = ({
  hideLabel,
  lists,
  title,
  listingLoading,
  onClickViewMore,
  className,
  hideViewMore,
}) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center pb-2 body-container">
        {title}

        {hideViewMore ? (
          false
        ) : (
          <a
            onClick={onClickViewMore}
            className="cursor-pointer"
            href={`/search`}
          >
            <CustomText textClassName="text-xs">
              {"View More >"}
            </CustomText>
          </a>
        )}
      </div>

      {/*<CustomButton*/}
      {/*  buttonText="City"*/}
      {/*  buttonClassName={`btn-sm ${isEqual(selectedCategory, "City") ? "btn-primary" : "btn-white"} mr-2`}*/}
      {/*  textClassName="text-xs"*/}
      {/*  onClick={() => onClickSelectCategory("City")}*/}
      {/*/>*/}
      {/*<CustomButton*/}
      {/*  buttonText="College"*/}
      {/*  buttonClassName={`btn-sm ${isEqual(selectedCategory, "College") ? "btn-primary" : "btn-white"} mr-2`}*/}
      {/*  textClassName="text-xs"*/}
      {/*  onClick={() => onClickSelectCategory("College")}*/}
      {/*/>*/}
      {/*<CustomButton*/}
      {/*  buttonText="Condominium"*/}
      {/*  buttonClassName={`btn-sm ${isEqual(selectedCategory, "Condominium") ? "btn-primary" : "btn-white"} mr-2`}*/}
      {/*  textClassName="text-xs"*/}
      {/*  onClick={() => onClickSelectCategory("Condominium")}*/}
      {/*/>*/}
      {/*<CustomButton*/}
      {/*  buttonText="All"*/}
      {/*  buttonClassName={`btn-sm ${isEqual(selectedCategory, "All") ? "btn-primary" : "btn-white"} mr-2`}*/}
      {/*  textClassName="text-xs"*/}
      {/*  onClick={() => onClickSelectCategory("All")}*/}
      {/*/>*/}

      <div className="pl-4">
        {listingLoading ? (
          <div className="flex" style={{ height: 144 }}>
            {map(Array(4), (item, index) => (
              <Skeleton
                width={"100%"}
                minWidth={100}
                height={100}
                key={index}
              />
            ))}
          </div>
        ) : isEmpty(lists) ? (
          <div className="flex justify-center" style={{ height: 144 }}>
            <CustomEmptyBox
            variant="property"
            emptyTitle="No properties listed"
            emptyDesc="We're adding new homes all the time — check back soon."
          />
          </div>
        ) : (
          <Swiper
            style={{ width: "100%" }}
            slidesPerView={4}
            spaceBetween={10}
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
                  <ListingCardComponent item={item} hideLabel={hideLabel} />
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
