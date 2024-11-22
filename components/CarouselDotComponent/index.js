import { map, size } from "lodash";

const CarouselDotComponent = ({ data, selectedSlide }) => {
  return size(data) > 1 ? (
    <div className="mt-5 flex justify-center items-center">
      {map(data, (item, index) => {
        return (
          <div
            key={index}
            className={
              index === selectedSlide ? "banner-dot-active" : "banner-dot"
            }
          ></div>
        );
      })}
    </div>
  ) : (
    false
  );
};

export default CarouselDotComponent;
