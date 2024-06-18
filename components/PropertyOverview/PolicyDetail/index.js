import * as listingSelector from "@/src/selectors/listing";
import CustomText from "@/components/CustomText";

const PolicyDetail = ({ t, loading, data }) => {
  const htmlContent = listingSelector.getHtmlContent(data);
  const title = listingSelector.getTitle(data);

  return (
    <div className="mb-5">
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: 100 }}
        >
          <span className="loading loading-spinner loading-lg primary-text"></span>
        </div>
      ) : (
        <div className="content-container">
          <CustomText textClassName="font-size-xxlarge font-bold pb-2">
            {title}
          </CustomText>
          <CustomText textClassName="font-size-small disable-text text-justify">
            {htmlContent}
          </CustomText>
        </div>
      )}
    </div>
  );
};

export default PolicyDetail;
