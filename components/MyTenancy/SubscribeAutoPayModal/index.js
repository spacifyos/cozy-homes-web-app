import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import Helper from "@/src/utils/Helper";

const SubscribeAutoPayModal = ({ t }) => {
  return (
    <CustomModal id="myTenancy_Subscribe_modal">
      <CustomText textClassName="font-bold font-size-large pb-3">
        {t("myTenancy.subscribeAutoPay")}
      </CustomText>
      <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4">
        <div className="flex items-center pb-2">
          <div className="primary-bg-color p-2 global-border-radius mb-1">
            <CustomImage src={Images.buildingIcon} width={30} height={30} />
          </div>
          <div className="pl-2">
            <CustomText textClassName="font-bold font-size-small primary-text">
              M Vertica
            </CustomText>
            <CustomText textClassName="font-size-xsmall">
              A-01-01, Room 1
            </CustomText>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <CustomLabelValue
              label={t("myTenancy.referenceNumber")}
              value={"BeLive-T123456789"}
            />
            <CustomLabelValue
              label={t("myTenancy.applicationStatus")}
              value={t("myTenancy.notActivated")}
            />
          </div>
          <div className="flex flex-col ">
            <CustomLabelValue
              label={t("myTenancy.tenantName")}
              value={"John Doe"}
            />
            <CustomLabelValue
              label={t("myTenancy.address")}
              value={
                "Residensi M Vertica, 555, Jln Cheras, Taman Pertama, 56000 Kuala Lumpur, Federal Territory of Kuala Lumpur."
              }
            />
            <CustomLabelValue
              label={"ID Number"}
              value={"NRIC 1234567899999"}
            />
            <CustomLabelValue
              label={"Email"}
              value={"john.doe@abccompany.com"}
            />
            <CustomLabelValue
              label={t("myTenancy.rentalFee")}
              value={"RM750"}
            />
            <CustomLabelValue
              label={t("myTenancy.period")}
              value={"30 Nov 2023 - 31 Dec 2024"}
            />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-4  pt-4">
        <CustomButton
          buttonClassName=" default-btn-outline"
          buttonText={t("myTenancy.cancel")}
          onClick={() => {
            Helper.documentGetElementById("myTenancy_Subscribe_modal").close();
          }}
        />
        <CustomButton
          buttonClassName=" primary-btn"
          buttonText={t("myTenancy.submit")}
        />
      </div>
    </CustomModal>
  );
};

export default SubscribeAutoPayModal;
