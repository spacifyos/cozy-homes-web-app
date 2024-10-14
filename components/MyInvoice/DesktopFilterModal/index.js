import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import DesktopModal from "@/components/DesktopModal";

const DesktopFilterModal = ({
  t,
  dateFromValue,
  onChangeDateFrom,
  dateToValue,
  onChangeDateTo,
  invoiceNumberValue,
  onChangeInvoiceNumber,
  onClickSubmit,
  onClickReset,
}) => {
  return (
    <DesktopModal id="desktop_invoice_filter_modal">
      <div className="p-6">
        <div className="flex justify-between items-center pb-4">
          <CustomText textClassName="font-bold font-size-large">
            Search Filter
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
              <CustomImage
                src={Images.cancelIcon}
                imageStyle={{ width: 18, height: 18 }}
              />
            </button>
          </form>
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
            buttonText="Reset"
            buttonClassName="default-btn-outline"
            onClick={onClickReset}
          />

          <CustomButton
            buttonText="Submit"
            buttonClassName="primary-btn"
            onClick={onClickSubmit}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopFilterModal;
