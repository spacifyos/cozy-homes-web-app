import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";
import _ from "lodash";

const DetailComponent = ({t, onClickSelectDetail, selectDetail}) => {
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
                    Residensi M Vertica, 555, Jln Cheras, Taman Pertama, 56000 Kuala
                    Lumpur, Federal Territory of Kuala Lumpur.
                </CustomText>
            </div>

            <div className="grid grid-cols-6 gap-6 items-center pt-4">
                <CustomButton
                    icon={_.isEqual(selectDetail, "Tenancy") ? Images.tenancyIconActive : Images.tenancyIcon}
                    buttonClassName={`col-span-3 ${_.isEqual(selectDetail, "Tenancy") ? "primary-btn" : "default-btn"} flex-row-reverse`}
                    textClassName="font-size-normal"
                    buttonText={t("propertyDetail.tenancy")}
                    imageStyle={{width: "20px", height: "20px"}}
                    onClick={() => onClickSelectDetail("Tenancy")}
                />
                <CustomButton
                    icon={_.isEqual(selectDetail, "Tenancy") ? Images.policyIcon : Images.policyIconActive}
                    imageStyle={{width: "20px", height: "20px"}}
                    buttonClassName={`col-span-3 ${_.isEqual(selectDetail, "Policy") ? "primary-btn" : "default-btn"} flex-row-reverse`}
                    textClassName="font-size-normal disable-text"
                    buttonText={t("propertyDetail.policy")}
                    onClick={() => onClickSelectDetail("Policy")}
                />
            </div>
        </div>
    );
};

export default DetailComponent;
