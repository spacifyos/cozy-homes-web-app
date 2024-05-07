import Images from "@/src/utils/Image";
import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import LatestUpdateComponent from "@/components/LatestUpdateComponent";

export { getServerSideProps };
const list = [{ btn: "All" }, { btn: "New" }, { btn: "Read" }];
const UpdateList = [
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
        <div className="flex justify-between items-end pb-4">
          <div className="flex justify-center">
            {_.map(list, (item, index) => {
              const btn = _.get(item, "btn", "");
              return (
                <CustomButton
                  key={index}
                  buttonText={btn}
                  buttonClassName={`btn-sm ${_.isEqual(selectBtn, btn) ? "primary-btn" : "default-btn"} mr-2`}
                  textClassName="font-size-xsmall"
                  onClick={() => onClickSelectBtn(btn)}
                />
              );
            })}
          </div>
        </div>
        {_.map(UpdateList, (item, index) => {
          return (
            <LatestUpdateComponent
              t={t}
              item={item}
              key={index}
              onClickToTitle={onClickToTitle}
            />
          );
        })}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(LatestUpdate);
