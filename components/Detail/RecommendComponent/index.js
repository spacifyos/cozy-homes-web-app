import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import Carousel from "react-multi-carousel";
import _ from "lodash";

const RoomPicCarousel = () => {
  const roomData = [
    {
      name: "M Vertica",
      address: "A-01-01, Room 2",
      price: "RM 750",
      imageUrl: Images.filterDefaultImage,
    },
    {
      name: "M Vertica",
      address: "A-01-01, Room 2",
      price: "RM 850",
      imageUrl: Images.room,
    },
    {
      name: "M Vertica",
      address: "A-01-01, Room 2",
      price: "RM 850",
      imageUrl: Images.room,
    },
    {
      name: "M Vertica",
      address: "A-01-01, Room 2",
      price: "RM 850",
      imageUrl: Images.room,
    },
    {
      name: "M Vertica",
      address: "A-01-01, Room 2",
      price: "RM 1150",
      imageUrl: Images.room,
    },
    {
      name: "M Vertica",
      address: "A-01-01, Room 2",
      price: "RM 850",
      imageUrl: Images.room,
    },
  ];

  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass=""
      dotListClass=""
      draggable
      focusOnSelect
      infinite
      itemClass="pb-7"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 2,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {_.map(roomData, (room, index) => (
        <div key={index} className="carousel-item relative flex flex-col px-1">
          <div className="flex flex-col left-3 top-3 absolute">
            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
              <CustomImage src={Images.femaleUnitIcon} width={20} height={20} />
            </div>
          </div>

          <div className="flex flex-col left-3 top-12 absolute">
            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
              <CustomImage src={Images.windowIcon} width={20} height={20} />
            </div>
          </div>

          <CustomImage
            src={room.imageUrl}
            imageStyle={{ height: 150, width: "100%", objectFit: "cover" }}
            className=" rounded-2xl global-box-shadow"
          />

          <div className="pt-2">
            <CustomText textClassName="font-size-normal font-bold leading-5 line-clamp-1">
              {room.name}
            </CustomText>
            <CustomText textClassName="font-size-xsmall primary-text leading-4 line-clamp-1">
              {room.address}
            </CustomText>
            <div className="flex items-end">
              <CustomText textClassName="font-size-large font-bold mr-2">
                {room.price}
              </CustomText>
              <CustomText textClassName="disable-text font-size-xsmall">
                / month
              </CustomText>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default RoomPicCarousel;
