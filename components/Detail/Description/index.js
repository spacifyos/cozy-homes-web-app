import CustomText from "@/components/CustomText";
import _ from "lodash";

const Description = ({ t, description }) => {
  return (
    <div className="mb-5 content-container">
      <CustomText textClassName="section-title">
        {t("propertyDetail.description")}
      </CustomText>
      <div className="">
        <CustomText textClassName="font-size-xsmall">
          {_.isEmpty(description)
            ? "Description is not available for now."
            : description}
        </CustomText>
      </div>
    </div>
  );
};

export default Description;
