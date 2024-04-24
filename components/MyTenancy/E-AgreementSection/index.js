import CustomText from "@/components/CustomText";
import _ from "lodash";
import EAgreementCard from "@/components/EAgreement/EAgreementCard";

const EAgreement = ({ t, onClickToAgreementOverview }) => {
  return (
    <div className="global-box-shadow global-border-radius primaryWhite-bg-color mb-7 pt-4 pb-1 px-4">
      <CustomText textClassName="disable-text font-size-small">
        {t("myTenancy.eAgreement")}
      </CustomText>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      {_.map(Array(2), (item) => (
        <EAgreementCard t={t} onClickToDetail={onClickToAgreementOverview} />
      ))}
    </div>
  );
};

export default EAgreement;
