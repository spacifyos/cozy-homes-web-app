import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import {useRouter} from "next/router";

const ListingCardComponent = ({onClickToPropertyDetail}) => {
  return (
    <div className="flex flex-col items-center">
      <CustomImage
        className="rounded-2xl mb-2"
        src={Images.listingDefaultImage}
        width="100%"
        onClick={onClickToPropertyDetail}
      />
      <CustomText textClassName="font-size-small font-bold">
        Kuala Lumpur
      </CustomText>
    </div>
  );
};

export default ListingCardComponent;
