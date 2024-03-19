import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const InvoiceComponent = ({ t }) => {
  return (
    <div className="primaryWhite-bg-color global-box-shadow global-border-radius px-4 pt-3 pb-4 flex flex-col justify-between relative mb-3">
      <div className="flex items-center">
        <div className="flex items-center primary-bg-color p-3 global-border-radius mb-1 mr-2">
          <CustomImage src={Images.invoiceIcon} width={20} height={20} />
        </div>

        <div className="flex flex-col">
          <CustomText textClassName="black-text font-size-small font-bold pb-1.5 line-clamp-1">
            {t("myStay.invoice")} #: SP-210000222
          </CustomText>

          <div className="flex items-center pb-1.5">
            <div className="pr-12">
              <CustomText textClassName="primary-text font-bold leading-4">
                RM 750
              </CustomText>
              <CustomText textClassName="disable-text font-size-xxsmall">
                {t("myStay.rentalFee")}
              </CustomText>
            </div>
            <div>
              <div className="flex items-center">
                <CustomImage
                  src={Images.inactiveCheckIcon}
                  width={13}
                  height={13}
                  className="mr-1"
                />
                <CustomText textClassName="disable-text font-size-xsmall leading-4">
                  Unpaid
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
            width={5}
            height={10}
            className="absolute right-4"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
