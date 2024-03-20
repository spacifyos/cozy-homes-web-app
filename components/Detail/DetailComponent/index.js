import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";

const DetailComponent = ({ t }) => {
    return (
        <div>
            <div className="flex flex-col items-start pt-5">

                <CustomText textClassName="font-size-large font-bold">
                    M Vertica, Kuala Lumpur
                </CustomText>

                <CustomText textClassName="font-size-normal font-bold primary-text">
                    A-01-01, Room2
                </CustomText>
                <CustomText textClassName="disable-text font-size-small">
                    Residensi M Vertica, 555, Jln Cheras, Taman Pertama, 56000 Kuala Lumpur, Federal Territory of Kuala
                    Lumpur.
                </CustomText>
            </div>

            <div className="flex flex-row gap-4">
                <CustomButton
                    buttonClassName="col-span-4 primary-btn h-14"
                    textClassName="font-size-xxlarge"
                    buttonText={t("detail.overView")}
                />
                <CustomButton
                    buttonClassName="col-span-4 primary-btn h-14"
                    textClassName="font-size-xxlarge"
                    buttonText={t("detail.policy")}
                />
            </div>
        </div>
    );
};

export default DetailComponent;
