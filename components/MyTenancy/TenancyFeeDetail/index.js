import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import {useEffect, useRef, useState} from "react";
import CustomLabelValue from "@/components/CustomLabelValue";
import RadialProgressComponent from "@/components/MyStay/RadialProgressComponent";
import Images from "@/src/utils/Image";
import FacilitiesComponent from "@/components/Detail/FacilitiesComponent";
import TenancyFeeComponent from "@/components/MyTenancy/TenancyFeeComponent";



const TenancyFeeDetail = ({t}) => {
    const FeeLists = [
        { name: t("myTenancy.electricityPricePerUnit"), num: 0 },
        { name: t("myTenancy.rentalDeposit"), num: 0 },
        { name: t("myTenancy.utilityDeposit"), num: 0 },
        { name: t("myTenancy.keyDeposit"), num: 0 },
        { name: t("myTenancy.fitUpDeposit"), num: 0 },
        { name: t("myTenancy.restorationDeposit"), num: 0 },
        { name: t("myTenancy.otherDeposit"), num: 0}
    ];

    return (
        <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-5">
            <CustomText textClassName="disable-text font-size-xxsmall">{t("myTenancy.otherInformation")}</CustomText>

            <div className="divider divider-step-section" style={{margin: 0}}></div>

            <div className="flex flex-row justify-between items-center flex-wrap pr-15">
                {_.map(FeeLists, (item) => {
                    return <TenancyFeeComponent item={item}/>;
                })}
            </div>
        </div>
    );
};

export default TenancyFeeDetail;
