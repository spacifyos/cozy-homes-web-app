import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const MeterSection = ({
  t,
  onClickTopUp,
  onClickToMeterOverview,
  onClickToMeterList,
  data,
}) => {
  return (
    <div className="pb-7">
      <div className="flex justify-between items-end">
        <CustomText textClassName="section-title">
          {t("myStay.myMeter")}
        </CustomText>

        <CustomText
          textClassName="font-size-small pb-2 cursor-pointer"
          onClick={onClickToMeterList}
        >
          {t("myStay.viewMore")}
        </CustomText>
      </div>

      {isEmpty(data) ? (
        <CustomEmptyBox />
      ) : (
        map(data, (item, index) => {
          return (
            <MeterComponent
              key={index}
              t={t}
              onClickTopUp={onClickTopUp}
              onClickToMeterOverview={onClickToMeterOverview}
              item={item}
            />
          );
        })
      )}
    </div>
  );
};

export default MeterSection;
