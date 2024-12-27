import CustomText from "@/components/CustomText";
import { get, map, isEqual, toInteger, round, toNumber } from "lodash";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import Constant from "@/src/utils/Constant";
import CustomInput from "@/components/CustomInput";

const topUpOptions = [
  { name: "25", value: 25 },
  { name: "30", value: 30 },
  { name: "35", value: 35 },
  { name: "45", value: 45 },
  { name: "50", value: 50 },
  { name: "100", value: 100 },
];

const MeterTopUpSection = ({
  onClickSelectPrice,
  selectedPrice,
  unitPrice,
  onClickPayNow,
  onChangeSelectedPriceValue,
  onClickClearSelectedPrice,
  tenancy,
  tenancyValue,
  onChangeTenancyValue,
}) => {
  return (
    <div>
      <CustomText textClassName="section-title pb-2">
        Top Up Price (Malaysia Ringgit - RM)
      </CustomText>

      <div className="global-box-shadow global-border-radius primaryWhite-bg-color p-5">
        <div className="grid grid-cols-2 gap-1">
            <CustomText textClassName="text-sm font-bold col-span-2">
              Tenancy
            </CustomText>

            <CustomSelect
              selectStyles={{ border: "unset" }}
              className="max-w-full mb-8 col-span-2 min-w-full"
              selectClassName="bg-color w-full"
              placeholder={"Select tenancy"}
              optionList={tenancy}
              onChange={onChangeTenancyValue}
              value={tenancyValue}
            />

          <CustomText textClassName="text-sm font-bold col-span-2">
            Top Up Price
          </CustomText>

          <div className="grid grid-cols-3 gap-3 justify-center items-center pb-8 col-span-2">
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

          <CustomText textClassName="text-sm font-bold">
            Other Price
          </CustomText>

          <CustomText textClassName="text-sm primary-text font-bold">
            Total Unit
          </CustomText>

          <input
            type="number"
            className="input w-4/5 bg-color global-box-shadow meter-input"
            placeholder={"unit"}
            value={selectedPrice}
            onChange={onChangeSelectedPriceValue}
          />

          <CustomText textClassName="font-bold flex items-center text-base">
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
          buttonText={"Pay Now"}
          buttonClassName="primary-btn"
          onClick={onClickPayNow}
        />
      </div>
    </div>
  );
};

export default MeterTopUpSection;
