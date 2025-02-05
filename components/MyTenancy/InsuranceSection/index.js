import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const InsuranceSection = ({ t }) => {
  return (
    <div className="global-box-shadow global-border-radius bg-white p-4">
      <CustomText textClassName="text-disable text-sm">
        {t("myTenancy.insurance")}
      </CustomText>
      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>
      <div className="flex flex-col justify-center items-center py-2">
        <CustomImage className="m-2" src={Images.noDataIcon} width={40} />
        <CustomText textClassName="text-disable text-sm">
          {t("myTenancy.noInsuranceAvailable")}
        </CustomText>
      </div>
    </div>
  );
};

export default InsuranceSection;
