import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import * as listingSelector from "@/src/selectors/listing";

const ListingCardComponent = ({ t, item }) => {
  const router = useRouter();

  const propertyName = listingSelector.getPropertyName(item);
  const unitRoomName = listingSelector.getUnitRoomName(item);
  const rental = listingSelector.getRental(item);
  const propertyId = listingSelector.getPropertyId(item);

  const onClickToPropertyOverview = () => {
    router.push("/property-overview/1");
  };

  return (
    <div className="">
      <CustomImage
        src={Images.filterDefaultImage}
        width="100%"
        className="rounded-2xl mb-1 global-box-shadow"
        onClick={() => onClickToPropertyOverview(propertyId)}
      />
      <CustomText textClassName="font-size-small font-bold leading-5 line-clamp-1">
        {propertyName}
      </CustomText>
      <CustomText textClassName="font-size-xxsmall primary-text leading-4 line-clamp-1">
        {unitRoomName}
      </CustomText>
      <div className="flex items-center">
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
