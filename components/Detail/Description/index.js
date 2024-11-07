import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import DOMPurify from "dompurify";

const Description = ({ t, description }) => {
  const sanitizedDescription = isEmpty(description)
    ? ""
    : DOMPurify.sanitize(description);

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
          <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></div>
        )}
      </div>
    </div>
  );
};

export default Description;
