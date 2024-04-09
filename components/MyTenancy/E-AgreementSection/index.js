import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const Eagreement = ({t}) => {

    return (
        <div className="global-box-shadow global-border-radius primaryWhite-bg-color mb-5 p-4">
            <CustomText textClassName="disable-text font-size-small">{t("myTenancy.eAgreement")}</CustomText>
            <div className="divider divider-step-section" style={{margin: 0}}></div>
            <div className="flex flex-col justify-center items-center">
                <CustomImage
                    className="m-2"
                    src={Images.noDataIcon}
                    width={40}
                />
                <CustomText textClassName="not-available-text font-size-xxsmall">{t("myTenancy.noEagreementAvailable")}</CustomText>
            </div>
        </div>

    );
};

export default Eagreement;