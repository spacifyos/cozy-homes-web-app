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
import Constant from "@/src/utils/Constant";
import AuthWrapper from "@/components/AuthWrapper";

export { getServerSideProps };

const btnLists = [
  { name: "All", value: Constant.AGREEMENT_ALL },
  { name: "Draft", value: Constant.AGREEMENT_DRAFT },
  { name: "Pending", value: Constant.AGREEMENT_PENDING },
  { name: "Completed", value: Constant.AGREEMENT_COMPLETED },
];

const EAgreement = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState(Constant.AGREEMENT_ALL);

  const getAgreementListingRequest = (status, perPage, page) =>
    dispatch(agreementAction.getAgreementListingRequest(status, perPage, page));
  const agreementListingData = useSelector((state) =>
    agreementSelector.getAgreementListingData(state, selectedStatus),
  );
  const agreementListingDataLoading = useSelector((state) =>
    agreementSelector.getAgreementListingLoading(state, selectedStatus),
  );
  const agreementListingDataPagination = useSelector((state) =>
    agreementSelector.getAgreementListingPagination(state),
  );

  useEffect(() => {
    fetchAgreementListingData(selectedStatus);
  }, [selectedStatus]);

  const fetchAgreementListingData = (
    status = Constant.AGREEMENT_ALL,
    perPage = 20,
    page = 1,
  ) => {
    getAgreementListingRequest(status, perPage, page);
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
          {map(btnLists, (item, index) => {
            const name = get(item, ["name"], "");
            const value = get(item, ["value"], "");

            return (
              <CustomButton
                key={index}
                buttonText={name}
                buttonClassName={`btn-sm ${isEqual(selectedStatus, value) ? "primary-btn" : "default-btn"} mr-2`}
                textClassName="font-size-xsmall"
                onClick={() => onClickSelectStatus(value)}
              />
            );
          })}
        </div>

        {isEmpty(agreementListingData) ? (
          <div className="flex flex-col flex-1 justify-center">
            <CustomEmptyBox />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {map(agreementListingData, (item, index) => (
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

export default withTranslation("common")(AuthWrapper(EAgreement));
