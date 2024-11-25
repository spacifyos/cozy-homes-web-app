import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import Helper from "@/src/utils/Helper";

const SubscribeAutoPayModal = ({ t }) => {
  return (
    <CustomModal id="myTenancy_Unsubscribe_modal">
      <CustomText textClassName="font-bold font-size-large pb-5">
        {t("myTenancy.unsubscribeAutoPay")}
      </CustomText>

      <div className="flex flex-col justify-center items-center p-6">
        <CustomImage src={Images.dangerIcon} width={60} />
        <CustomText textClassName="font-bold text-base pt-4">
          {t("myTenancy.askingUnsubscribeAutoPay")}
        </CustomText>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <CustomButton
          buttonClassName="default-btn-outline"
          buttonText={t("myTenancy.no")}
          onClick={() => {
            Helper.documentGetElementById("myTenancy_Unsubscribe_modal").close();
          }}
        />
        <CustomButton
          buttonClassName="primary-btn"
          buttonText={t("myTenancy.yes")}
        />
      </div>
    </CustomModal>
  );
};

export default SubscribeAutoPayModal;
