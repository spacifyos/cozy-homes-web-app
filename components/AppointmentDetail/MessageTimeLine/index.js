import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _ from "lodash";
const MessageTimeLine = ({ t, item }) => {
  const date = _.get(item, ["date"], "");
  const img = _.get(item, ["img"], "");
  const name = _.get(item, ["name"], "");
  const chat = _.get(item, ["chat"], "");
  const identity = _.get(item, ["identity"], "");

  return (
    <div className="grid grid-cols-12 gap-1 h-full pb-3">
      <div className="col-span-2">
        <CustomText textClassName="font-size-xxsmall disable-text text-end">
          {date}
        </CustomText>
      </div>
      <div className="flex flex-col justify-center items-center col-span-1">
        <CustomImage
          src={
            _.isEqual(identity, "agent")
              ? Images.ellipseRedIcon
              : Images.ellipseGreenIcon
          }
          width={15}
          height={15}
        />
        <div className="divider divider-horizontal pt-1 w-full h-full"></div>
      </div>

      <div className="flex-col flex w-full col-span-9">
        <div className="flex gap-2 items-center pb-2">
          <CustomImage src={img} width={30} className="rounded-3xl" />
          <CustomText textClassName="w-full">{name}</CustomText>
        </div>
        <CustomText textClassName="bg-color p-1 px-3 global-border-radius disable-text font-size-small">
          {chat}
        </CustomText>
      </div>
    </div>
  );
};

export default MessageTimeLine;
