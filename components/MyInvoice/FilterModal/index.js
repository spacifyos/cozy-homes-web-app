import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const FilterModal = ({
  t,
  dateFromValue,
  onChangeDateFrom,
  dateToValue,
  onChangeDateTo,
}) => {
  return (
    <CustomModal id="invoice_filter_modal">
      <CustomText textClassName="font-bold font-size-large pb-4">
        Search Filter
      </CustomText>

      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 pb-2">
          <CustomText textClassName="font-size-small pb-1">
            Invoice Number
          </CustomText>

          <input
            className="primaryWhite-bg-color booking-input"
            placeholder="XXXX-InvXXXXXXXX"
            name="name"
          />
        </div>

        <div className="col-span-2 pb-2">
          <CustomText textClassName="font-size-small pb-1">
            Date From
          </CustomText>

          <div className="primaryWhite-bg-color flex items-center booking-input relative">
            <input
              className="primaryWhite-bg-color flex-1 w-full resize-input-icon"
              type="date"
              value={dateFromValue}
              onChange={onChangeDateFrom}
            />

            <CustomImage
              src={Images.calendarIcon}
              imageStyle={{ width: 20, height: 20, marginRight: 4 }}
            />
          </div>
        </div>

        <div className="col-span-2 pb-6">
          <CustomText textClassName="font-size-small pb-1">Date To</CustomText>

          <div className="primaryWhite-bg-color flex items-center booking-input relative">
            <input
              className="primaryWhite-bg-color flex-1 w-full resize-input-icon"
              type="date"
              value={dateToValue}
              onChange={onChangeDateTo}
            />

            <CustomImage
              src={Images.calendarIcon}
              imageStyle={{ width: 20, height: 20, marginRight: 4 }}
            />
          </div>
        </div>

        <CustomButton buttonText="No" buttonClassName="default-btn-outline" />

        <CustomButton buttonText="Yes" buttonClassName="primary-btn" />
      </div>
    </CustomModal>
  );
};

export default FilterModal;
