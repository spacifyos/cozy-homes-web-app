import CustomText from "@/components/CustomText";
import _ from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const ListingCoinsTransaction = ({ item }) => {
  const date = _.get(item, ["date"], "");
  const title = _.get(item, ["title"], "");
  const price = _.get(item, ["price"], "");
  const coins = _.get(item, ["coins"], "");

  return (
    <div className="pb-4 w-full">
      <div className="global-border-radius global-box-shadow primaryWhite-bg-color grid grid-cols-2 p-5 relative">
        <div className="flex flex-col col-span-1">
          <CustomText textClassName="font-size-xxsmall disable-text pb-1">
            {date}
          </CustomText>
          <CustomText textClassName="font-size-xsmall font-bold">
            {title}
          </CustomText>
          <CustomText textClassName="font-size-xsmall font-bold">
            {price}
          </CustomText>
        </div>

        <div className="flex justify-center items-center">
          <CustomText textClassName="font-size-xsmall primary-text font-bold pt-4">
            + {coins} coins
          </CustomText>
          <CustomImage
            src={Images.moreIcon}
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
