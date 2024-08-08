import CustomText from "@/components/CustomText";
import _, { isEmpty } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const Description = ({ t, description }) => {
  return (
    <div className="mb-5 content-container">
      <CustomText textClassName="section-title">
        {t("propertyDetail.description")}
      </CustomText>
      <div className="">
        {isEmpty(description) ? (
          <div className="py-10">
            <CustomEmptyBox
              emptyTitle="No description found"
              emptyDesc="Description is not available for now."
            />
          </div>
        ) : (
          <CustomText textClassName="font-size-xsmall">
            {description}
          </CustomText>
        )}
      </div>
    </div>
  );
};

export default Description;
