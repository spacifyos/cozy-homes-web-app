import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";

const DetailComponent = ({ t }) => {
    return (
        <div className=" pb-7 pt-7">
            <div className=" flex flex-col items-start">

                <CustomText textClassName="font-size-large font-bold pb-1">
                    M Vertica, Kuala Lumpur
                </CustomText>

                <CustomText textClassName="font-size-normal font-bold primary-text pb-1">
                    A-01-01, Room 2
                </CustomText>
                <CustomText textClassName="disable-text font-size-small pb-1">
                    Residensi M Vertica, 555, Jln Cheras, Taman Pertama, 56000 Kuala Lumpur, Federal Territory of Kuala
                    Lumpur.
                </CustomText>
            </div>

            <div className="grid grid-cols-6 gap-6 items-center pt-4">
                <CustomButton
                    icon={Images.overviewIcon}
                    buttonClassName="col-span-3 primary-btn flex-row-reverse"
                    textClassName="font-size-normal"
                    buttonText={t("property-detail.overView")}
                    imageStyle={{ width: "20px", height: "20px" }}
                />
                <CustomButton
                    icon={Images.policyIcon}
                    imageStyle={{ width: "20px", height: "20px" }}
                    buttonClassName="col-span-3 primaryWhite-bg-color flex-row-reverse default-btn"
                    textClassName="font-size-normal disable-text"
                    buttonText={t("property-detail.policy")}

                />
            </div>
        </div>
    );
};

export default DetailComponent;
