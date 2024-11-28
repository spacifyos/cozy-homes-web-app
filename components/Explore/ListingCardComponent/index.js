import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { get, isEmpty, map } from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import Images from "@/src/utils/Image";

const ListingCardComponent = ({ item, hideLabel = false, imageClassName }) => {
  const label = listingSelector.getLabel(item);
  const name = listingSelector.getName(item);
  const imageUrl = listingSelector.getImageUrl(item);
  const propertyId = listingSelector.getPropertyId(item);
  const profileId = listingSelector.getProfileId(item);
  const tags = listingSelector.getTags(item);
  const tagsCode = map(tags, (tag) => listingSelector.getCode(tag));
  const slug = get(item, ["slug"], "");

  const key = get(item, ["key", "name"], "");
  const value = get(item, ["key", "value"], "");

  return (
    <a
      href={`/search${isEmpty(slug) ? "" : `/${slug}`}`}
      className="flex flex-col items-center cursor-pointer"
    >
      <CustomImage
        className={`rounded-2xl ${hideLabel ? false : "mb-2"} global-box-shadow primaryWhite-bg-color overflow-hidden ${imageClassName}`}
        src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
      />
      {hideLabel ? (
        false
      ) : (
        <CustomText
          textClassName="xl:text-sm lg:text-sm md:text-sm sm:text-sm text-xs font-bold xl:h-10 lg:h-10 md:h-10 sm:h-10 h-8 text-center"
          lineClamp={2}
        >
          {label}
        </CustomText>
      )}
    </a>
  );
};

export default ListingCardComponent;
