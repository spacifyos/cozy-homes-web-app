import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import { get, filter, isEqual, toString, isEmpty } from "lodash";
import { useRouter } from "next/router";
import CustomSelect from "@/components/CustomSelect";
import ListingComponent from "@/components/MyReport/ListingComponent";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { useEffect, useState } from "react";
import * as reportSelector from "@/src/selectors/report";
import moment from "moment";
import { NextSeo } from "next-seo";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import DesktopLayout from "@/components/DesktopLayout";
import CustomImage from "@/components/CustomImage";

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
    <div className="min-h-screen bg-white">
      <NextSeo title="My Report | Owner - Spacify Asia" />
      <DesktopLayout
        loading={loading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul className="flex-wrap">
                <li>
                  <a href={"/user/owner"}>
                    <CustomText textClassName="text-base text-disable">
                      My Property
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base font-bold">
                    My Report
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
              <CustomText textClassName="text-base">My Report</CustomText>
            </div>
          </div>
        }
      >
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-3 gap-2 pb-7">
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
                className="p-4 global-box-shadow global-border-radius bg-white resize-input-icon text-xs"
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
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyReport));
