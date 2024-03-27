import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";

const DetailComponent = ({ t }) => {
    return (
        <div className=" pb-5">
            <div className="flex flex-col items-start">

                <CustomText textClassName="font-size-large font-bold">
                    M Vertica, Kuala Lumpur
                </CustomText>

                <CustomText textClassName="font-size-normal font-bold primary-text">
                    A-01-01, Room 2
                </CustomText>
                <CustomText textClassName="disable-text font-size-small">
                    Residensi M Vertica, 555, Jln Cheras, Taman Pertama, 56000 Kuala Lumpur, Federal Territory of Kuala
                    Lumpur.
                </CustomText>
            </div>

            <div className="grid grid-cols-6 gap-4 items-center pt-5">
                <CustomButton
                    icon={Images.overviewIcon}
                    buttonClassName="col-span-3 primary-btn flex-row-reverse h-14"
                    textClassName="font-size-xlarge"
                    buttonText={t("detail.overView")}
                />
                <CustomButton
                    icon={Images.policyIcon}
                    buttonClassName="col-span-3 primaryWhite-bg-color h-14 flex-row-reverse default-btn"
                    textClassName="font-size-xlarge disable-text global-box-shadow"
                    buttonText={t("detail.policy")}
                />
            </div>
        </div>
    );
};

export default DetailComponent;
