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
  const startDate = ownerSelector.getStartDate(item);
  const endDate = ownerSelector.getEndDate(item);

  return (
    <div
      className={`global-box-shadow global-border-radius p-2 flex justify-between items-center ${isEqual(status, "Available") ? "bg-available-light" : "bg-error-light"}`}
    >
      <div className="flex flex-1 items-center">
        <CustomImage
          src={isEmpty(roomImage) ? Images.imageNotFound : roomImage}
          className="w-24 mx-2"
        />

        <div className="px-3 flex-1">
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center pb-0.5">
              <div className="flex">
                <CustomText
                  textClassName={`text-xs text-white ${isEqual(status, "Available") ? "bg-aqua" : "bg-error"} px-4 py-0.5 rounded`}
                >
                  {isEmpty(status) ? "-" : status}
                </CustomText>
              </div>

              <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col items-end">
                <CustomText textClassName="font-bold text-base pr-1">
                  {isEmpty(remainingDays) ? "0" : remainingDays}
                </CustomText>
                <CustomText textClassName="text-disable text-xs pb-0.5">
                  remaining days
                </CustomText>
              </div>
            </div>

            <CustomText textClassName="font-bold text-primary pb-0.5">
              {isEmpty(roomName) ? "-" : roomName}
            </CustomText>

            <div className="flex items-end">
              <CustomImage
                src={Images.spaceIconActive}
                imageStyle={{ width: 18 }}
                className="mr-2"
              />
              <CustomText textClassName="text-xs">
                {isEmpty(spaceType) ? "-" : spaceType}
              </CustomText>
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 12, marginBottom: 12 }}
          ></div>

          <div className="grid-cols-2 grid">
            <CustomLabelValue
              label="Tenant Name"
              value={isEmpty(tenantName) ? "-" : tenantName}
            />
            <CustomLabelValue
              label="Monthly Rental"
              value={`RM${isEmpty(rentalFee) ? "0" : rentalFee}`}
            />
          </div>

          <div className="grid-cols-2 grid">
            <CustomLabelValue
              label="Start Date"
              value={isEmpty(startDate) ? "-" : startDate}
            />
            <CustomLabelValue
              label="End Date"
              value={`${isEmpty(endDate) ? "-" : endDate}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailCard;
