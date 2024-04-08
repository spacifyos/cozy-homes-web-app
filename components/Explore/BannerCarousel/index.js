import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import _ from "lodash";

const imageList = [
  Images.banner1Image,
  Images.banner2Image,
  Images.banner3Image,
];

const BannerCarousel = () => {
  return (
    <div className="carousel-container mb-3">
      {_.map(imageList, (item) => {
        return (
          <div className="carousel-item">
            <CustomImage src={item} width={320} />
          </div>
        );
      })}
    </div>
  );
};

export default BannerCarousel;
