import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as listingSelector from "@/src/selectors/listing";
import _ from "lodash";

const ListingCardComponent = ({ t, item, onClickToPropertyOverview }) => {
  const propertyName = listingSelector.getPropertyName(item);
  const unitRoomName = listingSelector.getUnitRoomName(item);
  const rental = listingSelector.getRental(item);
  const propertyId = listingSelector.getId(item);
  const imageUrl = listingSelector.getImageUrl(item);

  return (
    <div className="cursor-pointer">
      <CustomImage
        src={_.isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
        width="100%"
        className="rounded-2xl mb-1 global-box-shadow primaryWhite-bg-color"
        imageStyle={{ objectFit: "cover", height: 150 }}
        onClick={() => onClickToPropertyOverview(propertyId)}
      />
      <CustomText textClassName="font-size-small font-bold leading-5 line-clamp-1">
        {propertyName}
      </CustomText>
      <CustomText textClassName="font-size-xxsmall primary-text leading-4 line-clamp-1">
        {unitRoomName}
      </CustomText>
      <div className="flex items-center flex-wrap">
        <CustomText textClassName="font-size-small font-bold mr-2">
          RM {rental}
        </CustomText>
        <CustomText textClassName="font-size-xsmall disable-text">
          / month
        </CustomText>
      </div>
    </div>
  );
};

export default ListingCardComponent;
