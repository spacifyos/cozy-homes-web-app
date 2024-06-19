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
import apiRequest, {
  postSyncMeterRequest,
} from "@/src/services/httpUtilities/apiRequest";
import Toast from "@/src/utils/Toast";

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

  const [syncMeterLoading, setSyncMeterLoading] = useState(false);

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
    Toast.success("Sync meter successful!");
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
            className="mr-4"
            onClick={onClickSyncMeter}
            src={Images.refreshIcon}
            height={30}
            width={30}
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

        {/*<MeterFeature t={t} onClickToTopUpMeter={onClickToTopUpMeter} />*/}

        {/*<MeterUsageSection*/}
        {/*  t={t}*/}
        {/*  onClickChange={onClickChange}*/}
        {/*  selectChange={selectChange}*/}
        {/*/>*/}

        <LoadingOverlay loading={meterOverviewLoading || syncMeterLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyMeterOverview);
