import _ from "lodash";
import CustomText from "@/components/CustomText";
import TenancyFeeComponent from "@/components/MyTenancy/TenancyFeeComponent";
import * as tenancySelector from "@/src/selectors/tenancy";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const TenancyFeeDetail = ({ t, data }) => {
  const fees = tenancySelector.getFee(data);

  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-4 mb-3">
      <CustomText textClassName="disable-text font-size-small">
        {t("myTenancy.otherInformation")}
      </CustomText>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <TenancyFeeComponent data={fees} />
    </div>
  );
};

export default TenancyFeeDetail;
