import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const MeterSection = ({ t, data }) => {
  return (
    <div className="pb-7">
      <div className="flex justify-between items-end">
        <CustomText textClassName="section-title">
          {t("myStay.myMeter")}
        </CustomText>

        <a href={"/my-meter"}>
          <CustomText textClassName="text-sm pb-2 cursor-pointer">
            {t("myStay.viewMore")}
          </CustomText>
        </a>
      </div>

      {isEmpty(data) ? (
        <CustomEmptyBox emptyTitle="No meter found" />
      ) : (
        map(data, (item, index) => {
          return <MeterComponent key={index} t={t} item={item} />;
        })
      )}
    </div>
  );
};

export default MeterSection;
