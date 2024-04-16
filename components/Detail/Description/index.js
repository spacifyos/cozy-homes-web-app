import CustomText from "@/components/CustomText";

const Description = ({t}) => {

    return (
        <div className="pb-7">
            <CustomText textClassName="section-title">
                {t("propertyDetail.description")}
            </CustomText>
            <div className="pb-5">
                <CustomText textClassName="py-2 font-size-xsmall">
                    Fully Furnished Home Unit Available For RENT!
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    UNIT DETAILS:Built-Up Size: 915 Sq.Ft.
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    Room:3 Bedroom & 2 Bathrooms
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                   Furnishing:Fully Furnished
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                   Parking:2 Car Park Provided
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    Rent Price:RM 2,099.00(Negotiable)
                </CustomText>
            </div>
            <div className="pb-5">
                <CustomText textClassName="font-size-xsmall">
                    Amenities:
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    -Near To AEON Mall
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    -Tesco Hypermarket
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    -Empire Shopping Gallery
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    -KPJ Selangor Hospital
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    -MSU University
                </CustomText>
            </div>
            <div className="">
                <CustomText textClassName="font-size-xsmall">
                    Accessibility:
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    -Elite Highway
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    -NPE Highway
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    -KESAS Highway
                </CustomText>
                <CustomText textClassName="font-size-xsmall">
                    -Federal Highway
                </CustomText>
            </div>
        </div>
    );
};

export default Description;