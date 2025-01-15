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
import AuthWrapper from "@/components/AuthWrapper";
import { isEmpty } from "lodash";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";

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

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="My E-Agreement Overview - Spacify Asia" />

      <DesktopLayout
        hideFooter
        loading={agreementOverviewDataLoading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/user/e-agreement"}>
                    <CustomText textClassName="text-base disable-text">
                      My E-Agreement
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base ">
                    {referenceNumber}
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">
                {referenceNumber}
              </CustomText>
            </div>
          </div>
        }
      >
        <div className="relative pt-6 flex justify-center">
          <div
            className="primary-bg-color pt-3 pe-2 ps-3 global-border-radius absolute top-0 z-10"
            style={{ height: 54 }}
          >
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
                label={"Reference Number"}
              />

              <div className="pb-2">
                <CustomText textClassName="text-xs disable-text">
                  {"Status"}
                </CustomText>
                <StatusLabel status={status} />
              </div>
            </div>

            <div
              className="divider-line"
              style={{ marginTop: 10, marginBottom: 10 }}
            ></div>

            <CustomLabelValue
              value={isEmpty(property) ? "-" : property}
              label={"Property"}
            />

            <CustomLabelValue
              value={isEmpty(agreementDate) ? "-" : agreementDate}
              label={"Agreement Date"}
            />

            <CustomLabelValue
              value={isEmpty(tenurePeriod) ? "-" : tenurePeriod}
              label={"Tenure"}
            />

            <div
              className="divider-line"
              style={{ marginTop: 10, marginBottom: 10 }}
            ></div>

            <CustomLabelValue
              value={isEmpty(tenantName) ? "-" : tenantName}
              label={"Tenant"}
            />

            <div className="pb-2">
              <CustomText textClassName="text-xs disable-text">
                {"Activity"}
              </CustomText>
              <div className="pt-1 grid grid-cols-2 gap-2">
                <div className="flex mr-3 items-start">
                  <CustomImage
                    src={
                      getAgree ? Images.checkGreenIcon : Images.checkGreyIcon
                    }
                    className="mr-1"
                    imageStyle={{ width: 18, height: 18 }}
                  />
                  <div className="flex flex-col">
                    <CustomText textClassName="text-sm disable-text">
                      Agreed
                    </CustomText>
                    <CustomText textClassName="text-xs disable-text">
                      {isEmpty(agreedDate) ? "-" : agreedDate}
                    </CustomText>
                  </div>
                </div>
                <div className="flex items-start">
                  <CustomImage
                    src={
                      getSigned ? Images.checkGreenIcon : Images.checkGreyIcon
                    }
                    className="mr-1"
                    imageStyle={{ width: 18, height: 18 }}
                  />
                  <div className="flex flex-col">
                    <CustomText textClassName="text-sm disable-text">
                      Signed
                    </CustomText>
                    <CustomText textClassName="text-xs disable-text">
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

            <a
              className="flex justify-center pt-5 w-full"
              href={`/user/e-agreement/${agreementId}/view-agreement`}
            >
              <CustomButton
                buttonText={
                  isCanAgree
                    ? "View & Agree"
                    : isCanSign
                      ? "View & Sign"
                      : "View"
                }
                buttonClassName="primary-btn w-3/5"
              />
            </a>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(EAgreementOverview));
