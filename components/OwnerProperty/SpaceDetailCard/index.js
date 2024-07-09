import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";

const SpaceDetailCard = () => {
  return (
    <div className="global-box-shadow global-border-radius p-2 flex justify-between items-center">
      <div className="flex flex-1">
        <CustomImage src={Images.imageNotFound} width={100} height={100} />

        <div className="px-3 flex-1">
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center pb-0.5">
              <div className="flex">
                <CustomText textClassName="font-size-xxsmall white-text available-bg-color px-4 py-0.5 rounded">
                  Available
                </CustomText>
              </div>

              <div className="flex items-end">
                <CustomText textClassName="font-bold font-size-large pr-1">
                  365
                </CustomText>
                <CustomText textClassName="disable-text font-size-xxsmall pb-0.5">
                  remaining days
                </CustomText>
              </div>
            </div>

            <CustomText textClassName="font-bold primary-text pb-0.5">
              Master Room
            </CustomText>

            <div className="flex items-end">
              <CustomImage
                src={Images.spaceIcon}
                width={18}
                height={18}
                className="mr-1"
              />
              <CustomText textClassName="font-size-xxsmall">
                Queen Room
              </CustomText>
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 12, marginBottom: 12 }}
          ></div>

          <div className="flex justify-between">
            <CustomLabelValue label="Tenant Name" value="-" />
            <CustomLabelValue label="Monthly Rental" value="RM1,000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailCard;
