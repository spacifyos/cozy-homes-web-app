import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import {useEffect, useRef, useState} from "react";
import CustomLabelValue from "@/components/CustomLabelValue";
import RadialProgressComponent from "@/components/MyStay/RadialProgressComponent";
import Images from "@/src/utils/Image";

const TenancyLabel = () => {
    return (<div className={"pl-2"}>
        <CustomText textClassName="font-bold font-size-small primary-text">
            M Vertica
        </CustomText>
        <CustomText textClassName="font-size-xsmall">A-01-01, Room 1</CustomText>
    </div>);
};
const AutoPayButton = ({isChecked = false, onClickChangeAutoPay}) => {
    return (<div className="tenancy-auto-pay-button">
        <CustomText
            textClassName={`${isChecked ? "primary-text" : "disable-text"} font-bold font-size-xsmall pr-3`}
        >
            AutoPay
        </CustomText>
        <input
            type="checkbox"
            className={`toggle default-toggle ${isChecked ? "toggle-primary-color" : "toggle-disable-color"} [--tglbg:#E8E8E8]`}
            checked={isChecked}
            onClick={onClickChangeAutoPay}
        />
    </div>);
};
const TenancyDetail = ({t}) => {
    const [isChecked, setIsChecked] = useState(true);
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState(0);
    const onClickChangeAutoPay = () => {
        setIsChecked(!isChecked);
    };
    useEffect(() => {
        if (targetRef.current) {
            setDimensions(targetRef.current.offsetWidth);
        }
    }, [targetRef]);


    return (
        <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4">
            <div className="flex justify-between items-center">
                <CustomLabelValue
                    label={t("myStay.tenancyCode")}
                    value={"Roomz-T123456789"}
                />
                <AutoPayButton
                    onClickChangeAutoPay={onClickChangeAutoPay}
                    isChecked={isChecked}
                />
            </div>
            <div
                className="flex mx-16 justify-center items-center py-4"
                ref={targetRef}
            >
                <RadialProgressComponent t={t} dimensions={dimensions}/>
            </div>
            <div className="flex flex-col items-start">
                <div className="flex items-center py-3">
                    <div className="primary-bg-color p-2 global-border-radius mb-1">
                        <CustomImage src={Images.buildingIcon} width={30} height={30}
                        />
                    </div>
                    <TenancyLabel/>

                </div>
                <CustomLabelValue
                    label={t("myStay.rentalFee")}
                    value={"RM750 / monthly"}
                />
                <CustomLabelValue
                    label={t("myStay.tenancyPeriod")}
                    value={"30 Nov 2023 - 31 Dec 2024"}
                />
                <CustomLabelValue
                    label={t("myTenancy.address")}
                    value={"Residensi M Vertica, 555, Jln Cheras, Taman Pertama, 56000 Kuala Lumpur, Federal Territory of Kuala Lumpur."}
                />
                <CustomLabelValue
                    label={t("myTenancy.createdAt")}
                    value={"28 Nov 2023, 15:56:43"}
                />
            </div>
        </div>
    );
};

export default TenancyDetail;
