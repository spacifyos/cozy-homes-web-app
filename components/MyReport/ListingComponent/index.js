import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import MyReportCard from "@/components/MyReport/MyReportCard";

const ListingComponent = ({ data, targetMonth }) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between items-end">
        <CustomText textClassName="section-title">
          {"Monthly P&L Statement"}
        </CustomText>
      </div>

      {isEmpty(data) ? (
        <div className="flex flex-1 justify-center ">
          <CustomEmptyBox
          variant="receipt"
          emptyTitle="No reports yet"
          emptyDesc="Monthly reports will appear here once they're generated."
        />
        </div>
      ) : (
        <MyReportCard data={data} targetMonth={targetMonth} />
      )}
    </div>
  );
};

export default ListingComponent;
