import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const InvoiceComponent = ({ t }) => {
  return (
    <div className="invoice-container">
      <div className="flex items-center">
        <div className="invoice-icon-container">
          <CustomImage
            src={Images.invoiceIcon}
            imageStyle={{ width: 30, height: 30 }}
          />
        </div>

        <div className="flex flex-col">
          <CustomText textClassName="black-text font-size-small font-bold pb-1.5 line-clamp-1">
            {t("myStay.invoice")} #: SP-210000222
          </CustomText>

          <div className="flex items-center pb-1.5">
            <div className="pr-12">
              <CustomText textClassName="primary-text font-size-xsmall font-bold leading-4">
                RM 750
              </CustomText>
              <CustomText textClassName="disable-text font-size-xxsmall">
                {t("myStay.rentalFee")}
              </CustomText>
            </div>
            <div>
              <div className="flex items-center">
                <CustomImage
                  src={Images.unpaidIcon}
                  width={13}
                  height={13}
                  className="mr-1"
                />
                <CustomText textClassName="disable-text font-size-xsmall leading-4">
                  {t("myStay.unpaid")}
                </CustomText>
              </div>

              <CustomText textClassName="disable-text font-size-xxsmall">
                {t("myStay.status")}
              </CustomText>
            </div>
          </div>

          <div className="flex items-center">
            <CustomText textClassName="pr-3 font-size-xxsmall disable-text italic">
              {t("myStay.dueDate")} 30 Nov 2024
            </CustomText>
          </div>
        </div>

        <div className="flex items-center">
          <CustomImage
            src={Images.moreIcon}
            width={25}
            height={25}
            className="absolute right-4"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
