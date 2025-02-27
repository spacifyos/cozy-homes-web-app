import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as meterSelector from "@/src/selectors/meter";
import { isEmpty } from "lodash";

const MeterComponent = ({ item }) => {
  const id = meterSelector.getId(item);
  const name = meterSelector.getName(item);
  const power = meterSelector.getPower(item);
  const wifi = meterSelector.getWifi(item);
  const balanceUnit = meterSelector.getBalanceUnit(item);

  return (
    <a
      href={`/user/my-meter/${id}`}
      className="bg-white global-box-shadow global-border-radius px-4 pt-4 pb-4 flex cursor-pointer"
    >
      <div className="bg-primary px-2 py-3 global-border-radius flex items-center">
        <CustomImage
          src={Images.meterIconWhite}
          className="w-5 mx-2"
        />
        <div className="flex flex-col items-start justify-center px-2 global-border-radius">
          <CustomText textClassName="text-white text-xs">
            Available Unit
          </CustomText>

          <div className="flex items-end">
            <CustomText textClassName="text-white text-base font-bold pe-1">
              {isEmpty(balanceUnit) ? "0" : balanceUnit}
            </CustomText>
            <CustomText textClassName="text-white text-xs pe-1">
              Unit
            </CustomText>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center ps-3 flex-1">
        <CustomText textClassName="text-primary font-bold pb-1.5 line-clamp-1">
          {isEmpty(name) ? "-" : name}
        </CustomText>

        <div className="flex items-center">
          <CustomText textClassName="pr-2 text-xs text-disable">
            Meter Status
          </CustomText>

          <div className="flex flex-wrap">
            <div className="flex items-center pr-2">
              <CustomImage
                src={wifi ? Images.powerIconAqua : Images.powerIconDisable}
                imageStyle={{ width: 15 }}
                className="mr-1"
              />
              <CustomText
                textClassName={`${wifi ? "text-aqua" : "text-disable"} text-xs`}
              >
                Wifi
              </CustomText>
            </div>

            <div className="flex items-center">
              <CustomImage
                src={power ? Images.powerIconAqua : Images.powerIconDisable}
                imageStyle={{ width: 15 }}
                className="mr-1"
              />
              <CustomText
                textClassName={`${power ? "text-aqua" : "text-disable"} text-xs`}
              >
                Power
              </CustomText>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default MeterComponent;
