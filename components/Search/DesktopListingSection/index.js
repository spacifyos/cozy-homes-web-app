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
    <div className="h-full">
      {listingPropertyDataLoading ? (
        <div className="">
          <div className="xl:grid hidden grid-cols-4 gap-3">
            {map(Array(8), (item, index) => (
              <Skeleton
                width="100%"
                className="h-52 xl:h-60 lg:h-60 md:h-52 sm:h-52"
                key={index}
              />
            ))}
          </div>

          <div className="xl:hidden lg:grid hidden grid-cols-4 gap-3">
            {map(Array(8), (item, index) => (
              <Skeleton
                width="100%"
                className="h-52 xl:h-60 lg:h-60 md:h-52 sm:h-52"
                key={index}
              />
            ))}
          </div>

          <div className="xl:hidden lg:hidden md:grid hidden grid-cols-3 gap-3">
            {map(Array(6), (item, index) => (
              <Skeleton
                width="100%"
                className="h-52 xl:h-60 lg:h-60 md:h-52 sm:h-52"
                key={index}
              />
            ))}
          </div>

          <div className="xl:hidden lg:hidden md:hidden sm:grid hidden grid-cols-2 gap-3">
            {map(Array(4), (item, index) => (
              <Skeleton
                width="100%"
                className="h-52 xl:h-60 lg:h-60 md:h-52 sm:h-52"
                key={index}
              />
            ))}
          </div>

          <div className="xl:hidden lg:hidden md:hidden sm:hidden grid grid-cols-2 gap-3">
            {map(Array(4), (item, index) => (
              <Skeleton
                width="100%"
                className="h-52 xl:h-60 lg:h-60 md:h-52 sm:h-52"
                key={index}
              />
            ))}
          </div>
        </div>
      ) : isEmpty(listingPropertyData) ? (
        <div className="flex flex-1 items-center justify-center h-full">
          <CustomEmptyBox />
        </div>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-5">
          {map(listingPropertyData, (item, index) => (
            <ListingCardComponent
              key={index}
              item={item}
              t={t}
              imageClassName="h-52 xl:h-60 lg:h-60 md:h-52 sm:h-52 w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DesktopListingSection;
