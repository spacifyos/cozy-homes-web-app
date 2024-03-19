import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import MeterRadialProgressComponent from "@/components/MyMeter/MeterRadialProgressComponent";
import MeterDetail from "@/components/MyMeter/MeterDetail";
import BalanceUnit from "@/components/MyMeter/BalanceUnit";
import MeterFeature from "@/components/MyMeter/MeterFeature";




export { getServerSideProps };
const onClickGoBack = () => {
    router.back();
};
const MyMeter = () => {
    const { t } = useTranslation("common");

    return (

        <CustomHeader pageTitle={t("pageTitle.myMeter")} hideBgImage padding onClickGoBack={onClickGoBack}>

            <div className="meterUsage">
                <CustomText textClassName="containerText">
                    {t("myMeter.todayUsage")}
                </CustomText>
                <CustomImage className="mr-4" src={Images.refreshIcon} height={18} width={28}/>
            </div>

            <div className="RadialContainer pb-5">
                <MeterRadialProgressComponent t={t}/>
            </div>

            <MeterDetail t={t}/>

            <BalanceUnit t={t}/>

            <MeterFeature t={t}/>

        </CustomHeader>
    );
};

export default withTranslation("common")(MyMeter);