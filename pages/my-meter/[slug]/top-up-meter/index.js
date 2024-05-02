import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomText from "@/components/CustomText";
import MeterRadialProgressComponent from "@/components/MyMeter/MeterRadialProgressComponent";
import MeterDetail from "@/components/MyMeter/MeterDetail";
import BalanceUnit from "@/components/MyMeter/BalanceUnit";
import { useRouter } from "next/router";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";

export { getServerSideProps };
const topUpUnit = [
  { unit: "25" },
  { unit: "30" },
  { unit: "35" },
  { unit: "45" },
  { unit: "50" },
  { unit: "100" },
];
const TopUpMeter = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [topUpUnitChange, setTopUpUnit] = useState("");

  const onClickGoBack = () => {
    router.back();
  };

  const onClickTopUp = (topUpUnit) => {
    setTopUpUnit(topUpUnit);
  };
  return (
    <CustomHeader
      pageTitle={t("pageTitle.topUpMeter")}
      hideBgImage
      onClickGoBack={onClickGoBack}
      hideRightButton
    >
      <div className="body-container pb-4">
        <div className="radial-container pb-7">
          <MeterRadialProgressComponent t={t} />
        </div>

        <MeterDetail t={t} />

        <BalanceUnit t={t} />

        <CustomText textClassName="section-title">
          {t("topUpMeter.topUpUnit")}
        </CustomText>
        <div className="global-box-shadow global-border-radius primaryWhite-bg-color p-5">
          <div className="grid grid-cols-3 gap-3 justify-center items-center pb-8">
            {_.map(topUpUnit, (item, index) => {
              return (
                <CustomButton
                  key={index}
                  buttonClassName={`btn-md ${_.isEqual(topUpUnitChange, _.get(item, ["unit"], "")) ? "primary-btn" : "pending-btn"}`}
                  buttonText={_.get(item, ["unit"], "")}
                  onClick={() => onClickTopUp(_.get(item, ["unit"], ""))}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-1">
            <CustomText textClassName="disable-text">
              {t("topUpMeter.otherUnit")}
            </CustomText>

            <CustomText textClassName="primary-text font-bold">
              {t("topUpMeter.totalPrice")}
            </CustomText>

            <input
              type="number"
              className="input w-4/5 bg-color global-box-shadow meter-input"
              style={{ height: 40 }}
              placeholder={t("topUpMeter.unit")}
            />

            <CustomText
              textClassName="font-bold flex items-center"
              style={{ height: 40 }}
            >
              RM 0.00
            </CustomText>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-7 ">
          <CustomButton
            buttonText={t("topUpMeter.cancel")}
            buttonClassName="default-btn-outline"
          />
          <CustomButton
            buttonText={t("topUpMeter.payNow")}
            buttonClassName="primary-btn"
          />
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(TopUpMeter);
