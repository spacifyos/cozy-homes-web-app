import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import SpaceDetailCard from "@/components/OwnerProperty/SpaceDetailCard";

const SpaceDetailComponent = ({ data = Array(5) }) => {
  return (
    <div className="pt-6">
      <CustomText textClassName="section-title" styles={{ paddingBottom: 0 }}>
        Space Details
      </CustomText>

      <div className="flex flex-col gap-3">
        {isEmpty(data) ? (
          <div style={{ height: 351 }} className="flex justify-center">
            <CustomEmptyBox />
          </div>
        ) : (
          map(data, (item, index) => {
            return <SpaceDetailCard key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default SpaceDetailComponent;
