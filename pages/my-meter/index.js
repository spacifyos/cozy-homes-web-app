import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import _ from "lodash";
import MeterUsageComponent from "@/components/MyMeter/MeterUsageComponent";
import * as smartMeterAction from "@/src/actions/meter";
import * as smartMeterSelector from "@/src/selectors/meter";
import { useDispatch, useSelector } from "react-redux";

export { getServerSideProps };

const MyMeter = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const getSmartMeterListingRequest = () =>
    dispatch(smartMeterAction.getSmartMeterListingRequest());
  const smartMeterListingData = useSelector((state) =>
    smartMeterSelector.getSmartMeterListingData(state),
  );
  const smartMeterListingLoading = useSelector((state) =>
    smartMeterSelector.getSmartMeterListingLoading(state),
  );

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToMeterOverview = (id) => {
    router.push(`/my-meter/${id}`);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.myMeter")}
      hideBgImage
      onClickGoBack={onClickGoBack}
      rightButtonIcon={Images.filterProIcon}
    >
      <div className="pb-1 global-horizontal-padding flex flex-col gap-3 pb-4">
        {_.map(Array(12), (item, index) => (
          <MeterUsageComponent
            t={t}
            key={index}
            onClickToMeterOverview={onClickToMeterOverview}
          />
        ))}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyMeter);
