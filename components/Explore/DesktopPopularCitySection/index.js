import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";

const DesktopPopularCitySection = ({ onClickViewMore, data, loading }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.klccIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <CustomText textClassName="font-size-xxlarge font-bold primary-text pl-2">
            Popular City
          </CustomText>
        </div>
        <CustomButton
          buttonText="View More"
          buttonClassName="primary-btn btn-sm"
          onClick={onClickViewMore}
        />
      </div>

      <div
        className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-5"
        style={{ minHeight: 410 }}
      >
        {loading ? (
            map(Array(10), (item, index) => (
              <Skeleton width="100%" height={162} key={index} />
            ))
        ) : isEmpty(data) ? (
          <div className="flex justify-center">
            <CustomEmptyBox emptyTitle="Property not available now." />
          </div>
        ) : (
          map(data, (item, index) => {
            return (
              <ListingCardComponent
                item={item}
                imageHeight={160}
                imageWidth="100%"
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default DesktopPopularCitySection;
