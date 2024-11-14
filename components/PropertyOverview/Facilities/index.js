import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import { isEmpty, map } from "lodash";
import FacilitiesComponent from "@/components/PropertyOverview/FacilitiesComponent";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const Facilities = ({ t, facilitiesList }) => {
  return (
    <div className="content-container">
      <CustomText textClassName="section-title">
        {t("propertyDetail.facilities")}
      </CustomText>

      <div className="flex flex-row justify-between items-center flex-wrap pr-15">
        {isEmpty(facilitiesList) ? (
          <div className="flex justify-center flex-1 py-10">
            <CustomEmptyBox
              emptyTitle="No facilities found"
              emptyDesc="Facilities is not available for now."
            />
          </div>
        ) : (
          map(facilitiesList, (item, index) => {
            return <FacilitiesComponent item={item} key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default Facilities;
