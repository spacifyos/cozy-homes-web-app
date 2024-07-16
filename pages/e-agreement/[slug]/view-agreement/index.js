import CustomHeader from "@/components/CustomHeader";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";
import CustomImage from "@/components/CustomImage";
import Constant from "@/src/utils/Constant";
import PinModal from "@/components/EAgreement/PinModal";
import CanvasModal from "@/components/EAgreement/CanvasModal";
import Helper from "@/src/utils/Helper";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import { get, isEmpty, isEqual, size } from "lodash";
import Toast from "@/src/utils/Toast";
import * as agreementSelector from "@/src/selectors/agreement";
import axios from "axios";
import { detect } from "detect-browser-es";
import AuthManager from "@/src/utils/AuthManager";

export { getServerSideProps };

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const ViewAgreement = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  let canvasRef;

  const [readAgree, setReadAgree] = useState(false);
  const [readSign, setReadSign] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(false);
  const [agreeLoading, setAgreeLoading] = useState(false);
  const [signLoading, setSignLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [data, setData] = useState(null);

  const [rootDataLoading, setRootDataLoading] = useState(false);
  const [gallerySecretKey, setGallerySecretKey] = useState("");
  const [pinNumberValue, setPinNumberValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signatureEmptyMessage, setSignatureEmptyMessage] = useState("");
  const [isDocumentReady, setIsDocumentReady] = useState(false);

  const pdf = agreementSelector.getUrl(data);
  const isCanAgree = agreementSelector.isCanAgree(data);
  const isCanSign = agreementSelector.isCanSign(data);
  const tenantName = agreementSelector.getTenantName(data);
  const tenantIc = agreementSelector.getTenantIc(data);

  useEffect(() => {
    fetchAgreementPdf();
    handlePdfSecretData();
  }, []);

  const fetchAgreementPdf = async () => {
    await apiRequest.getAgreementPdf(id, setLoading, getAgreementPdfSuccess);
  };

  const getAgreementPdfSuccess = async (res) => {
    if (!isEmpty(res)) {
      setData(res);
    }
  };

  const downloadPdf = async () => {
    setDownloading(true);

    const url = `${process.env.API_DOMAIN}/agreement/${id}/pdf`;
    const headers = {
      "Content-Type": "application/json",
      AGSC: gallerySecretKey,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const resUrl = get(response, ["data", "data", "url"], "");

        if (!isEmpty(resUrl)) {
          await apiRequest.downloadFileRequest(resUrl, headers);
          // window.open(
          //   resUrl,
          //   `${isEqual(detect().name, "safari") ? "_self" : "_blank"}`,
          // );
        }
      })
      .catch((error) => {
        Toast.error("Download document failed");
      })
      .finally(() => setDownloading(false));
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
    if (pageNumber !== totalPages) setPageNumber(pageNumber + 1);
  };

  const onClickPrevious = () => {
    if (pageNumber !== 1) setPageNumber(pageNumber - 1);
  };

  const onClickHandlePdf = async () => {
    if (isCanAgree) {
      if (!readAgree) {
        return Toast.error("Please check the understood and agree term.");
      }

      await handleAgreeAgreement();
    } else if (isCanSign) {
      handleOpenSignatureModal();
    }
  };

  const handleAgreeAgreement = async () => {
    await apiRequest.postAgreeAgreement(
      id,
      setAgreeLoading,
      agreeSuccessCallback,
    );
  };

  const agreeSuccessCallback = async () => {
    await fetchAgreementPdf();
  };

  const handleOpenSignatureModal = () => {
    Helper.documentGetElementById("canvas_modal").showModal();
  };

  const handlePdfSecretData = async () => {
    await apiRequest.getRootDataRequest(
      setRootDataLoading,
      getRootDataSuccessCallback,
    );
  };

  const getRootDataSuccessCallback = (res) => {
    const chiper1 = get(res, ["chiper1"], "");
    const chiper2 = get(res, ["chiper2"], "");

    setGallerySecretKey(Helper.generateSecretKey(chiper1, chiper2));
  };

  const onClickCloseSignatureModal = () => {
    Helper.documentGetElementById("canvas_modal").close();
  };

  const onClickSubmitSignature = () => {
    if (canvasRef.isEmpty()) {
      setSignatureEmptyMessage("Signature is required");
      return;
    }

    if (!readSign) {
      return Toast.error("Please check the understood and agree term.");
    }

    openPinModal();
  };

  const handleOpenPinModal = () => {
    Helper.documentGetElementById("pin_modal").showModal();
  };

  const handleClosePinModal = () => {
    Helper.documentGetElementById("pin_modal").close();
  };

  const onClickClosePinModal = () => {
    handleClosePinModal();
    handleOpenSignatureModal();
  };

  const openPinModal = () => {
    onClickCloseSignatureModal();
    handleOpenPinModal();
  };

  const handleSignAgreement = async () => {
    if (isEmpty(pinNumberValue)) {
      setErrorMessage("Pin number is required.");
      return;
    }

    handleClosePinModal();

    const postData = {
      pin_number: pinNumberValue,
      signature: canvasRef.toDataURL("image/png"),
    };

    await apiRequest.postSignAgreement(
      id,
      postData,
      setSignLoading,
      signSuccessCallback,
    );
  };

  const signSuccessCallback = async () => {
    setPinNumberValue("");
    await fetchAgreementPdf();
  };

  const onClickResetCanvas = () => {
    canvasRef.clear();
  };

  const handleSignatureRef = (ref) => {
    canvasRef = ref;
  };

  const onChangePinNumberValue = (e) => {
    if (size(e.target.value) <= 6) {
      setPinNumberValue(e.target.value);
    }
  };

  const errorRender = () => {
    return (
      <div
        className="primaryWhite-bg-color w-full h-3 flex justify-center items-center"
        style={{ height: 450 }}
      >
        <CustomText>This pdf cannot be found!</CustomText>
      </div>
    );
  };

  const noDataRender = () => {
    return (
      <div
        className="primaryWhite-bg-color w-full h-3 flex justify-center items-center"
        style={{ height: 450 }}
      >
        <CustomText>No page specified.</CustomText>
      </div>
    );
  };

  const loadingRender = () => {
    return (
      <div
        className="primaryWhite-bg-color w-full h-3 flex justify-center items-center"
        style={{ height: 450 }}
      >
        <span className="loading loading-spinner loading-lg primary-text"></span>
      </div>
    );
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
            renderMode="canvas"
            file={isEmpty(pdf) ? "" : pdf}
            options={{
              httpHeaders: { AGSC: gallerySecretKey },
            }}
            onLoadSuccess={({ numPages }) => {
              setIsDocumentReady(true);
              setTotalPages(numPages);
            }}
            noData={noDataRender()}
            loading={loadingRender()}
            error={errorRender()}
          >
            {isDocumentReady ? (
              <Page
                pageNumber={pageNumber}
                loading={loadingRender()}
                error={errorRender()}
                noData={noDataRender()}
              />
            ) : (
              false
            )}
          </Document>

          {isDocumentReady ? (
            <div className="flex flex-col items-center">
              <CustomText textClassName="white-text font-size-xsmall pt-2">
                {t("viewAgreement.page")} {pageNumber} of {totalPages}
              </CustomText>

              <div className="flex gap-2 pt-2">
                <CustomButton
                  buttonText={t("viewAgreement.previous")}
                  buttonClassName={`btn-sm ${pageNumber !== 1 ? "pdf-next-btn" : "pdf-previous-btn"}`}
                  onClick={onClickPrevious}
                />
                <CustomButton
                  buttonText={t("viewAgreement.next")}
                  buttonClassName={`btn-sm ${pageNumber !== totalPages ? "pdf-next-btn" : "pdf-previous-btn"}`}
                  onClick={onClickNext}
                />
              </div>
            </div>
          ) : (
            false
          )}
        </div>

        {isCanAgree ? (
          <div className="flex items-start gap-2 pt-8">
            <CustomImage
              className="cursor-pointer"
              src={readAgree ? Images.checkGreenIcon : Images.uncheckIcon}
              height={23}
              width={23}
              onClick={onClickReadAgree}
            />
            <CustomText textClassName="font-size-small text-justify leading-4">
              I,{" "}
              <span className="primary-text">{`${tenantName} ${tenantIc}`}</span>
              , hereby acknowledge and confirm that I have read, understood and
              agree to the terms and conditions of the agreement appearing and
              irrevocably agree to be bound by the terms and conditions
              contained therein.
            </CustomText>
          </div>
        ) : (
          false
        )}

        {!isCanAgree && !isCanSign ? (
          false
        ) : (
          <div className="grid grid-cols-2 gap-2 pt-8">
            <CustomButton
              buttonText="Cancel"
              buttonClassName="default-btn-outline"
              onClick={onClickGoBack}
            />
            <CustomButton
              buttonText={isCanAgree ? "Agree" : isCanSign ? "Sign" : "View"}
              buttonClassName="primary-btn"
              onClick={onClickHandlePdf}
            />
          </div>
        )}

        <LoadingOverlay
          loading={loading || agreeLoading || signLoading || downloading}
        />
      </div>

      <CanvasModal
        onClickReadSign={onClickReadSign}
        readSign={readSign}
        t={t}
        onClickCloseSignatureModal={onClickCloseSignatureModal}
        onClickSubmitSignature={onClickSubmitSignature}
        handleSignatureRef={handleSignatureRef}
        onClickResetCanvas={onClickResetCanvas}
        signatureEmptyMessage={signatureEmptyMessage}
      />

      <PinModal
        t={t}
        onClickSubmitSignature={handleSignAgreement}
        onClickClosePinModal={onClickClosePinModal}
        pinNumberValue={pinNumberValue}
        onChangePinNumberValue={onChangePinNumberValue}
        errorMessage={errorMessage}
      />
    </CustomHeader>
  );
};

export default withTranslation("common")(ViewAgreement);
