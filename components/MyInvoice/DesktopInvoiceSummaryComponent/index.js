import Carousel from "react-multi-carousel";
import CustomText from "@/components/CustomText";
import { map, isEmpty } from "lodash";
import * as invoiceSelector from "@/src/selectors/invoice";
import moment from "moment";

const DesktopInvoiceSummaryComponent = ({ data }) => {
  const textColor = (value) => {
    switch (value) {
      case "Total Paid Invoices":
        return "completed-text";
      case "Total Overdue Invoices":
        return "error-text";
      case "Total Unpaid Invoices":
        return "pending-text";
      case "Total Invoices":
        return "primary-text";
      default:
        return "pending-text";
    }
  };

  return (
    <div className="pb-10 grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
      {map(data, (item, index) => {
        const name = invoiceSelector.getName(item);
        const totalAmountText = invoiceSelector.getTotalAmountText(item);

        return (
          <div className="flex flex-col justify-center items-center global-border-radius global-box-shadow px-5 py-3" key={index} style={{minHeight:120, height:120}}>
            <CustomText textClassName="text-center">{isEmpty(name) ? "-" : name}</CustomText>
            <CustomText
              textClassName={`${textColor(name)} font-bold`}
              styles={{ fontSize: 24 }}
            >
              RM{isEmpty(totalAmountText) ? "0" : totalAmountText}
            </CustomText>
            <CustomText textClassName="disable-text font-size-xxsmall">
              {`Last updated: ${moment().format("DD MMM YYYY")}`}
            </CustomText>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopInvoiceSummaryComponent;
