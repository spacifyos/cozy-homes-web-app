import * as listingSelector from "@/src/selectors/listing";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import DOMPurify from "dompurify";

const PolicyDetail = ({ t, loading, data }) => {
  const htmlContent = listingSelector.getHtmlContent(data);
  const title = listingSelector.getTitle(data);

  const sanitizedDescription = isEmpty(htmlContent)
    ? ""
    : DOMPurify.sanitize(htmlContent);

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center pt-40">
          <span className="loading loading-spinner loading-lg primary-text"></span>
        </div>
      ) : (
        <div className="content-container">
          {isEmpty(data) ? (
            <div className="py-10">
              <CustomEmptyBox
                emptyTitle="No policy found"
                emptyDesc="Policy is not available for now."
              />
            </div>
          ) : (
            <div>
              <CustomText textClassName="text-lg font-bold pb-2">
                {title}
              </CustomText>
              <div
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PolicyDetail;
