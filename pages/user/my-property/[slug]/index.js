import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import TenancyUserSection from "@/components/MyTenancy/TenancyUserSection";
import TenancyDetail from "@/components/MyTenancy/TenancyDetail";
import TenancyFeeDetail from "@/components/MyTenancy/TenancyFeeDetail";
import SubscribeAutoPayModal from "@/components/MyTenancy/SubscribeAutoPayModal";
import EAgreement from "@/components/MyTenancy/E-AgreementSection";
import InsuranceSection from "@/components/MyTenancy/InsuranceSection";
import { useEffect, useState } from "react";
import UnsubscribeAutoPayModal from "@/components/MyTenancy/UnsubscribeAutoPayModal";
import * as tenancyAction from "@/src/actions/tenancy";
import * as tenancySelector from "@/src/selectors/tenancy";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "@/src/actions/auth";
import * as authSelector from "@/src/selectors/auth";
import Helper from "@/src/utils/Helper";
import { NextSeo } from "next-seo";
import AuthWrapper from "@/components/AuthWrapper";
import DesktopLayout from "@/components/DesktopLayout";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import { get, isEmpty, isEqual } from "lodash";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import AuthManager from "@/src/utils/AuthManager";
import axios from "axios";
import Toast from "@/src/utils/Toast";

export { getServerSideProps };

const MyPropertyOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const getTenancyOverviewRequest = (id) =>
    dispatch(tenancyAction.getTenancyOverviewRequest(id));
  const tenancyOverviewData = useSelector((state) =>
    tenancySelector.getTenancyOverviewData(state, id),
  );
  const tenancyOverviewLoading = useSelector((state) =>
    tenancySelector.getTenancyOverviewLoading(state),
  );

  const [gallerySecretKey, setGallerySecretKey] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [rootDataLoading, setRootDataLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const oneTimeFee = tenancySelector.getOneTimeFee(tenancyOverviewData);
  const recurringFee = tenancySelector.getRecurringFee(tenancyOverviewData);
  const tenancyCode = tenancySelector.getTenancyCode(tenancyOverviewData);

  useEffect(() => {
    fetchUserprofileData();
    fetchRootData();
  }, []);

  useEffect(() => {
    if (!tenancyOverviewLoading) fetchTenancyOverview(id);
  }, [id]);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const fetchTenancyOverview = (id) => {
    getTenancyOverviewRequest(id);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onChangeAutoPay = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      Helper.documentGetElementById("myTenancy_Unsubscribe_modal").showModal();
    } else {
      Helper.documentGetElementById("myTenancy_Subscribe_modal").showModal();
    }
  };

  const onClickDownloadAgreement = async (url, extension) => {
    if (!isEmpty(url) && !isEmpty(gallerySecretKey)) {
      await fetchDocumentData(url, gallerySecretKey, extension);
    }
  };

  const fetchRootData = async () => {
    await apiRequest.getRootDataRequest(
      setRootDataLoading,
      getRootDataSuccessCallback,
    );
  };

  const getRootDataSuccessCallback = (res) => {
    const chiper1 = get(res, ["chiper1"], "");
    const chiper2 = get(res, ["chiper2"], "");

    setGallerySecretKey(Helper.generateSecretKey(chiper1, chiper2));
  };

  const fetchDocumentData = async (url, key, extension) => {
    const headers = {
      "Content-Type": "application/json",
      AGSC: key,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    setDownloading(true);

    axios
      .get(url + "/download", { headers: headers })
      .then(async (response) => {
        const resUrl = get(response, ["data", "data", "url"], "");

        if (!isEmpty(resUrl)) {
          await apiRequest.downloadFileRequest(resUrl, {}, "", extension);
        }
      })
      .catch((error) => {
        Toast.error("Download failed: " + error.message);
      })
      .finally(() => setDownloading(false));
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="My Property Overview - CozyHomes" />

      <DesktopLayout
        hideFooter
        loading={
          userProfileLoading ||
          tenancyOverviewLoading ||
          downloading ||
          rootDataLoading
        }
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/user/my-property"}>
                    <CustomText textClassName="text-base text-disable">
                      My Property
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base">
                    {tenancyCode}
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIconBlack}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base"> {tenancyCode}</CustomText>
            </div>
          </div>
        }
      >
        <div className="gap-6 flex flex-col">
          <TenancyUserSection t={t} data={userProfileData} />

          <TenancyDetail
            t={t}
            onChangeAutoPay={onChangeAutoPay}
            isChecked={isChecked}
            data={tenancyOverviewData}
            onClickDownloadAgreement={onClickDownloadAgreement}
          />

          <TenancyFeeDetail title={"One Time Charges"} data={oneTimeFee} />

          <TenancyFeeDetail title={"Monthly Charges"} data={recurringFee} />

          {/*<EAgreement*/}
          {/*  t={t}*/}
          {/*  onClickToAgreementOverview={onClickToAgreementOverview}*/}
          {/*/>*/}

          {/*<UnsubscribeAutoPayModal t={t} />*/}

          {/*<SubscribeAutoPayModal t={t} />*/}
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(MyPropertyOverview));
