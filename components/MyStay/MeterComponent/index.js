import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";

const MeterComponent = () => {
  return (
    <div className="primaryWhite-bg-color global-box-shadow global-border-radius px-4 pt-3 pb-4 flex flex-col justify-between relative">
      <CustomImage
        src={Images.moreIcon}
        width={5}
        height={10}
        className="absolute right-4"
      />

      <div className="flex items-center pb-1">
        <div className="primary-bg-color p-3 global-border-radius mb-1 mr-2">
          <CustomImage src={Images.meterIcon} width={20} height={20} />
        </div>

        <div className="flex flex-col">
          <CustomText textClassName="primary-text font-bold pb-1 line-clamp-1">
            M Vertica, A-01-01, Room 1 Smart Meter
          </CustomText>
          <div className="flex items-center">
            <CustomText textClassName="pr-3 font-size-small disable-text">
              Meter Status
            </CustomText>

            <div className="flex items-center pr-3">
              <CustomImage
                src={Images.onIcon}
                width={20}
                height={20}
                className="mr-1"
              />
              <CustomText textClassName="power-on-text font-size-small">
                Wifi
              </CustomText>
            </div>

            <div className="flex items-center">
              <CustomImage
                src={Images.offIcon}
                width={20}
                height={20}
                className="mr-1"
              />
              <CustomText textClassName="disable-text font-size-small">
                Power
              </CustomText>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3">
        <div className="flex flex-col items-center col-span-2 global-box-shadow p-2 global-border-radius">
          <CustomText textClassName="disable-text font-size-xxsmall">
            Balance Unit
          </CustomText>
          <div className="flex items-center">
            <CustomText textClassName="primary-text font-size-xlarge font-bold pe-1">
              99999
            </CustomText>
            <CustomImage src={Images.refreshIcon} width={15} height={15} />
          </div>
        </div>

        <CustomButton
          buttonClassName="col-span-4 primary-btn h-full"
          textClassName="font-size-xxlarge"
          buttonText="Top Up"
        />
      </div>
    </div>
  );
};

export default MeterComponent;
