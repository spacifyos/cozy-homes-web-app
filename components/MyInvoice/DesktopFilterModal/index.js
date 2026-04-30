import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import DesktopModal from "@/components/DesktopModal";
import BookingDateInput from "@/components/Booking/BookingDateInput";
import moment from "moment/moment";
import BookingInput from "@/components/Booking/BookingInput";
import Icons from "@/components/Icons";

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
                src={Icons.closeIconBlack}
              />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 pb-2">
            <BookingInput
              required
              title={"Statement Number"}
              placeholder={"Enter Six Digit Number"}
              bgColor="bg-white border"
              inputClassName="border-none"
              value={invoiceNumberValue}
              onChange={onChangeInvoiceNumber}
              type="number"
            />
          </div>

          <div className="col-span-2 pb-2">
            <BookingDateInput
              required
              title="Date From"
              className="bg-white"
              bgColor="bg-white"
              value={dateFromValue}
              onChange={onChangeDateFrom}
            />
          </div>

          <div className="col-span-2 pb-6">
            <BookingDateInput
              required
              title="Date To"
              className="bg-white"
              bgColor="bg-white"
              value={dateToValue}
              onChange={onChangeDateTo}
              min={dateFromValue}
            />
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
