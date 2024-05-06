import CustomHeader from "@/components/CustomHeader";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import { useState } from "react";
import { useRouter } from "next/router";
import EAgreementCard from "@/components/EAgreement/EAgreementCard";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };

const statusList = ["pending", "completed", "pending", "pending", "completed"];
const btnList = [{ btn: "All" }, { btn: "Completed" }, { btn: "Pending" }];
const EAgreement = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickToDetail = (id) => {
    router.push(`/e-agreement/${id}`);
  };

  return (
    <CustomHeader
      hideRightButton
      hideBgImage
      pageTitle={t("pageTitle.eAgreement")}
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container">
        <div className="flex items-center pb-3">
          {_.map(btnList, (item, index) => {
            const btn = _.get(item, ["btn"], "");
            return (
              <CustomButton
                buttonText={btn}
                buttonClassName={`btn-sm ${_.isEqual(selectedCategory, btn) ? "primary-btn" : "default-btn"} mr-2`}
                textClassName="font-size-xsmall"
                onClick={() => onClickSelectCategory(btn)}
              />
            );
          })}
        </div>

        {_.map(statusList, (item, index) => (
          <EAgreementCard
            item={item}
            key={index}
            onClickToDetail={onClickToDetail}
            t={t}
          />
        ))}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(EAgreement);
