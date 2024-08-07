import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Helper from "@/src/utils/Helper";
import _, { isEmpty, isEqual } from "lodash";
import * as listingSelector from "@/src/selectors/listing";

const RentChargesComponent = ({
  openCharges,
  onClickOpenCharges,
  rentChargesAmount,
  rentChargesLists,
  title,
}) => {
  return (
    <div
      className={`collapse ${openCharges ? "collapse-open" : ""} pb-1`}
      style={{ borderRadius: 0 }}
    >
      <div
        className="collapse-title flex justify-between items-center cursor-pointer pb-1"
        style={{ padding: 0, minHeight: 20 }}
      >
        <div
          className="flex items-center"
          onClick={isEmpty(rentChargesLists) ? () => {} : onClickOpenCharges}
        >
          <CustomText textClassName="font-bold pr-2">{title}</CustomText>
          {isEmpty(rentChargesLists) ? (
            false
          ) : (
            <CustomImage
              src={!openCharges ? Images.upIcon : Images.downIcon}
              imageStyle={{ width: 13 }}
            />
          )}
        </div>

        <CustomText>RM{rentChargesAmount}</CustomText>
      </div>

      <div className="collapse-content p-0">
        <div className="flex items-center pt-1">
          <CustomImage
            src={Images.infoIcon}
            imageStyle={{ width: 20 }}
            className="cursor-pointer"
            onClick={() =>
              Helper.documentGetElementById("rent_charges_details").showModal()
            }
          />
          <CustomText
            styles={{ color: "#1E1E1E" }}
            textClassName="pl-2 font-light font-size-small"
          >
            Inclusion of:
          </CustomText>
        </div>

        {_.map(rentChargesLists, (rentChargesList, index) => {
          const label = listingSelector.getLabel(rentChargesList);
          const value = listingSelector.getFeeAmount(rentChargesList);

          return (
            <ul className="pl-7" key={index}>
              <li className="flex justify-between">
                <CustomText
                  styles={{ color: "#1E1E1E" }}
                  textClassName="font-light font-size-small"
                >
                  - {label}
                </CustomText>
                {isEqual(process.env.PRODUCTION, "DEVELOPMENT") ? (
                  <CustomText
                    styles={{ color: "#1E1E1E" }}
                    textClassName="font-light font-size-small"
                  >
                    {`RM${value}`}
                  </CustomText>
                ) : (
                  false
                )}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default RentChargesComponent;
