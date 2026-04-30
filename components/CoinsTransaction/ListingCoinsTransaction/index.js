import CustomText from "@/components/CustomText";
import _ from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Icons from "@/components/Icons";

const ListingCoinsTransaction = ({ item }) => {
  const date = _.get(item, ["date"], "");
  const title = _.get(item, ["title"], "");
  const price = _.get(item, ["price"], "");
  const coins = _.get(item, ["coins"], "");

  return (
    <div className="pb-4 w-full">
      <div className="global-border-radius global-box-shadow bg-white grid grid-cols-2 p-5 relative">
        <div className="flex flex-col col-span-1">
          <CustomText textClassName="text-xs text-disable pb-1">
            {date}
          </CustomText>
          <CustomText textClassName="text-xs font-bold">
            {title}
          </CustomText>
          <CustomText textClassName="text-xs font-bold">
            {price}
          </CustomText>
        </div>

        <div className="flex justify-center items-center">
          <CustomText textClassName="text-xs text-primary font-bold pt-4">
            + {coins} coins
          </CustomText>
          <CustomImage
            src={Icons.moreIcon}
            width={25}
            height={25}
            className="absolute right-4"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingCoinsTransaction;
