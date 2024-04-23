import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";

const MeterComponent = ({ t, onClickTopUp, onClickToMeterOverview }) => {
  return (
    <div className="meter-container">
      <CustomImage
        src={Images.moreIcon}
        width={25}
        height={25}
        className="absolute right-4"
      />

      <div className="flex items-center pb-1">
        <div
          className="primary-bg-color p-2 global-border-radius mb-1 mr-2 cursor-pointer"
          onClick={onClickToMeterOverview}
        >
          <CustomImage
            src={Images.meterIcon}
            imageStyle={{ width: 35, height: 35 }}
          />
        </div>

        <div className="flex flex-col">
          <CustomText textClassName="primary-text font-size-small font-bold pb-1 line-clamp-1 pr-5">
            M Vertica, A-01-01, Room 1 Smart Meter
          </CustomText>
          <div className="flex items-center">
            <CustomText textClassName="pr-3 font-size-xsmall disable-text">
              {t("myStay.meterStatus")}
            </CustomText>

            <div className="flex items-center pr-3">
              <CustomImage
                src={Images.onIcon}
                width={15}
                height={15}
                className="mr-1"
              />
              <CustomText textClassName="power-on-text font-size-small">
                {t("myStay.wifi")}
              </CustomText>
            </div>

            <div className="flex items-center">
              <CustomImage
                src={Images.offIcon}
                width={15}
                height={15}
                className="mr-1"
              />
              <CustomText textClassName="disable-text font-size-small">
                {t("myStay.power")}
              </CustomText>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        <div className="flex flex-col items-center col-span-2 global-box-shadow p-2 global-border-radius h-14">
          <CustomText textClassName="disable-text font-size-xxsmall">
            {t("myStay.balanceUnit")}
          </CustomText>
          <div className="flex items-center">
            <CustomText textClassName="primary-text font-size-xlarge font-bold pe-1">
              99999
            </CustomText>
            <CustomImage src={Images.refreshIcon} width={15} height={15} />
          </div>
        </div>

        <CustomButton
          buttonClassName="col-span-4 primary-btn"
          buttonStyles={{ height: "100%" }}
          textClassName="font-size-xxlarge"
          buttonText={t("myStay.topUp")}
          onClick={onClickTopUp}
        />
      </div>
    </div>
  );
};

export default MeterComponent;
