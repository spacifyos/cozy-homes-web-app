import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import _ from "lodash";
import FacilitiesComponent from "@/components/PropertyOverview/FacilitiesComponent";

const Facilities = ({ t, facilitiesList }) => {
  return (
    <div className="pb-7">
      <CustomText textClassName="section-title">
        {t("propertyDetail.facilities")}
      </CustomText>

      <div className="flex flex-row justify-between items-center flex-wrap pr-15">
        {_.isEmpty(facilitiesList) ? (
          <CustomText>Facilities not available for now. </CustomText>
        ) : (
          _.map(facilitiesList, (item, index) => {
            return <FacilitiesComponent item={item} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default Facilities;
