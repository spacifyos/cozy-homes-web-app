import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import * as reportSelector from "@/src/selectors/report";

const MyReportCard = ({ data, onClickToDetail }) => {
  return (
    <div className="grid gap-3">
      {map(data, (item, index) => {
        const description = reportSelector.getDescription(item);
        const propertyName = reportSelector.getPropertyUnitName(item);
        const period = reportSelector.getPeriod(item);
        const id = reportSelector.getUnitId(item);

        return (
          <div
            onClick={() => onClickToDetail(id)}
            key={index}
            className="flex items-center primaryWhite-bg-color global-box-shadow global-border-radius px-4 py-3 cursor-pointer"
          >
            <CustomImage src={Images.paperIcon} imageStyle={{ width: 25 }} />

            <div className="pl-3">
              {/*<CustomText textClassName="font-size-xxsmall disable-text italic">*/}
              {/*  08 Aug 2024, 3.35pm*/}
              {/*</CustomText>*/}
              <CustomText textClassName="font-size-small primary-text font-bold">
                {isEmpty(propertyName) ? "-" : propertyName}
              </CustomText>
              <CustomText textClassName="font-size-small font-bold">
                {isEmpty(description) ? "-" : description}
              </CustomText>
              <CustomText textClassName="disable-text font-size-small">
                {isEmpty(period) ? "-" : period}
              </CustomText>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyReportCard;
