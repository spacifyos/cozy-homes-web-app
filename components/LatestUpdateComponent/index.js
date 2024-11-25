import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import CustomText from "@/components/CustomText";

const LatestUpdate = ({ t, item, onClickToTitle }) => {
  const date = _.get(item, "date", "");
  return (
    <div
      className="global-box-shadow primaryWhite-bg-color global-border-radius relative p-3"
      onClick={onClickToTitle}
    >
      <div className="flex items-center">
        <div className="global-border-radius primary-bg-color p-3 mr-3">
          <CustomImage
            src={Images.ringIcon}
            imageStyle={{ width: 30, height: 30 }}
          />
        </div>
        <div className="flex-col flex-1">
          <CustomText textClassName="text-xs disable-text">
            {date}
          </CustomText>
          <CustomText textClassName="text-sm font-bold">
            Title
          </CustomText>
          <CustomText textClassName="text-xs disable-text leading-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
            lorem ut ligula posuere viverra.
          </CustomText>
        </div>

        <CustomImage src={Images.moreIcon} width={25} height={25} />

        {_.isEqual(item.date, "15 Dec 2024") ? (
          <div className="error-bg-color rounded-2xl h-3 w-3 absolute right-0 top-0"></div>
        ) : (
          false
        )}
      </div>
    </div>
  );
};

export default LatestUpdate;
