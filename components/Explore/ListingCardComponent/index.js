import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import _ from "lodash";
import * as listingSelector from "@/src/selectors/listing";

const ListingCardComponent = ({ item, onClickToPropertyListing }) => {
  const name = listingSelector.getName(item);
  const imageUrl = listingSelector.getImageUrl(item);
  const propertyId = listingSelector.getPropertyId(item);

  return (
    <div
      className="flex flex-col items-center px-1 cursor-pointer"
      onClick={() => onClickToPropertyListing("property_id", propertyId)}
    >
      <CustomImage
        className="rounded-2xl mb-2 global-box-shadow primaryWhite-bg-color"
        src={
          _.isEmpty(imageUrl) ? "/images/college_university/Inti.png" : imageUrl
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
