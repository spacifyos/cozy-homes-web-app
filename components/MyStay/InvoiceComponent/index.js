import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import StatusLabel from "@/components/StatusLabel";
import { map, isEmpty } from "lodash";
import * as invoiceSelector from "@/src/selectors/invoice";

const InvoiceComponent = ({ t, data, type }) => {
  return (
    <div className="flex flex-col gap-3">
      {map(data, (item, index) => {
        const code = invoiceSelector.getInvoiceNumber(item);
        const paymentStatus = invoiceSelector.getPaymentStatus(item);
        const status = invoiceSelector.getStatus(item);
        const dueDate = invoiceSelector.getDueDate(item);
        const totalAmount = invoiceSelector.getTotalAmount(item);

        return (
          <a
            href={`${isEmpty(type) ? "" : "/owner"}/my-invoice/${code}`}
            className="invoice-container cursor-pointer"
            key={index}
          >
            <div className="flex items-center">
              <div className="invoice-icon-container">
                <CustomImage
                  src={Images.invoiceIcon}
                  imageStyle={{ width: 35, height: 35 }}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-end pb-0.5">
                  <CustomText textClassName="black-text font-size-small font-bold line-clamp-1 pr-2">
                    {t("myStay.invoice")} #: {isEmpty(code) ? "-" : code}
                  </CustomText>
                </div>

                <div className="flex items-center pb-0.5">
                  <div className="pr-6">
                    <CustomText
                      textClassName={`disable-text font-size-xxsmall font-normal`}
                    >
                      Amount
                    </CustomText>
                    <CustomText
                      textClassName={`font-size-small black-text font-bold`}
                    >
                      {`RM${isEmpty(totalAmount) ? "0" : totalAmount}`}
                    </CustomText>
                  </div>
                  <div className="pr-3">
                    <CustomText textClassName="font-size-xxsmall disable-text">
                      {t("myStay.status")}
                    </CustomText>

                    <div className="flex items-center">
                      <CustomImage
                        src={Images.paidIcon}
                        imageStyle={{ width: 15 }}
                        className="mr-1"
                      />
                      <CustomText textClassName="disable-text font-size-xsmall leading-4">
                        {isEmpty(status) ? "-" : status}
                      </CustomText>
                    </div>
                  </div>
                  <StatusLabel status={paymentStatus} />
                </div>

                <div className="flex items-center">
                  <CustomText textClassName="pr-3 font-size-xxsmall disable-text italic">
                    {t("myStay.dueDate")} {isEmpty(dueDate) ? "-" : dueDate}
                  </CustomText>
                </div>
              </div>

              {/*<div className="flex items-center">*/}
              {/*  <CustomImage*/}
              {/*    src={Images.moreIcon}*/}
              {/*    width={25}*/}
              {/*    height={25}*/}
              {/*    className="absolute right-4"*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default InvoiceComponent;
