import CustomButton from "@/components/CustomButton";
import { take, isEqual } from "lodash";
import RentalIncomeComponent from "@/components/Owner/RentalIncomeComponent";
import InvoiceSection from "@/components/MyStay/InvoiceSection";

const TransactionComponent = ({
  t,
  onClickSelectCategory,
  selectedCategory,
  transactionListing,
  onClickSelectInvoiceCategory,
  selectedInvoiceCategory,
  onClickToInvoiceList,
  invoiceListingData,
  onClickToOverviewPage,
}) => {
  return (
    <div className="pt-6 min-h-full flex-1 flex flex-col">
      <div className="pb-4 flex">
        <CustomButton
          buttonText="Rental Income"
          buttonClassName={`btn-sm ${isEqual(selectedCategory, "Rental") ? "btn-primary" : "default-btn"} mr-2`}
          textClassName="text-xs"
          onClick={() => onClickSelectCategory("Rental")}
        />
        <CustomButton
          buttonText="Invoice"
          buttonClassName={`btn-sm ${isEqual(selectedCategory, "Invoice") ? "btn-primary" : "default-btn"} mr-2`}
          textClassName="text-xs"
          onClick={() => onClickSelectCategory("Invoice")}
        />
      </div>

      {isEqual(selectedCategory, "Rental") ? (
        <RentalIncomeComponent data={take(transactionListing, 4)} />
      ) : (
        <InvoiceSection
          t={t}
          type={"owner"}
          onClickSelectCategory={onClickSelectInvoiceCategory}
          selectedCategory={selectedInvoiceCategory}
          onClickToInvoiceList={onClickToInvoiceList}
          data={invoiceListingData}
          onClickToOverviewPage={onClickToOverviewPage}
          hideTitle
        />
      )}
    </div>
  );
};

export default TransactionComponent;
