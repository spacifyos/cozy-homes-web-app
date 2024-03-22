import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import _ from "lodash";
import FacilitiesComponent from "@/components/Detail/FacilitiesComponent";


const Facilities = ({ t }) => {
    const facilitiesLists = [
        { name: t("detail.aircond"), icon: Images.aircondIcon },
        { name: t("detail.laundryArea"), icon: Images.vectorIcon },
        { name: t("detail.chairAndDesk"), icon: Images.deskChairIcon},
        { name: t("detail.sharedKitchen"), icon: Images.gasStoveIcon},
        { name: t("detail.closet"), icon: Images.wardrobeIcon},
        { name: t("detail.diningArea"), icon: Images.cutleyIcon},
        { name: t("detail.wifi"), icon: Images.wifiIcon},
        { name: t("detail.mailbox"), icon: Images.mailboxIcon},

    ];

    return (
        <div>
            <CustomText textClassName="font-size-xxlarge font-bold pt-5 pb-4">
                {t("detail.facilities")}
            </CustomText>

            <div className="flex flex-row justify-between items-center flex-wrap pr-20">
                {_.map(facilitiesLists, (item) => {
                    return <FacilitiesComponent item={item} />;
                })}
            </div>
        </div>
    );
};

export default Facilities;