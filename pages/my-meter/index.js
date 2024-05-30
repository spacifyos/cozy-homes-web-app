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
import CustomButton from "@/components/CustomButton";

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
      <div className="body-container flex flex-col gap-3 pb-4">
        {_.map(Array(12), (item, index) => (
          <MeterUsageComponent
            t={t}
            key={index}
            onClickToMeterOverview={onClickToMeterOverview}
          />
        ))}

        <div className="flex justify-center">
          <CustomButton
            buttonClassName="primary-btn min-h-9 h-9 w-32"
            buttonText="Load More"
            textClassName="font-size-xsmall"
          />
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyMeter);
