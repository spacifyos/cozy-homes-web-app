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

const TopUpMeter = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const [topUpUnitChange, setTopUpUnit] = useState("");
    const onClickGoBack = () => {
        router.push("/my-stay");
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
            <div className="body-container pb-9">

                <div className="radial-container pb-7">
                    <MeterRadialProgressComponent t={t}/>
                </div>

                <MeterDetail t={t}/>

                <BalanceUnit t={t}/>

                <CustomText textClassName="section-title">{t("topUpMeter.topUpUnit")}</CustomText>
                <div className="global-box-shadow global-border-radius primaryWhite-bg-color p-5">
                    <div className="grid grid-cols-3 gap-2 justify-center items-center pb-8">
                        <CustomButton
                            buttonClassName={`btn-md ${_.isEqual(topUpUnitChange, "25") ? "primary-btn" : "pending-btn"}`}
                            buttonText="25"
                            onClick={() => onClickTopUp("25")}
                        />
                        <CustomButton
                            buttonClassName={`btn-md ${_.isEqual(topUpUnitChange, "30") ? "primary-btn" : "pending-btn"}`}
                            buttonText="30"
                            onClick={() => onClickTopUp("30")}
                        />
                        <CustomButton
                            buttonClassName={`btn-md ${_.isEqual(topUpUnitChange, "35") ? "primary-btn" : "pending-btn"}`}
                            buttonText="35"
                            onClick={() => onClickTopUp("35")}
                        />
                        <CustomButton
                            buttonClassName={`btn-md ${_.isEqual(topUpUnitChange, "45") ? "primary-btn" : "pending-btn"}`}
                            buttonText="45"
                            onClick={() => onClickTopUp("45")}
                        />
                        <CustomButton
                            buttonClassName={`btn-md ${_.isEqual(topUpUnitChange, "50") ? "primary-btn" : "pending-btn"}`}
                            buttonText="50"
                            onClick={() => onClickTopUp("50")}
                        />
                        <CustomButton
                            buttonClassName={`btn-md ${_.isEqual(topUpUnitChange, "100") ? "primary-btn" : "pending-btn"}`}
                            buttonText="100"
                            onClick={() => onClickTopUp("100")}
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex-col">
                            <CustomText textClassName="disable-text font-size-normal">
                                {t("topUpMeter.otherUnit")}
                            </CustomText>
                            <CustomText
                                textClassName="bg-color global-box-shadow global-border-radius disable-text p-2 pr-9">
                                0.00{t("topUpMeter.unit")}
                            </CustomText>
                        </div>
                        <div className="flex-col pr-16">
                            <CustomText textClassName="primary-text font-bold font-size-large">
                                {t("topUpMeter.totalPrice")}
                            </CustomText>
                            <CustomText textClassName="font-bold font-size-xlarge pt-1">
                                RM 0.00
                            </CustomText>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-5 ">
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
