import CustomHeader from "@/components/CustomHeader";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map, get, isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EAgreementCard from "@/components/EAgreement/EAgreementCard";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import * as agreementSelector from "@/src/selectors/agreement";
import * as agreementAction from "@/src/actions/agreement";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomEmptyBox from "@/components/CustomEmptyBox";

export { getServerSideProps };

const statusList = ["pending", "completed", "pending", "pending", "completed"];
const btnList = [{ btn: "All" }, { btn: "Completed" }, { btn: "Pending" }];

const EAgreement = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const dispatch = useDispatch();

  const getAgreementListingRequest = (status, perPage, page) =>
    dispatch(agreementAction.getAgreementListingRequest(status, perPage, page));
  const agreementListingData = useSelector((state) =>
    agreementSelector.getAgreementListingData(state, selectedStatus),
  );
  const agreementListingDataLoading = useSelector((state) =>
    agreementSelector.getAgreementOverviewLoading(state),
  );
  const agreementListingDataPagination = useSelector((state) =>
    agreementSelector.getAgreementListingPagination(state),
  );

  useEffect(() => {
    // fetchAgreementListingData();
  }, []);

  const fetchAgreementListingData = () => {
    getAgreementListingRequest();
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSelectStatus = (category) => {
    setSelectedStatus(category);
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
      <div className="body-container pb-4 flex flex-col flex-1">
        <div className="flex items-center pb-3">
          {map(btnList, (item, index) => {
            const btn = get(item, ["btn"], "");
            return (
              <CustomButton
                key={index}
                buttonText={btn}
                buttonClassName={`btn-sm ${isEqual(selectedStatus, btn) ? "primary-btn" : "default-btn"} mr-2`}
                textClassName="font-size-xsmall"
                onClick={() => onClickSelectStatus(btn)}
              />
            );
          })}
        </div>

        {!isEmpty(agreementListingData) ? (
          <div className="flex flex-col flex-1 justify-center">
            <CustomEmptyBox />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {map(Array(10), (item, index) => (
              <EAgreementCard
                item={item}
                key={index}
                onClickToDetail={onClickToDetail}
                t={t}
              />
            ))}
          </div>
        )}

        <LoadingOverlay loading={agreementListingDataLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(EAgreement);
