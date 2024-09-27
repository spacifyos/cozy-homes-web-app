import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import DesktopListingCardComponent from "@/components/Explore/DesktopListingCardComponent";

const DesktopListingSection = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center pb-4">
        <CustomText textClassName="font-size-xxlarge font-bold primary-text">
          Popular City
        </CustomText>
        <CustomButton
          buttonText="View More"
          buttonClassName="primary-btn btn-sm"
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
            return <DesktopListingCardComponent item={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default DesktopListingSection;
