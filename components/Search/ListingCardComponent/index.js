import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as listingSelector from "@/src/selectors/listing";
import { isEmpty } from "lodash";
import Image from "next/image";

const ListingCardComponent = ({ t, item, imageHeight = 150 }) => {
  const propertyName = listingSelector.getPropertyName(item);
  const unitRoomName = listingSelector.getUnitRoomName(item);
  const rental = listingSelector.getRental(item);
  const propertyId = listingSelector.getId(item);
  const imageUrl = listingSelector.getImageUrl(item);

  return (
    <a href={`/property-overview/${propertyId}`} className="cursor-pointer">
      <div
        className="relative rounded-2xl global-box-shadow w-full overflow-hidden primaryWhite-bg-color"
        style={{ height: imageHeight }}
      >
        <Image
          alt={isEmpty(propertyName) ? "image" : propertyName}
          src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
          style={{ objectFit: isEmpty(imageUrl) ? "contain" : "cover" }}
          loader={() => {
            return isEmpty(imageUrl) ? Images.imageNotFound : imageUrl;
          }}
          sizes="100vw"
          fill
        />
      </div>

      <CustomText textClassName="font-size-small font-bold leading-5 line-clamp-1 pt-2">
        {isEmpty(propertyName) ? "-" : propertyName}
      </CustomText>
      <CustomText textClassName="font-size-xxsmall primary-text leading-4 line-clamp-1">
        {isEmpty(unitRoomName) ? "-" : unitRoomName}
      </CustomText>
      <div className="flex items-center flex-wrap">
        <CustomText textClassName="font-size-small font-bold mr-2">
          RM {isEmpty(rental) ? "0" : rental}
        </CustomText>
        <CustomText textClassName="font-size-xsmall disable-text">
          / month
        </CustomText>
      </div>
    </a>
  );
};

export default ListingCardComponent;
