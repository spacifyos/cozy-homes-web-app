import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import _ from "lodash";
import FacilitiesComponent from "@/components/PropertyDetail/FacilitiesComponent";

const Facilities = ({ t }) => {
  const facilitiesLists = [
    { name: t("propertyDetail.aircond"), icon: Images.aircondIcon },
    { name: t("propertyDetail.laundryArea"), icon: Images.laundryIconBlack },
    { name: t("propertyDetail.chairAndDesk"), icon: Images.deskChairIcon },
    { name: t("propertyDetail.sharedKitchen"), icon: Images.gasStoveIcon },
    { name: t("propertyDetail.closet"), icon: Images.wardrobeIcon },
    { name: t("propertyDetail.diningArea"), icon: Images.cutleyIcon },
    { name: t("propertyDetail.wifi"), icon: Images.wifiIcon },
    { name: t("propertyDetail.mailbox"), icon: Images.mailboxIcon },
  ];

  return (
    <div className="pb-7">
      <CustomText textClassName="section-title">
        {t("propertyDetail.facilities")}
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
