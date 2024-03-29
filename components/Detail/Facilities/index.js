import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import _ from "lodash";
import FacilitiesComponent from "@/components/Detail/FacilitiesComponent";


const Facilities = ({ t }) => {
    const facilitiesLists = [
        { name: t("property-detail.aircond"), icon: Images.aircondIcon },
        { name: t("property-detail.laundryArea"), icon: Images.vectorIcon },
        { name: t("property-detail.chairAndDesk"), icon: Images.deskChairIcon},
        { name: t("property-detail.sharedKitchen"), icon: Images.gasStoveIcon},
        { name: t("property-detail.closet"), icon: Images.wardrobeIcon},
        { name: t("property-detail.diningArea"), icon: Images.cutleyIcon},
        { name: t("property-detail.wifi"), icon: Images.wifiIcon},
        { name: t("property-detail.mailbox"), icon: Images.mailboxIcon},

    ];

    return (
        <div className="pb-7">
            <CustomText textClassName="section-title">
                {t("property-detail.facilities")}
            </CustomText>

            <div className="flex flex-row justify-between items-center flex-wrap pr-15">
                {_.map(facilitiesLists, (item) => {
                    return <FacilitiesComponent item={item} />;
                })}
            </div>
        </div>
    );
};

export default Facilities;