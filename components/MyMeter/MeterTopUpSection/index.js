import CustomText from "@/components/CustomText";
import { get, map, isEqual, toInteger, round, toNumber } from "lodash";
import CustomButton from "@/components/CustomButton";

const topUpOptions = [
  { name: "25", value: 25 },
  { name: "30", value: 30 },
  { name: "35", value: 35 },
  { name: "45", value: 45 },
  { name: "50", value: 50 },
  { name: "100", value: 100 },
];

const MeterTopUpSection = ({
  t,
  onClickSelectPrice,
  selectedPrice,
  unitPrice,
  onClickPayNow,
  onChangeSelectedPriceValue,
  onClickClearSelectedPrice,
}) => {
  return (
    <div>
      <CustomText textClassName="section-title">
        Top Up Price (Malaysia Ringgit - RM)
      </CustomText>
      <div className="global-box-shadow global-border-radius primaryWhite-bg-color p-5">
        <div className="grid grid-cols-3 gap-3 justify-center items-center pb-8">
          {map(topUpOptions, (topUpOption, index) => {
            const name = get(topUpOption, ["name"], "");
            const value = get(topUpOption, ["value"], 0);

            return (
              <CustomButton
                key={index}
                buttonClassName={`btn-md ${isEqual(selectedPrice, value) ? "primary-btn" : "pending-btn"}`}
                buttonText={name}
                onClick={() => onClickSelectPrice(value)}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-1">
          <CustomText textClassName="disable-text font-bold">
            Other Price
          </CustomText>

          <CustomText textClassName="primary-text font-bold">
            Total Unit
          </CustomText>

          <input
            type="number"
            className="input w-4/5 bg-color global-box-shadow meter-input"
            style={{ height: 40 }}
            placeholder={t("topUpMeter.unit")}
            value={selectedPrice}
            onChange={onChangeSelectedPriceValue}
          />

          <CustomText
            textClassName="font-bold flex items-center"
            style={{ height: 40 }}
          >
            {`${round(toNumber(selectedPrice) / toNumber(unitPrice), 1)} unit`}
          </CustomText>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-7 ">
        <CustomButton
          buttonText={"Clear"}
          buttonClassName="default-btn-outline"
          onClick={onClickClearSelectedPrice}
        />
        <CustomButton
          buttonText={t("topUpMeter.payNow")}
          buttonClassName="primary-btn"
          onClick={onClickPayNow}
        />
      </div>
    </div>
  );
};

export default MeterTopUpSection;
