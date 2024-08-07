import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import * as meterSelector from "@/src/selectors/meter";
import { isEmpty } from "lodash";

const MeterDetail = ({ t, data }) => {
  const name = meterSelector.getName(data);
  const power = meterSelector.getPower(data);
  const wifi = meterSelector.getWifi(data);
  const serialNumber = meterSelector.getSerialNumber(data);
  const totalUnit = meterSelector.getTotalUnit(data);
  const unitPrice = meterSelector.getUnitPrice(data);
  const propertyName = meterSelector.getPropertyName(data);

  return (
    <div className="meter-response">
      <div className="flex flex-1 flex-col items-center">
        <div className="primary-bg-color p-3 global-border-radius">
          <CustomImage src={Images.meterIcon} imageStyle={{ width: 40 }} />
        </div>
        <CustomText textClassName="primary-text font-bold">
          {isEmpty(name) ? "-" : name}
        </CustomText>

        <CustomText textClassName="line-clamp-2 text-center">
          {isEmpty(propertyName) ? "" : propertyName}
        </CustomText>
      </div>

      <div className="divider divider-horizontal px-4"></div>

      <div className="flex flex-col items-start flex-1">
        <CustomLabelValue
          label={t("myMeterOverview.serialNumber")}
          value={serialNumber === 0 ? "" : serialNumber}
        />
        <CustomText textClassName="font-size-xxsmall disable-text">
          {t("myMeterOverview.meterStatus")}
        </CustomText>

        <div className="flex items-center pt-1 gap-5">
          <div className="flex items-center gap-1">
            <CustomImage
              src={wifi ? Images.onIcon : Images.offIcon}
              imageStyle={{ width: 15 }}
            />
            <CustomText
              textClassName={`${wifi ? "power-on-text" : "disable-text"} font-size-small`}
            >
              Wifi
            </CustomText>
          </div>
          <div className="flex items-center gap-1">
            <CustomImage
              src={power ? Images.onIcon : Images.offIcon}
              imageStyle={{ width: 15 }}
            />
            <CustomText
              textClassName={`${power ? "power-on-text" : "disable-text"} font-size-small`}
            >
              Power
            </CustomText>
          </div>
        </div>

        <div className="flex items-center gap-5 pt-2">
          <CustomLabelValue
            label={t("myMeterOverview.usedUnit")}
            value={isEmpty(totalUnit) ? "0" : totalUnit}
          />
          <CustomLabelValue
            label={t("myMeterOverview.unitPrice")}
            value={`RM${isEmpty(unitPrice) ? "0" : unitPrice}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MeterDetail;
