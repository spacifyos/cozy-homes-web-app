import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as listingSelector from "@/src/selectors/listing";
import { isEmpty } from "lodash";
import Image from "next/image";
import CustomImage from "@/components/CustomImage";

const ListingCardComponent = ({
  t,
  item,
  imageHeight = 150,
  imageClassName,
}) => {
  const propertyName = listingSelector.getPropertyName(item);
  const unitRoomName = listingSelector.getUnitRoomName(item);
  const rental = listingSelector.getRental(item);
  const propertyId = listingSelector.getId(item);
  const imageUrl = listingSelector.getImageUrl(item);

  return (
    <a href={`/property-overview/${propertyId}`} className="cursor-pointer">
      {/*<div*/}
      {/*  className="relative rounded-2xl global-box-shadow w-full overflow-hidden primaryWhite-bg-color"*/}
      {/*  style={{ height: imageHeight }}*/}
      {/*>*/}
      <CustomImage
        className={`rounded-2xl mb-2 global-box-shadow primaryWhite-bg-color overflow-hidden ${imageClassName}`}
        src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
      />
      {/*<Image*/}
      {/*  alt={isEmpty(propertyName) ? "image" : propertyName}*/}
      {/*  src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}*/}
      {/*  style={{ objectFit: isEmpty(imageUrl) ? "contain" : "cover" }}*/}
      {/*  loader={() => {*/}
      {/*    return isEmpty(imageUrl) ? Images.imageNotFound : imageUrl;*/}
      {/*  }}*/}
      {/*  sizes="100vw"*/}
      {/*  fill*/}
      {/*/>*/}
      {/*</div>*/}

      <CustomText textClassName="text-sm font-bold leading-5 line-clamp-1 pt-2">
        {isEmpty(propertyName) ? "-" : propertyName}
      </CustomText>
      {/*<CustomText textClassName="text-xs primary-text leading-4 line-clamp-1">*/}
      {/*  {isEmpty(unitRoomName) ? "-" : unitRoomName}*/}
      {/*</CustomText>*/}
      <div className="flex items-center flex-wrap">
        <CustomText textClassName="text-sm font-bold mr-2">
          RM {isEmpty(rental) ? "0" : rental}
        </CustomText>
        <CustomText textClassName="text-xs disable-text">
          / month
        </CustomText>
      </div>
    </a>
  );
};

export default ListingCardComponent;
