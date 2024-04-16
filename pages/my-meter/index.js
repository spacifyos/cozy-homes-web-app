import CustomHeader from "@/components/CustomHeader";
import {useTranslation, withTranslation} from "next-i18next";
import {getServerSideProps} from "@/src/utils/getStatic";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import MeterRadialProgressComponent from "@/components/MyMeter/MeterRadialProgressComponent";
import MeterDetail from "@/components/MyMeter/MeterDetail";
import BalanceUnit from "@/components/MyMeter/BalanceUnit";
import MeterFeature from "@/components/MyMeter/MeterFeature";
import MeterUsageSection from "@/components/MyMeter/MeterUsageSection";
import {useRouter} from "next/router";
import {useState} from "react";

export {getServerSideProps};

const MyMeter = () => {
    const router = useRouter();
    const {t} = useTranslation("common");
    const onClickGoBack = () => {
        router.push("/my-stay");
    };
    const [selectChange, setSelectChange] = useState("Daily");
    const onClickChange = (selected) => {
        setSelectChange(selected)
    };
    return (
        <CustomHeader
            pageTitle={t("pageTitle.myMeter")}
            hideBgImage
            onClickGoBack={onClickGoBack}
        >
            <div className="pb-5 global-horizontal-padding">
                <div className="flex flex-row justify-between">
                    <CustomText textClassName="section-title">
                        {t("myMeter.todayUsage")}
                    </CustomText>
                    <CustomImage
                        className="mr-4"
                        src={Images.refreshIcon}
                        height={30}
                        width={30}
                    />
                </div>

                <div className="radial-container pb-7">
                    <MeterRadialProgressComponent t={t}/>
                </div>

                <MeterDetail t={t}/>

                <BalanceUnit t={t}/>

                <MeterFeature t={t}/>

                <MeterUsageSection
                    t={t}
                    onClickChange={onClickChange}
                    selectChange={selectChange}
                />

            </div>
        </CustomHeader>
    );
};

export default withTranslation("common")(MyMeter);
