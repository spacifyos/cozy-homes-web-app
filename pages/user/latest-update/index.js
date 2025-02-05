import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import LatestUpdateComponent from "@/components/LatestUpdateComponent";
import _ from "lodash";

export { getServerSideProps };
const list = [{ btn: "All" }, { btn: "New" }, { btn: "Read" }];
const updateLists = [
  { date: "15 Dec 2024" },
  { date: "15 Dec 2024" },
  { date: "12 Dec 2024" },
  { date: "09 Dec 2024" },
];
const LatestUpdate = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectBtn, setSelectBtn] = useState("All");

  const onClickSelectBtn = (selectBtn) => {
    setSelectBtn(selectBtn);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToTitle = () => {
    router.push("latest-update/title-page");
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.latestUpdate")}
      hideBgImage
      onClickGoBack={onClickGoBack}
    >
      <div className="body-container">
        <div className="flex mb-4">
          {_.map(list, (item, index) => {
            const btn = _.get(item, "btn", "");
            return (
              <CustomButton
                key={index}
                buttonText={btn}
                buttonClassName={`btn-sm ${_.isEqual(selectBtn, btn) ? "btn-primary" : "default-btn"} mr-2`}
                textClassName="text-xs"
                onClick={() => onClickSelectBtn(btn)}
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          {_.map(updateLists, (updateList, index) => {
            return (
              <LatestUpdateComponent
                t={t}
                item={updateList}
                key={index}
                onClickToTitle={onClickToTitle}
              />
            );
          })}
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(LatestUpdate);
