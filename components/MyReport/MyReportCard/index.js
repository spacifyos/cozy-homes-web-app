import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import * as reportSelector from "@/src/selectors/report";
import moment from "moment/moment";
import { ReportIcon } from "@/components/Icons";

const MyReportCard = ({ data, targetMonth }) => {
  return (
    <div className="grid gap-3">
      {map(data, (item, index) => {
        const description = reportSelector.getDescription(item);
        const propertyName = reportSelector.getPropertyUnitName(item);
        const period = reportSelector.getPeriod(item);
        const id = reportSelector.getId(item);

        return (
          <a
            href={`/user/owner/my-report/${id}?month=${isEmpty(targetMonth) ? moment().format("DD-MM-YYYY") : moment(targetMonth).format("DD-MM-YYYY")}`}
            key={index}
            className="flex items-center bg-white global-box-shadow global-border-radius px-4 py-3 cursor-pointer"
          >
            <ReportIcon size={25} className="text-primary" />

            <div className="pl-3">
              {/*<CustomText textClassName="text-xs text-disable italic">*/}
              {/*  08 Aug 2024, 3.35pm*/}
              {/*</CustomText>*/}
              <CustomText textClassName="text-sm text-primary font-bold">
                {isEmpty(propertyName) ? "-" : propertyName}
              </CustomText>
              <CustomText textClassName="text-sm font-bold">
                {isEmpty(description) ? "-" : description}
              </CustomText>
              <CustomText textClassName="text-disable text-sm">
                {isEmpty(period) ? "-" : period}
              </CustomText>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default MyReportCard;
