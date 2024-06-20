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
import { useEffect } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";

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
  const getDate = agreementSelector.getDate(agreementOverviewData);
  const getService = agreementSelector.getService(agreementOverviewData);
  const getStampingStatus = agreementSelector.getStampingStatus(
    agreementOverviewData,
  );
  const getTenantName = agreementSelector.getTenantName(agreementOverviewData);
  const agreeDate = agreementSelector.getAgreeDate(agreementOverviewData);
  const signedDate = agreementSelector.getSigned(agreementOverviewData);

  useEffect(() => {
    // fetchAgreementOverviewData(id);
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
      rightButtonIcon={Images.downloadIcon}
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
              value="XXXXXXXXXXX"
              label={t("eAgreementOverview.referenceNumber")}
            />

            <div className="pb-2">
              <CustomText textClassName="font-size-xxsmall disable-text">
                {t("eAgreementOverview.status")}
              </CustomText>
              <StatusLabel status="pending" />
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomLabelValue
            value="E-Sign & E-Stamp"
            label={t("eAgreementOverview.service")}
          />

          <CustomLabelValue
            value="M Vertica, A-01-01, Room 1"
            label={t("eAgreementOverview.property")}
          />

          <CustomLabelValue
            value="19 Aug 2023"
            label={t("eAgreementOverview.agreementDate")}
          />

          <CustomLabelValue
            value="19 Aug 2023 -18 Aug 2023"
            label={t("eAgreementOverview.tenure")}
          />

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomLabelValue
            value="M Vertica"
            label={t("eAgreementOverview.landlord")}
          />

          <div className="pb-2">
            <CustomText textClassName="font-size-xxsmall disable-text">
              {t("eAgreementOverview.activity")}
            </CustomText>

            <div className="pt-1 grid grid-cols-2 gap-2">
              <div className="flex mr-3 items-start">
                <CustomImage
                  src={Images.checkGreyIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    {t("eAgreementOverview.agreed")}
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    on 19 Aug 03:46 pm
                  </CustomText>
                </div>
              </div>
              <div className="flex items-start">
                <CustomImage
                  src={Images.checkGreenIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    {t("eAgreementOverview.signed")}
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    on 19 Aug 03:46 pm
                  </CustomText>
                </div>
              </div>
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomLabelValue
            value="John Doe"
            label={t("eAgreementOverview.tenant")}
          />

          <div className="pb-2">
            <CustomText textClassName="font-size-xxsmall disable-text">
              {t("eAgreementOverview.activity")}
            </CustomText>
            <div className="pt-1 grid grid-cols-2 gap-2">
              <div className="flex mr-3 items-start">
                <CustomImage
                  src={Images.checkGreyIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    {t("eAgreementOverview.agreed")}
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    on 19 Aug 03:46 pm
                  </CustomText>
                </div>
              </div>
              <div className="flex items-start">
                <CustomImage
                  src={Images.checkGreenIcon}
                  className="mr-1"
                  height={18}
                  width={18}
                />
                <div className="flex flex-col">
                  <CustomText textClassName="font-size-small disable-text">
                    {t("eAgreementOverview.signed")}
                  </CustomText>
                  <CustomText textClassName="font-size-xxsmall disable-text">
                    on 19 Aug 03:46 pm
                  </CustomText>
                </div>
              </div>
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <div className="grid grid-cols-2 gap-2">
            <CustomLabelValue
              value="Pending"
              label={t("eAgreementOverview.stampingStatus")}
            />
            <CustomLabelValue
              value="No"
              label={t("eAgreementOverview.insurance")}
            />
          </div>

          <div className="flex justify-center pt-5 w-full">
            <CustomButton
              onClick={() => onClickToViewAgreement(1)}
              buttonText={t("eAgreementOverview.viewAndAgree")}
              buttonClassName="primary-btn w-3/5"
            />
          </div>
        </div>

        <LoadingOverlay loading={agreementOverviewDataLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(EAgreementOverview);
