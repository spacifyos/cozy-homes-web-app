import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import ListingCardComponent from "@/components/Search/ListingCardComponent";
import CustomPagination from "@/components/CustomPagination";

const DesktopListingSection = ({
  t,
  listingPropertyDataLoading,
  listingPropertyData,
  lastPage,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="">
      {listingPropertyDataLoading ? (
        <div className="grid grid-cols-4 gap-3">
          {map(Array(12), (item, index) => (
            <Skeleton width="100%" height={200} key={index} />
          ))}
        </div>
      ) : isEmpty(listingPropertyData) ? (
        <div className="flex flex-1 items-center justify-center">
          <CustomEmptyBox />
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
          {map(listingPropertyData, (item, index) => (
            <ListingCardComponent
              key={index}
              item={item}
              t={t}
              imageHeight={200}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DesktopListingSection;
