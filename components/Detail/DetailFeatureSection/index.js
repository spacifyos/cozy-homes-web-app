import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";


const DetailFeatureSection = ({ t }) => {

    return (
        <div className="grid grid-cols-4 gap-2 flex justify-center items-center pt-5">
            <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-3 h-full flex-col flex justify-center">

                    <CustomImage
                        src={Images.bathAmenitiesIcon}
                        width={20}
                    />
                    <CustomText textClassName="disable-text font-size-xxsmall h-8">Bathroom</CustomText>
                <CustomText textClassName="primary-text font-size-small font-bold">Shared</CustomText>

            </div>
            <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-3 h-full flex-col flex justify-center items-start">

                    <CustomImage
                        src={Images.bedInactiveIcon}
                        width={20}
                    />
                    <CustomText textClassName="disable-text font-size-xxsmall h-8">Bed</CustomText>
                <CustomText textClassName="primary-text font-size-small font-bold">Queen</CustomText>

            </div>
            <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-3 h-full flex-col flex justify-center items-start">

                    <CustomImage
                        src={Images.squareIcon}
                        width={20}
                    />
                    <CustomText textClassName="disable-text font-size-xxsmall h-8">Square ft.</CustomText>
                <CustomText textClassName="primary-text font-size-small font-bold">150</CustomText>

            </div>
            <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-3 h-full flex-col flex justify-center items-start">

                    <CustomImage
                        src={Images.rentalFeeIcon}
                        width={20}
                    />
                    <CustomText textClassName="disable-text font-size-xxsmall h-8">Rental Fee (per month)</CustomText>
                <CustomText textClassName="primary-text font-size-small font-bold">RM750</CustomText>

            </div>
        </div>
    );
};

export default DetailFeatureSection;

