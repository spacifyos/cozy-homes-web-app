import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";

const ListingCardComponent = ({ t }) => {
  const router = useRouter();
  const onClickToPropertyOverview = () => {
    router.push("/property-overview/1");
  };

  return (
    <div className="">
      <CustomImage
        src={Images.filterDefaultImage}
        width="100%"
        className="rounded-2xl mb-1 global-box-shadow"
        onClick={onClickToPropertyOverview}
      />
      <CustomText textClassName="font-size-small font-bold leading-5 line-clamp-1">
        M Vertica
      </CustomText>
      <CustomText textClassName="font-size-xxsmall primary-text leading-4 line-clamp-1">
        A-01-01, Room 2
      </CustomText>
      <div className="flex items-center">
        <CustomText textClassName="font-size-small font-bold mr-2">
          RM 750
        </CustomText>
        <CustomText textClassName="font-size-xsmall disable-text">
          / month
        </CustomText>
      </div>
    </div>
  );
};

export default ListingCardComponent;
