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
      pageTitle={"E-Agreement"}
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container">
        <div className="flex items-center pb-3">
          <CustomButton
            buttonText="All"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "All") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("All")}
          />
          <CustomButton
            buttonText="Completed"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Completed") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Completed")}
          />
          <CustomButton
            buttonText="Pending"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Pending") ? "primary-btn" : "default-btn"}`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Pending")}
          />
        </div>

        {_.map(statusList, (item) => (
          <EAgreementCard item={item} onClickToDetail={onClickToDetail} />
        ))}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(EAgreement);
