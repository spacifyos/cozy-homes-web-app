import * as listingSelector from "@/src/selectors/listing";

const PolicyDetail = ({ t, loading, data }) => {
  const htmlContent = listingSelector.getHtmlContent(data);

  return loading ? (
    <div className="flex justify-center items-center" style={{ height: 100 }}>
      <span className="loading loading-spinner loading-lg primary-text"></span>
    </div>
  ) : (
    <div>
      <div
        className="cancellation-policy"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </div>
  );
};

export default PolicyDetail;
