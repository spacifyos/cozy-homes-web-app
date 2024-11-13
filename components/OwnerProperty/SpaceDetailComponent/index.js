import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import SpaceDetailCard from "@/components/OwnerProperty/SpaceDetailCard";

const SpaceDetailComponent = ({ data }) => {
  return (
    <div className="flex flex-col gap-3 pb-4">
      {isEmpty(data) ? (
        <div style={{ height: 351 }} className="flex justify-center">
          <CustomEmptyBox />
        </div>
      ) : (
        map(data, (item, index) => {
          return <SpaceDetailCard key={index} item={item} />;
        })
      )}
    </div>
  );
};

export default SpaceDetailComponent;
