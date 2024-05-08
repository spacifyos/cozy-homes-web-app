import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import _ from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import Images from "@/src/utils/Image"

const ListingCardComponent = ({ item, onClickToPropertyListing }) => {
  const name = listingSelector.getName(item);
  const imageUrl = listingSelector.getImageUrl(item);
  const propertyId = listingSelector.getPropertyId(item);
  const profileId = listingSelector.getProfileId(item);

  const key = _.isEmpty(profileId) ? "property_id" : "profile_id";
  const value = _.isEmpty(profileId) ? propertyId : profileId;

  return (
    <div
      className="flex flex-col items-center px-1 cursor-pointer"
      onClick={() => onClickToPropertyListing(key, value)}
    >
      <CustomImage
        className="rounded-2xl mb-2 global-box-shadow primaryWhite-bg-color"
        src={
          _.isEmpty(imageUrl) ? Images.imageNotFound : imageUrl
        }
        imageStyle={{ height: 100, width: 100 }}
      />
      <CustomText textClassName="font-size-xsmall font-bold text-center">
        {name}
      </CustomText>
    </div>
  );
};

export default ListingCardComponent;
