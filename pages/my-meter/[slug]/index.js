import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import MeterRadialProgressComponent from "@/components/MyMeter/MeterRadialProgressComponent";
import MeterDetail from "@/components/MyMeter/MeterDetail";
import BalanceUnit from "@/components/MyMeter/BalanceUnit";
import MeterFeature from "@/components/MyMeter/MeterFeature";
import MeterUsageSection from "@/components/MyMeter/MeterUsageSection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as meterAction from "@/src/actions/meter";
import * as meterSelector from "@/src/selectors/meter";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "@/components/LoadingOverlay";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import MeterTopUpSection from "@/components/MyMeter/MeterTopUpSection";
import { isEmpty } from "lodash";
import Toast from "@/src/utils/Toast";
import { NextSeo } from "next-seo";
import AuthWrapper from "@/components/AuthWrapper";
import DesktopLayout from "@/components/DesktopLayout";

export { getServerSideProps };

const MyMeterOverview = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const getMeterOverviewRequest = (id) =>
    dispatch(meterAction.getMeterOverviewRequest(id));
  const meterOverviewData = useSelector((state) =>
    meterSelector.getMeterOverviewData(state, id),
  );
  const meterOverviewLoading = useSelector((state) =>
    meterSelector.getMeterOverviewLoading(state),
  );

  const balanceUnit = meterSelector.getBalanceUnit(meterOverviewData);
  const lastConnectedAt = meterSelector.getLastConnectAt(meterOverviewData);
  const unitPrice = meterSelector.getUnitPrice(meterOverviewData);
  const tenancy = meterSelector.getTenancy(meterOverviewData);

  const [syncMeterLoading, setSyncMeterLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [meterTopUpLoading, setMeterTopUpLoading] = useState(false);
  const [tenancyValue, setTenancyValue] = useState("");

  useEffect(() => {
    fetchMeterOverviewData(id);
  }, []);

  const fetchMeterOverviewData = (id) => {
    getMeterOverviewRequest(id);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickSyncMeter = async () => {
    await apiRequest.postSyncMeterRequest(
      id,
      setSyncMeterLoading,
      syncMeterSuccessCallback,
    );
  };

  const syncMeterSuccessCallback = () => {
    fetchMeterOverviewData(id);
  };

  const onClickSelectPrice = (price) => {
    if (price === selectedPrice) {
      setSelectedPrice(0);
      return;
    }

    setSelectedPrice(price);
  };

  const onClickPayNow = async () => {
    if (isEmpty(tenancyValue)) {
      return Toast.error("Tenancy must be select.");
    }

    if (selectedPrice === 0) {
      return Toast.error("Top up price cannot be 0.");
    }

    const postData = {
      amount: selectedPrice,
      tenancy_code: tenancyValue,
    };

    await apiRequest.postMeterTopUpRequest(
      id,
      postData,
      setMeterTopUpLoading,
      meterTopUpSuccessCallback,
    );
  };

  const meterTopUpSuccessCallback = (res) => {
    const url = meterSelector.getUrl(res);

    if (!isEmpty(url)) {
      window.open(url, "_self");
    }
  };

  const onChangeSelectedPriceValue = (e) => {
    setSelectedPrice(e.target.value);
  };

  const onClickClearSelectedPrice = () => {
    setSelectedPrice(0);
  };

  const onChangeTenancyValue = (e) => {
    setTenancyValue(e.target.value);
  };

  // const [selectChange, setSelectChange] = useState("Daily");

  // const onClickChange = (selected) => {
  //   setSelectChange(selected);
  // };
  //
  // const onClickToTopUpMeter = (id) => {
  //   router.push(`/my-meter/${id}/top-up-meter`);
  // };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Meter Overview - Spacify Asia" />

      <DesktopLayout page="My Meter Overview">
        <div className="">
          <div className="flex flex-row justify-between">
            <CustomText textClassName="section-title">
              {t("myMeterOverview.todayUsage")}
            </CustomText>
            <CustomImage
              className="mr-4 cursor-pointer"
              onClick={onClickSyncMeter}
              src={Images.refreshIcon}
              imageStyle={{ width: 30 }}
            />
          </div>

          <div className="radial-container pb-7">
            <MeterRadialProgressComponent t={t} balanceUnit={balanceUnit} />
          </div>

          <MeterDetail t={t} data={meterOverviewData} />

          <BalanceUnit
            t={t}
            balanceUnit={balanceUnit}
            lastConnectedAt={lastConnectedAt}
          />

          <MeterTopUpSection
            t={t}
            onClickSelectPrice={onClickSelectPrice}
            selectedPrice={selectedPrice}
            unitPrice={unitPrice}
            onClickPayNow={onClickPayNow}
            onChangeSelectedPriceValue={onChangeSelectedPriceValue}
            onClickClearSelectedPrice={onClickClearSelectedPrice}
            tenancy={tenancy}
            tenancyValue={tenancyValue}
            onChangeTenancyValue={onChangeTenancyValue}
          />

          {/*<MeterFeature t={t} onClickToTopUpMeter={onClickToTopUpMeter} />*/}

          {/*<MeterUsageSection*/}
          {/*  t={t}*/}
          {/*  onClickChange={onClickChange}*/}
          {/*  selectChange={selectChange}*/}
          {/*/>*/}

          <LoadingOverlay
            loading={
              meterOverviewLoading || syncMeterLoading || meterTopUpLoading
            }
          />
        </div>
      </DesktopLayout>

      <CustomHeader
        pageTitle={t("pageTitle.myMeterOverview")}
        hideBgImage
        onClickGoBack={onClickGoBack}
      >
        <div className="pb-4 global-horizontal-padding">
          <div className="flex flex-row justify-between">
            <CustomText textClassName="section-title">
              {t("myMeterOverview.todayUsage")}
            </CustomText>
            <CustomImage
              className="mr-4 cursor-pointer"
              onClick={onClickSyncMeter}
              src={Images.refreshIcon}
              imageStyle={{ width: 30 }}
            />
          </div>

          <div className="radial-container pb-7">
            <MeterRadialProgressComponent t={t} balanceUnit={balanceUnit} />
          </div>

          <MeterDetail t={t} data={meterOverviewData} />

          <BalanceUnit
            t={t}
            balanceUnit={balanceUnit}
            lastConnectedAt={lastConnectedAt}
          />

          <MeterTopUpSection
            t={t}
            onClickSelectPrice={onClickSelectPrice}
            selectedPrice={selectedPrice}
            unitPrice={unitPrice}
            onClickPayNow={onClickPayNow}
            onChangeSelectedPriceValue={onChangeSelectedPriceValue}
            onClickClearSelectedPrice={onClickClearSelectedPrice}
            tenancy={tenancy}
            tenancyValue={tenancyValue}
            onChangeTenancyValue={onChangeTenancyValue}
          />

          {/*<MeterFeature t={t} onClickToTopUpMeter={onClickToTopUpMeter} />*/}

          {/*<MeterUsageSection*/}
          {/*  t={t}*/}
          {/*  onClickChange={onClickChange}*/}
          {/*  selectChange={selectChange}*/}
          {/*/>*/}

          <LoadingOverlay
            loading={
              meterOverviewLoading || syncMeterLoading || meterTopUpLoading
            }
          />
        </div>
      </CustomHeader>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(MyMeterOverview));
