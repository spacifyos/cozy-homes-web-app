import _ from "lodash";
import CustomText from "@/components/CustomText";
import TenancyFeeComponent from "@/components/MyTenancy/TenancyFeeComponent";
import * as tenancySelector from "@/src/selectors/tenancy";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const TenancyFeeDetail = ({ title, data }) => {
  return (
    <div className="global-border-radius global-box-shadow bg-white p-4 ">
      <CustomText textClassName="text-disable text-sm">
        {title}
      </CustomText>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <TenancyFeeComponent data={data} />
    </div>
  );
};

export default TenancyFeeDetail;
