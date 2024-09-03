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
    <div className="pt-6">
      <div className="pb-4">
        <CustomButton
          buttonText="Rental Income"
          buttonClassName={`btn-sm ${isEqual(selectedCategory, "Rental") ? "primary-btn" : "default-btn"} mr-2`}
          textClassName="font-size-xsmall"
          onClick={() => onClickSelectCategory("Rental")}
        />
        <CustomButton
          buttonText="Invoice"
          buttonClassName={`btn-sm ${isEqual(selectedCategory, "Invoice") ? "primary-btn" : "default-btn"} mr-2`}
          textClassName="font-size-xsmall"
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
