import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import * as meterSelector from "@/src/selectors/meter";
import { isEmpty } from "lodash";

const MeterComponent = ({ onClickToMeterOverview, item }) => {
  const id = meterSelector.getId(item);
  const name = meterSelector.getName(item);
  const power = meterSelector.getPower(item);
  const wifi = meterSelector.getWifi(item);
  const balanceUnit = meterSelector.getBalanceUnit(item);

  return (
    <div
      className="meter-container"
      // onClick={() => onClickToMeterOverview(id)}
    >
      {/*<CustomImage*/}
      {/*  src={Images.moreIcon}*/}
      {/*  width={25}*/}
      {/*  height={25}*/}
      {/*  className="absolute right-4"*/}
      {/*/>*/}

      <div className="flex items-center pb-1">
        <div className="bg-primary p-2 global-border-radius mb-1 mr-2">
          <CustomImage
            src={Images.meterIcon}
            imageStyle={{ width: 35, height: 35 }}
          />
        </div>

        <div className="flex flex-col">
          <CustomText textClassName="text-primary text-sm font-bold pb-1 line-clamp-1 pr-5">
            {isEmpty(name) ? "-" : name}
          </CustomText>
          <div className="flex items-center">
            <CustomText textClassName="pr-3 text-xs text-disable">
              Meter Status
            </CustomText>

            <div className="flex items-center pr-3">
              <CustomImage
                src={wifi ? Images.onIcon : Images.offIcon}
                imageStyle={{ width: 15 }}
                className="mr-1"
              />
              <CustomText
                textClassName={`${wifi ? "text-aqua" : "text-disable"} text-sm`}
              >
                WIFI
              </CustomText>
            </div>

            <div className="flex items-center">
              <CustomImage
                src={power ? Images.onIcon : Images.offIcon}
                imageStyle={{ width: 15 }}
                className="mr-1"
              />
              <CustomText
                textClassName={`${power ? "text-aqua" : "text-disable"} text-sm`}
              >
                Power
              </CustomText>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-8 sm:grid-cols-6 grid-cols-6 gap-2">
        <div className="flex flex-col items-center col-span-2 global-box-shadow p-2 global-border-radius h-14 bg-primary-background">
          <CustomText textClassName="text-disable text-xs">
            Balance Unit
          </CustomText>
          <div className="flex items-center">
            <CustomText textClassName="text-primary text-base font-bold pe-1">
              {isEmpty(balanceUnit) ? "-" : balanceUnit}
            </CustomText>
            {/*<CustomImage src={Images.refreshIcon} width={15} height={15} />*/}
          </div>
        </div>

        <a className="col-span-4" href={`/user/my-meter/${id}`}>
          <CustomButton
            buttonClassName="w-full btn-primary h-14"
            textClassName="text-lg"
            buttonText="Top Up"
          />
        </a>
      </div>
    </div>
  );
};

export default MeterComponent;
