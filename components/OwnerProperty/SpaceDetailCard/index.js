import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import * as ownerSelector from "@/src/selectors/owner";
import { isEmpty, isEqual } from "lodash";

const SpaceDetailCard = ({ item }) => {
  const status = ownerSelector.getStatus(item);
  const remainingDays = ownerSelector.getRemainingDays(item);
  const roomName = ownerSelector.getRoomName(item);
  const spaceType = ownerSelector.getSpaceType(item);
  const rentalFee = ownerSelector.getRentalFee(item);
  const tenantName = ownerSelector.getTenantName(item);
  const roomImage = ownerSelector.getRoomImage(item);

  return (
    <div
      className={`global-box-shadow global-border-radius p-2 flex justify-between items-center ${isEqual(status, "Available") ? "primaryWhite-bg-color" : "occupied-bg-color"}`}
    >
      <div className="flex flex-1 items-center">
        <CustomImage
          src={isEmpty(roomImage) ? Images.imageNotFound : roomImage}
          imageStyle={{ height: 100, width: 100 }}
        />

        <div className="px-3 flex-1">
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center pb-0.5">
              <div className="flex">
                <CustomText
                  textClassName={`font-size-xxsmall white-text ${isEqual(status, "Available") ? "available-bg-color" : "error-bg-color"} px-4 py-0.5 rounded`}
                >
                  {isEmpty(status) ? "-" : status}
                </CustomText>
              </div>

              <div className="flex items-end">
                <CustomText textClassName="font-bold font-size-large pr-1">
                  {isEmpty(remainingDays) ? "0" : remainingDays}
                </CustomText>
                <CustomText textClassName="disable-text font-size-xxsmall pb-0.5">
                  remaining days
                </CustomText>
              </div>
            </div>

            <CustomText textClassName="font-bold primary-text pb-0.5">
              {isEmpty(roomName) ? "-" : roomName}
            </CustomText>

            <div className="flex items-end">
              <CustomImage
                src={Images.spaceIcon}
                imageStyle={{ width: 18 }}
                className="mr-1"
              />
              <CustomText textClassName="font-size-xxsmall">
                {isEmpty(spaceType) ? "-" : spaceType}
              </CustomText>
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 12, marginBottom: 12 }}
          ></div>

          <div className="flex justify-between">
            <CustomLabelValue
              label="Tenant Name"
              value={isEmpty(tenantName) ? "-" : tenantName}
            />
            <CustomLabelValue
              label="Monthly Rental"
              value={`RM${isEmpty(rentalFee) ? "0" : rentalFee}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailCard;
