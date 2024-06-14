import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import StatusLabel from "@/components/StatusLabel";
import _ from "lodash";
import * as invoiceSelector from "@/src/selectors/invoice";

const InvoiceComponent = ({ t, data, onClickToOverView }) => {
  return (
    <div className="flex flex-col gap-3 pb-4">
      {_.map(data, (item, index) => {
        const id = invoiceSelector.getId(item);
        const code = invoiceSelector.getInvoiceNumber(item);
        const paymentStatus = invoiceSelector.getPaymentStatus(item);
        const status = invoiceSelector.getStatus(item);
        const dueDate = invoiceSelector.getDueDate(item);
        const totalAmount = invoiceSelector.getTotalAmount(item);

        return (
          <div className="invoice-container" key={index}>
            <div className="flex items-center">
              <div
                className="invoice-icon-container cursor-pointer"
                onClick={() => onClickToOverView(id)}
              >
                <CustomImage
                  src={Images.invoiceIcon}
                  imageStyle={{ width: 35, height: 35 }}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center pb-1">
                  <CustomText textClassName="black-text font-size-small font-bold line-clamp-1 pr-2">
                    {t("myStay.invoice")} #: {_.isEmpty(code) ? "-" : code}
                  </CustomText>
                  <StatusLabel status={paymentStatus} />
                </div>

                <div className="flex items-start">
                  <div className="pr-12">
                    <CustomLabelValue
                      className="pb-1"
                      label={t("myStay.rentalFee")}
                      value={`RM${_.isEmpty(totalAmount) ? "0" : totalAmount}`}
                    />
                  </div>
                  <div>
                    <CustomText textClassName="font-size-xxsmall disable-text">
                      {t("myStay.status")}
                    </CustomText>

                    <div className="flex items-center">
                      <CustomImage
                        src={Images.paidIcon}
                        width={15}
                        height={15}
                        className="mr-1"
                      />
                      <CustomText textClassName="disable-text font-size-xsmall leading-4">
                        {_.isEmpty(status) ? "-" : status}
                      </CustomText>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <CustomText textClassName="pr-3 font-size-xxsmall disable-text italic">
                    {t("myStay.dueDate")} {_.isEmpty(dueDate) ? "-" : dueDate}
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
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceComponent;
