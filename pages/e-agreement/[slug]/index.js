import CustomHeader from "@/components/CustomHeader";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomText from "@/components/CustomText";
import StatusLabel from "@/components/StatusLabel";
import CustomImage from "@/components/CustomImage";
import CustomButton from "@/components/CustomButton";
import * as agreementSelector from "@/src/selectors/agreement";
import * as agreementAction from "@/src/actions/agreement";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import AuthWrapper from "@/components/AuthWrapper";
import { get, isEmpty } from "lodash";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Helper from "@/src/utils/Helper";

export { getServerSideProps };

const EAgreementOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const getAgreementOverviewRequest = (id) =>
    dispatch(agreementAction.getAgreementOverviewRequest(id));
  const agreementOverviewData = useSelector((state) =>
    agreementSelector.getAgreementOverviewData(state, id),
  );
  const agreementOverviewDataLoading = useSelector((state) =>
    agreementSelector.getAgreementOverviewLoading(state),
  );

  const referenceNumber = agreementSelector.getReferenceNumber(
    agreementOverviewData,
  );
  const property = agreementSelector.getProperty(agreementOverviewData);
  const status = agreementSelector.getStatus(agreementOverviewData);
  const tenurePeriod = agreementSelector.getTenurePeriod(agreementOverviewData);
  const getAgree = agreementSelector.getAgree(agreementOverviewData);
  const getSigned = agreementSelector.getSigned(agreementOverviewData);
  const agreedDate = agreementSelector.getAgreedDate(agreementOverviewData);
  const tenantName = agreementSelector.getTenantName(agreementOverviewData);
  const agreementDate = agreementSelector.getAgreementDate(
    agreementOverviewData,
  );
  const signedDate = agreementSelector.getSignedDate(agreementOverviewData);
  const isCanAgree = agreementSelector.isCanAgree(agreementOverviewData);
  const isCanSign = agreementSelector.isCanSign(agreementOverviewData);
  const agreementId = agreementSelector.getId(agreementOverviewData);

  useEffect(() => {
    fetchAgreementOverviewData(id);
  }, [id]);

  const fetchAgreementOverviewData = (id) => {
    getAgreementOverviewRequest(id);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToViewAgreement = (id) => {
    router.push(`/e-agreement/${id}/view-agreement`);
  };

  return (
    <CustomHeader
      onClickGoBack={onClickGoBack}
      hideBgImage
      pageTitle={t("pageTitle.eAgreementOverview")}
      // rightButtonIcon={Images.downloadIcon}
    >
      <div className="body-container relative pt-6 pb-4 flex justify-center">
        <div className="primary-bg-color p-2 ps-3 global-border-radius absolute top-0">
          <CustomImage
            src={Images.agreementIcon}
            imageStyle={{ width: 30, height: 30 }}
          />
        </div>

        <div className="global-box-shadow global-border-radius p-5 primaryWhite-bg-color pt-10 w-full">
          <div className="flex justify-between">
            <CustomLabelValue
              highlight
              value={isEmpty(referenceNumber) ? "-" : referenceNumber}
              label={t("eAgreementOverview.referenceNumber")}
            />

            <div className="pb-2">
              <CustomText textClassName="font-size-xxsmall disable-text">
                {t("eAgreementOverview.status")}
              </CustomText>
              <StatusLabel status={status} />
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          {/*<CustomLabelValue*/}
          {/*  value="E-Sign & E-Stamp"*/}
          {/*  label={t("eAgreementOverview.service")}*/}
          {/*/>*/}

          <CustomLabelValue
            value={isEmpty(property) ? "-" : property}
            label={t("eAgreementOverview.property")}
          />

          <CustomLabelValue
            value={isEmpty(agreementDate) ? "-" : agreementDate}
            label={t("eAgreementOverview.agreementDate")}
          />

          <CustomLabelValue
            value={isEmpty(tenurePeriod) ? "-" : tenurePeriod}
            label={t("eAgreementOverview.tenure")}
          />

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomLabelValue
            value={isEmpty(tenantName) ? "-" : tenantName}
            label={t("eAgreementOverview.tenant")}
          />

          <div className="pb-2">
            <CustomText textClassName="font-size-xxsmall disable-text">
              {t("eAgreementOverview.activity")}
            </CustomText>
            <div className="pt-1 grid grid-cols-2 gap-2">
              <div className="flex mr-3 items-start">
                <CustomImage
                  src={getAgree ? Images.checkGreenIcon : Images.checkGreyIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    {t("eAgreementOverview.agreed")}
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    {isEmpty(agreedDate) ? "-" : agreedDate}
                  </CustomText>
                </div>
              </div>
              <div className="flex items-start">
                <CustomImage
                  src={getSigned ? Images.checkGreenIcon : Images.checkGreyIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    {t("eAgreementOverview.signed")}
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    {isEmpty(signedDate) ? "-" : signedDate}
                  </CustomText>
                </div>
              </div>
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          {/*<div className="grid grid-cols-2 gap-2">*/}
          {/*  <CustomLabelValue*/}
          {/*    value="Pending"*/}
          {/*    label={t("eAgreementOverview.stampingStatus")}*/}
          {/*  />*/}
          {/*  <CustomLabelValue*/}
          {/*    value="No"*/}
          {/*    label={t("eAgreementOverview.insurance")}*/}
          {/*  />*/}
          {/*</div>*/}

          <div className="flex justify-center pt-5 w-full">
            <CustomButton
              onClick={() => onClickToViewAgreement(agreementId)}
              buttonText={
                isCanAgree ? "View & Agree" : isCanSign ? "View & Sign" : "View"
              }
              buttonClassName="primary-btn w-3/5"
            />
          </div>
        </div>

        <LoadingOverlay loading={agreementOverviewDataLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(AuthWrapper(EAgreementOverview));
