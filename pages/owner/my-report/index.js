import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, filter, isEqual, toString } from "lodash";
import { useRouter } from "next/router";
import CustomSelect from "@/components/CustomSelect";
import ListingComponent from "@/components/MyReport/ListingComponent";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as reportSelector from "@/src/selectors/report";
import moment from "moment";

export { getServerSideProps };

const MyReport = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const statement = reportSelector.getStatement(reportData);
  const propertyOption = reportSelector.getPropertyOption(reportData);
  const [unitOption, setUnitOption] = useState([]);

  const [filterParams, setFilterParams] = useState({
    month: moment().format("YYYY-MM"),
  });

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
    setFilterParams({
      ...filterParams,
      ...{ month: moment(e.target.value).format("YYYY-MM") },
    });
  };

  const onClickToDetail = (id) => {
    router.push(`/owner/my-report/${id}`);
  };

  return (
    <div className="flex flex-col flex-1 ">
      <div className="body-container py-5 owner-bg-color">
        <div className={`flex items-center justify-between overflow-hidden`}>
          <div className="flex justify-center items-center">
            <div onClick={onClickGoBack} className="cursor-pointer">
              <CustomImage
                className={"me-5 cursor-pointer"}
                src={Images.leftIconWhite}
                imageStyle={{ width: 10 }}
              />
            </div>

            <CustomText
              textClassName={"font-bold white-text"}
              styles={{ fontSize: 18 }}
            >
              My Monthly P&L Statement
            </CustomText>
          </div>

          {/*<CustomImage*/}
          {/*  src={rightButtonIcon}*/}
          {/*  imageStyle={{ width: 25, height: 25 }}*/}
          {/*  onClick={onClickRightButton}*/}
          {/*  className="cursor-pointer"*/}
          {/*/>*/}
        </div>
      </div>
      <div className="flex flex-col flex-1 global-horizontal-padding">
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
              max={moment().format("YYYY-MM")}
            />
          </div>
        </div>

        <ListingComponent data={statement} onClickToDetail={onClickToDetail} />
      </div>

      <LoadingOverlay loading={loading} />
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(MyReport));
