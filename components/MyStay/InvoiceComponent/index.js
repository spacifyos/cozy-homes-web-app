import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import StatusLabel from "@/components/StatusLabel";
import _ from "lodash";

const InvoiceComponent = ({ t, item, onClick }) => {
  const status = _.get(item, ["status"], "");

  return (
    <div className="invoice-container">
      <div className="flex items-center">
        <div className="invoice-icon-container cursor-pointer" onClick={onClick}>
          <CustomImage
            src={Images.invoiceIcon}
            imageStyle={{ width: 35, height: 35 }}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center pb-1">
            <CustomText textClassName="black-text font-size-small font-bold line-clamp-1 pr-2">
              {t("myStay.invoice")} #: SP-210000222
            </CustomText>
            <StatusLabel status={status} />
          </div>

          <div className="flex items-start">
            <div className="pr-12">
              <CustomLabelValue
                className="pb-1"
                label={t("myStay.rentalFee")}
                value="RM 750"
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
                  {t("myStay.unpaid")}
                </CustomText>
              </div>
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
