import CustomText from "@/components/CustomText";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import _ from "lodash";
import Skeleton from "@/components/Skeleton";
import Carousel from "react-multi-carousel";

const ListingSection = ({
  t,
  lists,
  title,
  listingLoading,
  onClickViewMore,
  onClickToPropertyOverview,
  className,
}) => {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 2,
      partialVisibilityGutter: 80,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 3,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center pb-2">
        <CustomText textClassName="section-title">{title}</CustomText>

        <div onClick={onClickViewMore} className="cursor-pointer">
          <CustomText textClassName="font-size-xsmall">
            {"View More >"}
          </CustomText>
        </div>
      </div>

      {/*<CustomButton*/}
      {/*  buttonText="City"*/}
      {/*  buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "City") ? "primary-btn" : "default-btn"} mr-2`}*/}
      {/*  textClassName="font-size-xsmall"*/}
      {/*  onClick={() => onClickSelectCategory("City")}*/}
      {/*/>*/}
      {/*<CustomButton*/}
      {/*  buttonText="College"*/}
      {/*  buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "College") ? "primary-btn" : "default-btn"} mr-2`}*/}
      {/*  textClassName="font-size-xsmall"*/}
      {/*  onClick={() => onClickSelectCategory("College")}*/}
      {/*/>*/}
      {/*<CustomButton*/}
      {/*  buttonText="Condominium"*/}
      {/*  buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Condominium") ? "primary-btn" : "default-btn"} mr-2`}*/}
      {/*  textClassName="font-size-xsmall"*/}
      {/*  onClick={() => onClickSelectCategory("Condominium")}*/}
      {/*/>*/}
      {/*<CustomButton*/}
      {/*  buttonText="All"*/}
      {/*  buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "All") ? "primary-btn" : "default-btn"} mr-2`}*/}
      {/*  textClassName="font-size-xsmall"*/}
      {/*  onClick={() => onClickSelectCategory("All")}*/}
      {/*/>*/}

      <div className="gap-1">
        <Carousel
          additionalTransfrom={0}
          autoPlay
          arrows={false}
          autoPlaySpeed={2000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          partialVisible
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {_.map(lists, (item) => {
            return listingLoading ? (
              <Skeleton width={100} height={100}  />
            ) : (
              <ListingCardComponent
                item={item}
                onClickToPropertyOverview={onClickToPropertyOverview}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default ListingSection;
