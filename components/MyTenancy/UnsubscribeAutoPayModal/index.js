import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import {useState} from "react";

const SubscribeAutoPayModal = ({t}) => {

    return (
        <CustomModal id="isUnSubscribe">
            <CustomText textClassName="font-bold font-size-large pb-3">{t("myTenancy.unsubscribeAutoPay")}</CustomText>

            <div className="flex flex-col justify-center items-center p-6">
                <CustomImage
                    src={Images.dangerIcon}
                    width={60}
                />
                <CustomText textClassName="font-bold font-size-normal pt-4">{t("myTenancy.askingUnsubscribe")}</CustomText>
            </div>
            <div className="flex-row grid grid-cols-6 gap-4 items-center pt-4">
                <form method="dialog" className="col-span-3">
                    <CustomButton
                        buttonClassName="w-full  default-btn-outline"
                        buttonText={t("myTenancy.no")}
                    />
                </form>
                <CustomButton
                    buttonClassName="col-span-3 primary-btn"
                    buttonText={t("myTenancy.yes")}
                />
            </div>
        </CustomModal>
    );
};

export default SubscribeAutoPayModal;