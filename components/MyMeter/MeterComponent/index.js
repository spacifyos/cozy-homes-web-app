import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as meterSelector from "@/src/selectors/meter";
import { isEmpty } from "lodash";

const MeterComponent = ({ t, onClickToMeterOverview, item }) => {
  const id = meterSelector.getId(item);
  const name = meterSelector.getName(item);
  const power = meterSelector.getPower(item);
  const wifi = meterSelector.getWifi(item);
  const balanceUnit = meterSelector.getBalanceUnit(item);

  return (
    <div
      className="primaryWhite-bg-color global-box-shadow global-border-radius px-4 pt-4 pb-4 flex cursor-pointer"
      onClick={() => onClickToMeterOverview(id)}
    >
      <div className="primary-bg-color px-2 py-3 global-border-radius flex items-center">
        <CustomImage
          src={Images.meterIcon}
          imageStyle={{ width: 35, height: 35 }}
        />
        <div className="flex flex-col items-start justify-center px-2 global-border-radius">
          <CustomText textClassName="white-text font-size-xxsmall">
            Available Unit
          </CustomText>

          <div className="flex items-end">
            <CustomText textClassName="white-text font-size-large font-bold pe-1">
              {isEmpty(balanceUnit) ? "0" : balanceUnit}
            </CustomText>
            <CustomText textClassName="white-text font-size-xxsmall pe-1">
              Unit
            </CustomText>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center ps-3 flex-1">
        <CustomText textClassName="primary-text font-bold pb-1.5 line-clamp-1">
          {isEmpty(name) ? "-" : name}
        </CustomText>

        <div className="flex items-center">
          <CustomText textClassName="pr-2 font-size-xsmall disable-text">
            {t("myStay.meterStatus")}
          </CustomText>

          <div className="flex flex-wrap">
            <div className="flex items-center pr-2">
              <CustomImage
                src={wifi ? Images.onIcon : Images.offIcon}
                imageStyle={{ width: 15 }}
                className="mr-1"
              />
              <CustomText
                textClassName={`${wifi ? "power-on-text" : "disable-text"} font-size-xsmall`}
              >
                {t("myStay.wifi")}
              </CustomText>
            </div>

            <div className="flex items-center">
              <CustomImage
                src={power ? Images.onIcon : Images.offIcon}
                imageStyle={{ width: 15 }}
                className="mr-1"
              />
              <CustomText
                textClassName={`${power ? "power-on-text" : "disable-text"} font-size-xsmall`}
              >
                {t("myStay.power")}
              </CustomText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterComponent;
