import CustomButton from "@/components/CustomButton";
import { take, isEqual, size } from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Icons from "@/components/Icons";
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
      <div className="pb-4 flex justify-between items-end">
        <div className="flex">
          <CustomButton
            buttonText="Rental Income"
            buttonClassName={`btn-sm ${isEqual(selectedCategory, "Rental") ? "btn-primary" : "btn-white"} mr-2`}
            textClassName="text-xs"
            onClick={() => onClickSelectCategory("Rental")}
          />
          <CustomButton
            buttonText="Statement"
            buttonClassName={`btn-sm ${isEqual(selectedCategory, "Statement") ? "btn-primary" : "btn-white"} mr-2`}
            textClassName="text-xs"
            onClick={() => onClickSelectCategory("Statement")}
          />
        </div>

        {isEqual(selectedCategory, "Rental") &&
        size(transactionListing) > 4 ? (
          <a href={`/user/owner/rental-income`} className="flex">
            <CustomText textClassName="cursor-pointer pr-1.5 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs">
              View All
            </CustomText>

            <CustomImage src={Icons.rightIconBlack} className="w-1.5" />
          </a>
        ) : (
          false
        )}
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
