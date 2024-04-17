import _ from "lodash";
import CustomText from "@/components/CustomText";
import TenancyFeeComponent from "@/components/MyTenancy/TenancyFeeComponent";

const TenancyFeeDetail = ({ t }) => {
  const FeeLists = [
    { name: t("myTenancy.electricityPricePerUnit"), num: 0 },
    { name: t("myTenancy.rentalDeposit"), num: 0 },
    { name: t("myTenancy.utilityDeposit"), num: 0 },
    { name: t("myTenancy.keyDeposit"), num: 0 },
    { name: t("myTenancy.fitUpDeposit"), num: 0 },
    { name: t("myTenancy.restorationDeposit"), num: 0 },
    { name: t("myTenancy.otherDeposit"), num: 0 },
  ];

  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-5">
      <CustomText textClassName="disable-text font-size-small pb-2">
        {t("myTenancy.otherInformation")}
      </CustomText>

      <div className="divider-line" style={{ marginTop:10, marginBottom:10 }}></div>

      <div className="flex flex-col justify-between items-center pt-2">
        {_.map(FeeLists, (item) => {
          return <TenancyFeeComponent item={item} />;
        })}
      </div>
    </div>
  );
};

export default TenancyFeeDetail;
