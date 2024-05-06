import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import * as listingSelector from "@/src/selectors/listing";

const FacilitiesComponent = ({ item }) => {
  const name = listingSelector.getName(item);
  const icon = listingSelector.getImageUrl(item);

  return (
    <div className="flex gap-2 p-2 w-1/2">
      <CustomImage src={icon} imageStyle={{ width: 20, height: 20 }} />

      <CustomText textClassName="disable-text font-size-xsmall">
        {name}
      </CustomText>
    </div>
  );
};

export default FacilitiesComponent;
