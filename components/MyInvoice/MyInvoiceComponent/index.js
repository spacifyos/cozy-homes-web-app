import Carousel from "react-multi-carousel";
import CustomText from "@/components/CustomText";
import _ from "lodash";
import * as invoiceSelector from "@/src/selectors/invoice";
import moment from "moment";

const MyInvoiceComponent = ({ data }) => {
  const textColor = (value) => {
    switch (value) {
      case "Total Paid Invoices":
        return "text-available";
      case "Total Overdue Invoices":
        return "text-error";
      case "Total Unpaid Invoices":
        return "text-warning";
      case "Total Invoices":
        return "text-primary";
      default:
        return "text-warning";
    }
  };

  return (
    <div className="pb-5">
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
        {_.map(data, (item, index) => {
          const name = invoiceSelector.getName(item);
          const totalAmountText = invoiceSelector.getTotalAmountText(item);

          return (
            <div className="flex flex-col items-center" key={index}>
              <CustomText>{_.isEmpty(name) ? "-" : name}</CustomText>
              <CustomText
                textClassName={`${textColor(name)} font-bold`}
                styles={{ fontSize: 24 }}
              >
                RM{_.isEmpty(totalAmountText) ? "0" : totalAmountText}
              </CustomText>
              <CustomText textClassName="disable-text text-xs">
                {`Last updated: ${moment().format("DD MMM YYYY")}`}
              </CustomText>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MyInvoiceComponent;
