import CustomImage from "@/components/CustomImage";
import { isEmpty } from "lodash";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as listingSelector from "@/src/selectors/listing";

const DesktopListingCardComponent = ({ item }) => {
  const imageUrl = listingSelector.getImageUrl(item);

  return (
    <a
      // href={`/search?key=${key}&id=${value}`}
      className="flex flex-col items-center px-1 cursor-pointer"
    >
      <CustomImage
        className="rounded-2xl mb-2 global-box-shadow primaryWhite-bg-color"
        src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
        // imageStyle={{ height: 100, width: 100 }}
      />
      <CustomText
        textClassName="font-size-xsmall font-bold text-center"
        lineClamp={2}
      >
        {"Kuala Lumpur"}
      </CustomText>
    </a>
  );
};

export default DesktopListingCardComponent;
