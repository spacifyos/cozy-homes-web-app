import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import DOMPurify from "isomorphic-dompurify";

const Description = ({ description }) => {
  const sanitizedDescription = isEmpty(description)
    ? ""
    : DOMPurify.sanitize(description);

  return (
    <div className="mb-5 content-container">
      <CustomText textClassName="section-title">Description</CustomText>
      <div className="">
        {isEmpty(description) ? (
          <div className="py-10">
            <CustomEmptyBox
              emptyTitle="No description yet"
              emptyDesc="The owner hasn't added details for this listing yet."
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
