import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";

export { getServerSideProps };

const Withdraw = () => {
  return <div></div>;
};

export default withTranslation("common")(OwnerAuthWrapper(Withdraw));
