import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import _ from "lodash";

const ListingCardComponent = ({ item, onClickToPropertyOverview }) => {
  const image = _.get(item, ["image"], "");
  const title = _.get(item, ["title"], "");

  return (
    <div
      className="flex flex-col items-center px-1 cursor-pointer"
      onClick={onClickToPropertyOverview}
    >
      <CustomImage
        className="rounded-2xl mb-2 global-box-shadow primaryWhite-bg-color"
        src={image}
        imageStyle={{ height: 100, width: 100 }}
      />
      <CustomText textClassName="font-size-xsmall font-bold text-center">
        {title}
      </CustomText>
    </div>
  );
};

export default ListingCardComponent;
