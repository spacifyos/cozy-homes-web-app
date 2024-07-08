import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Helper from "@/src/utils/Helper";
import { useEffect } from "react";

const FilterModal = ({
  t,
  dateFromValue,
  onChangeDateFrom,
  dateToValue,
  onChangeDateTo,
  invoiceNumberValue,
  onChangeInvoiceNumber,
  onClickCancel,
  onClickSubmit,
  onClickReset,
  isOpenFilterModal,
}) => {
  const content = Helper.documentGetElementById("root-body");

  useEffect(() => {
    if (content) {
      content.style.overflow = isOpenFilterModal ? "hidden" : "auto";
    }
  }, [isOpenFilterModal]);

  return isOpenFilterModal ? (
    <div
      className="fixed inset-0 z-10 h-screen overflow-hidden flex flex-col justify-end items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="bg-color px-6 pb-6 rounded-t-2xl"
        style={{ maxWidth: 500, width: 500 }}
      >
        <div className="divider divider-custom justify-center"></div>
        <div className="flex justify-between items-end pb-4">
          <CustomText textClassName="font-bold font-size-large">
            Search Filter
          </CustomText>

          <CustomText
            textClassName="underline error-text font-size-xsmall cursor-pointer"
            onClick={onClickReset}
          >
            Reset
          </CustomText>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 pb-2">
            <CustomText textClassName="font-size-small pb-1">
              Invoice Number
            </CustomText>

            <input
              className="primaryWhite-bg-color booking-input"
              placeholder="XXXX-InvXXXXXXXX"
              name="name"
              value={invoiceNumberValue}
              onChange={onChangeInvoiceNumber}
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
            <CustomText textClassName="font-size-small pb-1">
              Date To
            </CustomText>

            <div className="primaryWhite-bg-color flex items-center booking-input relative">
              <input
                className="primaryWhite-bg-color flex-1 w-full resize-input-icon"
                type="date"
                value={dateToValue}
                onChange={onChangeDateTo}
                min={dateFromValue}
              />

              <CustomImage
                src={Images.calendarIcon}
                imageStyle={{ width: 20, height: 20, marginRight: 4 }}
              />
            </div>
          </div>

          <CustomButton
            buttonText="Cancel"
            buttonClassName="default-btn-outline"
            onClick={onClickCancel}
          />

          <CustomButton
            buttonText="Submit"
            buttonClassName="primary-btn"
            onClick={onClickSubmit}
          />
        </div>
      </div>
    </div>
  ) : (
    false
  );
};

export default FilterModal;
