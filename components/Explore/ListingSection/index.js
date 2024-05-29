import CustomText from "@/components/CustomText";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import _ from "lodash";
import Skeleton from "@/components/Skeleton";
import Carousel from "react-multi-carousel";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import Images from "@/src/utils/Image";

const ListingSection = ({
  t,
  lists,
  title,
  listingLoading,
  onClickViewMore,
  onClickToPropertyListing,
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
        {listingLoading ? (
          <div className="flex">
            {_.map(Array(4), (item, index) => (
              <Skeleton width={105} height={105} key={index} />
            ))}
          </div>
        ) : _.isEmpty(lists) ? (
          <CustomEmptyBox emptyTitle="Property not available now." />
        ) : (
          <Carousel
            additionalTransfrom={0}
            // autoPlay
            arrows={false}
            // autoPlaySpeed={3000}
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
            slidesToSlide={3}
            swipeable
          >
            {_.map(lists, (item, index) => {
              return (
                <ListingCardComponent
                  key={index}
                  item={item}
                  onClickToPropertyListing={onClickToPropertyListing}
                />
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default ListingSection;
