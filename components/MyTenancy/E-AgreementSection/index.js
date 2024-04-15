import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import StatusLabel from "@/components/StatusLabel";

const Eagreement = ({t}) => {

    return (
        <div className="global-box-shadow global-border-radius primaryWhite-bg-color mb-5 p-4">
            <CustomText textClassName="disable-text font-size-small pb-2">{t("myTenancy.eAgreement")}</CustomText>
            <div className="divider-line" style={{margin: 0}}></div>
            <div className="flex justify-between pt-4">
                <CustomLabelValue value="XXXXXXXXXXX" label="Reference Number"/>
                <div className="pb-2">
                    <CustomText textClassName="font-size-xxsmall disable-text">
                        Status
                    </CustomText>
                    <StatusLabel status="pending"/>
                </div>
            </div>

            <div
                className="divider-line"
                style={{marginTop: 10, marginBottom: 10}}
            ></div>

            <CustomLabelValue value="E-Sign & E-Stamp" label="Service"/>
            <CustomLabelValue
                value="M Vertica, A-01-01, Room 1"
                label="Property"
            />
            <CustomLabelValue value="19 Aug 2023" label="Agreement Date"/>
            <CustomLabelValue value="19 Aug 2023 -18 Aug 2023" label="Tenure"/>



        </div>

    );
};

export default Eagreement;