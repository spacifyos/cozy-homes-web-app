import CustomHeader from "@/components/CustomHeader";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";
import CustomImage from "@/components/CustomImage";
import Constant from "@/src/utils/Constant";
import _ from "lodash";

export { getServerSideProps };

const ViewAgreement = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [read, setRead] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.js",
      import.meta.url,
    ).toString();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickRead = () => {
    setRead(!read);
  };

  const onClickNext = () => {
    if (pageNumber !== numPages) setPageNumber(pageNumber + 1);
  };

  const onClickPrevious = () => {
    if (pageNumber !== 1) setPageNumber(pageNumber - 1);
  };

  return (
    <CustomHeader
      onClickGoBack={onClickGoBack}
      pageTitle={"View Agreement"}
      hideBgImage
      rightButtonIcon={Images.downloadIcon}
    >
      <div className="body-container pb-4">
        <div
          className="global-border-radius p-5 flex flex-col justify-center items-center"
          style={{ backgroundColor: "#505050" }}
        >
          <Document
            file={Constant.DEFAULT_PDF}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(err) => console.log(err)}
            loading={
              <div
                className="primaryWhite-bg-color w-full h-3 flex justify-center items-center"
                style={{ height: 450 }}
              >
                <span className="loading loading-spinner loading-lg primary-text"></span>
              </div>
            }
            error={
              <div
                className="primaryWhite-bg-color w-full h-3 flex justify-center items-center"
                style={{ height: 450 }}
              >
                <CustomText>This pdf cannot be found!</CustomText>
              </div>
            }
          >
            <Page pageNumber={pageNumber} />
          </Document>

          <CustomText textClassName="white-text font-size-xsmall pt-2">
            Page {pageNumber} of {numPages}
          </CustomText>

          <div className="flex gap-2 pt-2">
            <CustomButton
              buttonText="Previous"
              buttonClassName={`btn-sm ${pageNumber !== 1 ? "pdf-next-btn" : "pdf-previous-btn"}`}
              onClick={onClickPrevious}
            />
            <CustomButton
              buttonText="Next"
              buttonClassName={`btn-sm ${pageNumber !== numPages ? "pdf-next-btn" : "pdf-previous-btn"}`}
              onClick={onClickNext}
            />
          </div>
        </div>

        <div className="flex items-start gap-2 pt-5">
          <CustomImage
            src={read ? Images.checkGreenIcon : Images.uncheckIcon}
            height={23}
            width={23}
            onClick={onClickRead}
          />
          <CustomText textClassName="font-size-small text-justify leading-4">
            I, <span className="primary-text">Demo (NRIC: 10920192)</span>,
            hereby acknowledge and confirm that I have read, understood and
            agree to the terms and conditions of the agreement appearing and
            irrevocably agree to be bound by the terms and conditions contained
            therein.
          </CustomText>
        </div>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(ViewAgreement);
