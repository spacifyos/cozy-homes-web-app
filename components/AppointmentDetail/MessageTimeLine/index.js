import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, isEqual } from "lodash";

const MessageTimeLine = ({ item }) => {
  const date = get(item, ["date"], "");
  // const img = get(item, ["img"], "");
  const name = get(item, ["name"], "");
  const content = get(item, ["content"], "");
  const isAuthor = get(item, ["is_author"], false);

  return (
    <div className="grid grid-cols-12 gap-1 h-full pb-4">
      <div className="xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-3 col-span-3">
        <CustomText textClassName="text-xs text-disable text-end">
          {date}
        </CustomText>
      </div>
      <div className="flex flex-col justify-center items-center col-span-1">
        <CustomImage
          src={isAuthor ? Images.ellipseRedIcon : Images.ellipseGreenIcon}
          imageStyle={{ width: 15, height: 15 }}
        />
        <div className="divider divider-horizontal pt-1 w-full h-full"></div>
      </div>

      <div className="flex-col flex w-full xl:col-span-9 lg:col-span-9 md:col-span-9 sm:col-span-8 col-span-8">
        <div className="flex gap-2 items-center pb-2">
          {/*<CustomImage*/}
          {/*  // src={img}*/}
          {/*  imageStyle={{ width: 40, height: 40 }}*/}
          {/*  className="rounded-3xl"*/}
          {/*/>*/}
          <CustomText textClassName="xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs">
            {name}
          </CustomText>
        </div>
        <CustomText textClassName="bg-primary-background py-2 px-4 rounded-2xl text-disable text-sm">
          {content}
        </CustomText>
      </div>
    </div>
  );
};

export default MessageTimeLine;
