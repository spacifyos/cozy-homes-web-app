import CustomHeader from "@/components/CustomHeader";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { useEffect, useRef, useState } from "react";
import CustomImage from "@/components/CustomImage";
import Constant from "@/src/utils/Constant";
import PinModal from "@/components/EAgreement/PinModal";
import CanvasModal from "@/components/EAgreement/CanvasModal";
import Helper from "@/src/utils/Helper";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import { get, isEmpty } from "lodash";

export { getServerSideProps };

const ViewAgreement = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [readAgree, setReadAgree] = useState(false);
  const [readSign, setReadSign] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [pdf, setPdf] = useState("");

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.js",
      import.meta.url,
    ).toString();
  }, []);

  useEffect(() => {
    fetchAgreementPdf();
  }, []);

  const fetchAgreementPdf = async () => {
    await apiRequest.getAgreementPdf(id, setLoading, getAgreementPdfSuccess);
  };

  const getAgreementPdfSuccess = (res) => {
    const url = get(res, ["url"], "");

    if (!isEmpty(url)) {
      setPdf(url);
    }
  };

  const downloadPdf = async () => {
    await apiRequest.getAgreementDownload(
      id,
      setDownloading,
      downloadSuccessCallback,
    );
  };

  const downloadSuccessCallback = (res) => {
    const url = get(res, ["url"], "");

    if (!isEmpty(url)) {
      window.open(url);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickReadAgree = () => {
    setReadAgree(!readAgree);
  };

  const onClickReadSign = () => {
    setReadSign(!readSign);
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
      pageTitle={t("pageTitle.viewAgreement")}
      hideBgImage
      rightButtonIcon={Images.downloadIcon}
      onClickRightButton={downloadPdf}
    >
      <div className="body-container pb-4">
        <div
          className="global-border-radius p-5 flex flex-col justify-center items-center"
          style={{ backgroundColor: "#505050" }}
        >
          <Document
            file={isEmpty(pdf) ? "" : { url: pdf }}
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
            {t("viewAgreement.page")} {pageNumber} of {numPages}
          </CustomText>

          <div className="flex gap-2 pt-2">
            <CustomButton
              buttonText={t("viewAgreement.previous")}
              buttonClassName={`btn-sm ${pageNumber !== 1 ? "pdf-next-btn" : "pdf-previous-btn"}`}
              onClick={onClickPrevious}
            />
            <CustomButton
              buttonText={t("viewAgreement.next")}
              buttonClassName={`btn-sm ${pageNumber !== numPages ? "pdf-next-btn" : "pdf-previous-btn"}`}
              onClick={onClickNext}
            />
          </div>
        </div>

        <div className="flex items-start gap-2 pt-5">
          <CustomImage
            src={readAgree ? Images.checkGreenIcon : Images.uncheckIcon}
            height={23}
            width={23}
            onClick={onClickReadAgree}
          />
          <CustomText textClassName="font-size-small text-justify leading-4">
            I, <span className="primary-text">Demo (NRIC: 10920192)</span>,
            hereby acknowledge and confirm that I have read, understood and
            agree to the terms and conditions of the agreement appearing and
            irrevocably agree to be bound by the terms and conditions contained
            therein.
          </CustomText>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-5 ">
          <CustomButton
            buttonText={t("viewAgreement.reject")}
            buttonClassName="default-btn-outline"
          />
          <CustomButton
            buttonText={t("viewAgreement.agree")}
            buttonClassName="primary-btn"
            onClick={() =>
              Helper.documentGetElementById("pin_modal").showModal()
            }
          />
        </div>

        <LoadingOverlay loading={loading} />
      </div>

      <CanvasModal
        onClickReadSign={onClickReadSign}
        readSign={readSign}
        t={t}
      />

      <PinModal t={t} />
    </CustomHeader>
  );
};

export default withTranslation("common")(ViewAgreement);
