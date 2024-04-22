import Carousel from "react-multi-carousel";
import CustomText from "@/components/CustomText";
import _ from "lodash";

const MyInvoiceComponent = ({ list }) => {
  const textColor = (value) => {
    switch (value) {
      case "Total Pay":
        return "primary-text";
      case "Overdue":
        return "error-text";
      case "Due Soon":
        return "pending-text";
      default:
        return "primary-text";
    }
  };

  return (
    <div className="pb-7">
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
            items: 1,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
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
        {_.map(list, (item) => {
          const title = _.get(item, ["title"], "");
          const value = _.get(item, ["value"], "");
          const date = _.get(item, ["date"], "");

          return (
            <div className="flex flex-col items-center">
              <CustomText>{title}</CustomText>
              <CustomText
                textClassName={`${textColor(title)} font-bold`}
                styles={{ fontSize: 24 }}
              >
                {value}
              </CustomText>
              <CustomText textClassName="disable-text font-size-xxsmall">
                {date}
              </CustomText>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MyInvoiceComponent;
