import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { get, filter, isEqual, toString, isEmpty } from "lodash";
import { useRouter } from "next/router";
import CustomSelect from "@/components/CustomSelect";
import ListingComponent from "@/components/MyReport/ListingComponent";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as reportSelector from "@/src/selectors/report";
import moment from "moment";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const MyReport = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const statement = reportSelector.getStatement(reportData);
  const propertyOption = reportSelector.getPropertyOption(reportData);
  const [unitOption, setUnitOption] = useState([]);

  const [filterParams, setFilterParams] = useState({
    month: moment().subtract(1, "months").format("YYYY-MM"),
  });
  const targetMonth = get(filterParams, ["month"], "");

  useEffect(() => {
    fetchOwnerReportListing();
  }, [filterParams]);

  const fetchOwnerReportListing = async () => {
    await apiRequest.getOwnerReportListingRequest(
      filterParams,
      setLoading,
      fetchSuccessCallback,
    );
  };

  const fetchSuccessCallback = (res) => {
    setReportData(res);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onChangePropertyValue = (e) => {
    const filterProperty = filter(propertyOption, (item) =>
      isEqual(toString(item.value), e.target.value),
    );
    const targetUnit = reportSelector.getUnitOption(filterProperty[0]);

    setFilterParams({
      ...filterParams,
      ...{ property_id: e.target.value, unit_id: "" },
    });
    setUnitOption(targetUnit);
  };

  const onChangeUnitValue = (e) => {
    setFilterParams({ ...filterParams, ...{ unit_id: e.target.value } });
  };

  const onChangeMonthValue = (e) => {
    const selectedMonth = isEmpty(e.target.value)
      ? moment().subtract(1, "months").format("YYYY-MM")
      : moment(e.target.value).format("YYYY-MM");

    setFilterParams({
      ...filterParams,
      ...{ month: selectedMonth },
    });
  };

  return (
    <CustomOwnerHeader
      className="pb-0"
      title="My Monthly P&L Statement"
      onClickGoBack={onClickGoBack}
    >
      <NextSeo title="My Report | Owner - Spacify Asia" />

      <div className="bg-color flex flex-col flex-1 global-horizontal-padding">
        <div className="grid grid-cols-3 gap-2 pt-5 pb-7">
          <CustomSelect
            placeholder={"Property"}
            optionList={propertyOption}
            onChange={onChangePropertyValue}
            // value={stateValue}
          />

          <CustomSelect
            placeholder={"Unit"}
            optionList={unitOption}
            onChange={onChangeUnitValue}
            // value={stateValue}
          />

          <div className="relative">
            <input
              className="p-4 global-box-shadow global-border-radius primaryWhite-bg-color resize-input-icon font-size-xsmall"
              type="month"
              style={{ height: 48 }}
              onChange={onChangeMonthValue}
              value={get(filterParams, ["month"], "")}
              min="2000-01"
              max={moment().subtract(1, "months").format("YYYY-MM")}
            />
          </div>
        </div>

        <ListingComponent data={statement} targetMonth={targetMonth} />
      </div>

      <LoadingOverlay loading={loading} />
    </CustomOwnerHeader>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyReport));
