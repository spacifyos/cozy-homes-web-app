import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";

const DesktopPopularCitySection = ({ onClickToFilter }) => {
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
          onClick={onClickToFilter}
        />
      </div>

      <div className="grid grid-cols-5 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-8">
        {false ? (
          <div className="flex" style={{ height: 144 }}>
            {map(Array(4), (item, index) => (
              <Skeleton width={105} height={105} key={index} />
            ))}
          </div>
        ) : isEmpty(Array(12)) ? (
          <div className="flex justify-center" style={{ height: 144 }}>
            <CustomEmptyBox emptyTitle="Property not available now." />
          </div>
        ) : (
          map(Array(12), (item, index) => {
            return (
              <ListingCardComponent
                item={item}
                imageHeight="100%"
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
