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
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center text-base font-bold">
            Search Filter
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
              <CustomImage
                className="xl:w-4 lg:w-4 md:w-4 sm:w-3 w-3"
                src={Images.cancelIcon}
              />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 pb-2">
            <CustomText textClassName="text-sm pb-1">Invoice Number</CustomText>

            <input
              className="bg-white booking-input"
              placeholder="XXXX-InvXXXXXXXX"
              name="name"
              value={invoiceNumberValue}
              onChange={onChangeInvoiceNumber}
            />
          </div>

          <div className="col-span-2 pb-2">
            <CustomText textClassName="text-sm pb-1">Date From</CustomText>

            <div className="bg-white flex items-center booking-input relative">
              <input
                className="flex-1 w-full resize-input-icon bg-primary-background"
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
            <CustomText textClassName="text-sm pb-1">Date To</CustomText>

            <div className="bg-white flex items-center booking-input relative">
              <input
                className="bg-primary-background flex-1 w-full resize-input-icon"
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
            buttonClassName="btn-primary-outline"
            onClick={onClickReset}
          />

          <CustomButton
            buttonText="Submit"
            buttonClassName="btn-primary"
            onClick={onClickSubmit}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopFilterModal;
