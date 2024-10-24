import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { get, isEmpty } from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import Images from "@/src/utils/Image";

const ListingCardComponent = ({ item }) => {
  const name = listingSelector.getName(item);
  const imageUrl = listingSelector.getImageUrl(item);
  const propertyId = listingSelector.getPropertyId(item);
  const profileId = listingSelector.getProfileId(item);

  const key = get(item, ["key", "name"], "");
  const value = get(item, ["key", "value"], "");

  return (
    <a
      href={`/search?key=${key}&id=${value}`}
      className="flex flex-col items-center px-1 cursor-pointer"
    >
      <CustomImage
        className="rounded-2xl mb-2 global-box-shadow primaryWhite-bg-color"
        src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
        imageStyle={{ height: 100, width: "100%" }}
      />
      <CustomText
        textClassName="font-size-xsmall font-bold text-center"
        lineClamp={2}
      >
        {name}
      </CustomText>
    </a>
  );
};

export default ListingCardComponent;
