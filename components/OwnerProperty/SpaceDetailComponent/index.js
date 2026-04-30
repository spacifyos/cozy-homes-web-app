import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import SpaceDetailCard from "@/components/OwnerProperty/SpaceDetailCard";

const SpaceDetailComponent = ({ data, onClickDownloadAgreement }) => {
  return (
    <div className="flex flex-col gap-3 pb-4">
      {isEmpty(data) ? (
        <div style={{ height: 351 }} className="flex justify-center">
          <CustomEmptyBox
          variant="house"
          emptyTitle="No spaces yet"
          emptyDesc="Add rooms and units to your property to start managing them."
        />
        </div>
      ) : (
        map(data, (item, index) => {
          return (
            <SpaceDetailCard
              key={index}
              item={item}
              onClickDownloadAgreement={onClickDownloadAgreement}
            />
          );
        })
      )}
    </div>
  );
};

export default SpaceDetailComponent;
