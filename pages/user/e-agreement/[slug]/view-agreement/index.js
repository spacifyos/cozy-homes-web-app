import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useMemo, useRef, useState } from "react";
import CustomImage from "@/components/CustomImage";
import Helper from "@/src/utils/Helper";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { get, isEmpty, size } from "lodash";
import Toast from "@/src/utils/Toast";
import * as agreementSelector from "@/src/selectors/agreement";
import axios from "axios";
import AuthManager from "@/src/utils/AuthManager";
import AuthWrapper from "@/components/AuthWrapper";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopPinNumberInfoModal from "@/components/EAgreement/DesktopPinNumberInfoModal";
import DesktopPinModal from "@/components/EAgreement/DesktopPinModal";
import DesktopCanvasModel from "@/components/EAgreement/DesktopCanvasModel";

export { getServerSideProps };

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ViewAgreement = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  let pdfPageRef;
  let DesktopCanvasRef;

  const [readAgree, setReadAgree] = useState(false);
  const [readSign, setReadSign] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfPageHeight, setPdfPageHeight] = useState(450);

  const [loading, setLoading] = useState(false);
  const [agreeLoading, setAgreeLoading] = useState(false);
  const [signLoading, setSignLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [data, setData] = useState(null);

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
  const hasPinNumber = agreementSelector.hasPinNumber(data);
  const referenceNumber = agreementSelector.getReferenceNumber(data);
  const isOwnerAgreement = agreementSelector.getIsOwnerAgreement(data);

  useEffect(() => {
    fetchAgreementPdf();
    handlePdfSecretData();
  }, []);

  const onPageLoadSuccess = () => {
    if (pdfPageHeight === 450) {
      setPdfPageHeight(pdfPageRef && pdfPageRef.clientHeight);
    }
  };

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

        if (!isEmpty(resUrl) && !downloading) {
          await apiRequest
            .downloadFileRequest(resUrl, headers, referenceNumber)
            .catch((error) => {
              Toast.error(error);
            })
            .finally(() => setDownloading(false));
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
    if (pageNumber !== totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const onClickPrevious = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const onClickHandlePdf = async (responsive) => {
    if (isCanAgree) {
      if (!readAgree) {
        return Toast.error("Please check the understood and agree term.");
      }

      await handleAgreeAgreement();
    } else if (isCanSign) {
      if (isOwnerAgreement) {
        handleOpenSignatureModal(responsive);
      } else {
        if (hasPinNumber) {
          handleOpenSignatureModal(responsive);
        } else {
          handleOpenPinNumberInfoModal(responsive);
        }
      }
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

  const handleOpenSignatureModal = (responsive) => {
    Helper.documentGetElementById(`${responsive}_signature_modal`).showModal();
  };

  const handlePdfSecretData = async () => {
    await apiRequest.getRootDataRequest(setLoading, getRootDataSuccessCallback);
  };

  const getRootDataSuccessCallback = (res) => {
    const chiper1 = get(res, ["chiper1"], "");
    const chiper2 = get(res, ["chiper2"], "");

    setGallerySecretKey(Helper.generateSecretKey(chiper1, chiper2));
  };

  const onClickCloseSignatureModal = (responsive) => {
    Helper.documentGetElementById(`${responsive}_signature_modal`).close();
  };

  const onClickSubmitSignature = async (responsive) => {
    if (DesktopCanvasRef.isEmpty()) {
      setSignatureEmptyMessage("Signature is required");
      return;
    }

    if (!readSign) {
      return Toast.error("Please check the understood and agree term.");
    }

    if (isOwnerAgreement) {
      await signAgreementAction(responsive);

      onClickCloseSignatureModal(responsive);
    } else {
      openPinModal(responsive);
    }
  };

  const handleOpenPinModal = (responsive) => {
    Helper.documentGetElementById(`${responsive}_pin_modal`).showModal();
  };

  const handleClosePinModal = (responsive) => {
    Helper.documentGetElementById(`${responsive}_pin_modal`).close();
  };

  const onClickClosePinModal = (responsive) => {
    handleClosePinModal(responsive);
    handleOpenSignatureModal(responsive);
  };

  const openPinModal = (responsive) => {
    onClickCloseSignatureModal(responsive);
    handleOpenPinModal(responsive);
  };

  const handleSignAgreement = async (responsive) => {
    if (isEmpty(pinNumberValue)) {
      setErrorMessage("Pin number is required.");
      return;
    }

    handleClosePinModal(responsive);

    await signAgreementAction(responsive);
  };

  const signAgreementAction = async (responsive) => {
    const postData = {
      pin_number: pinNumberValue,
      signature: DesktopCanvasRef.toDataURL("image/png"),
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
    DesktopCanvasRef.clear();
  };

  const handleDesktopSignatureRef = (ref) => {
    DesktopCanvasRef = ref;
  };

  const onChangePinNumberValue = (e) => {
    if (size(e.target.value) <= 6) {
      setPinNumberValue(e.target.value);
    }
  };

  const errorRender = () => {
    return (
      <div
        className="bg-white w-full h-3 flex justify-center items-center"
        style={{ height: pdfPageHeight }}
      >
        <CustomText>This pdf cannot be found!</CustomText>
      </div>
    );
  };

  const noDataRender = () => {
    return (
      <div
        className="bg-white w-full h-3 flex justify-center items-center"
        style={{ height: pdfPageHeight }}
      >
        <CustomText>No page specified.</CustomText>
      </div>
    );
  };

  const loadingRender = () => {
    return (
      <div
        className="bg-white w-full h-3 flex justify-center items-center"
        style={{ height: pdfPageHeight }}
      >
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  };

  const opt = useMemo(() => {
    return {
      httpHeaders: { AGSC: gallerySecretKey },
      cMapUrl: "/bcmaps/",
      cMapPacked: true,
    };
  }, [gallerySecretKey]);

  const onClickToSetPinNumber = () => {
    router.push({
      pathname: "/user/account",
    });
  };

  const onClickClosePinNumberInfoModal = (responsive) => {
    Helper.documentGetElementById(
      `${responsive}_pin_number_info_modal`,
    ).close();
  };

  const handleOpenPinNumberInfoModal = (responsive) => {
    Helper.documentGetElementById(
      `${responsive}_pin_number_info_modal`,
    ).showModal();
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="My E-Agreement Document - CozyHomes" />

      <DesktopLayout
        hideFooter
        loading={loading || agreeLoading || signLoading || downloading}
        onClickRightButton={downloadPdf}
        rightButtonIcon={Images.downloadIconBlack}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/user/e-agreement"}>
                    <CustomText textClassName="text-base text-disable">
                      My E-Agreement
                    </CustomText>
                  </a>
                </li>
                <li>
                  <a href={`/user/e-agreement/${id}`}>
                    <CustomText textClassName="text-base text-disable">
                      {referenceNumber}
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base">
                    View Agreement
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIconBlack}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">View Agreement</CustomText>
            </div>
          </div>
        }
      >
        <div className="">
          <div
            className="global-border-radius p-10 px-20 flex flex-col justify-center items-center"
            style={{ backgroundColor: "#505050" }}
          >
            <Document
              renderMode="canvas"
              file={isEmpty(pdf) ? "" : pdf}
              options={opt}
              onLoadSuccess={({ numPages }) => {
                setTotalPages(numPages);
                setIsDocumentReady(true);
              }}
              noData={noDataRender}
              loading={loadingRender}
              error={errorRender}
            >
              <Page
                inputRef={(ref) => (pdfPageRef = ref)}
                pageNumber={pageNumber}
                onLoadSuccess={() => {
                  if (pdfPageHeight === 450) {
                    setPdfPageHeight(pdfPageRef && pdfPageRef.clientHeight);
                  }
                }}
                loading={loadingRender}
                error={errorRender}
                noData={noDataRender}
              />
            </Document>

            <div className="flex flex-col items-center pt-5">
              <CustomText textClassName="text-white text-sm py-2">
                Page {pageNumber} of {totalPages}
              </CustomText>

              <div className="flex gap-2 pt-2">
                <CustomButton
                  buttonText={"Previous"}
                  buttonClassName={`btn-md w-32 ${pageNumber !== 1 && isDocumentReady ? "btn-white" : "btn-black"}`}
                  onClick={onClickPrevious}
                  disable={!isDocumentReady}
                />
                <CustomButton
                  buttonText={"Next"}
                  buttonClassName={`btn-md w-32 ${pageNumber !== totalPages && isDocumentReady ? "btn-white" : "btn-black"}`}
                  onClick={onClickNext}
                  disable={!isDocumentReady}
                />
              </div>
            </div>
          </div>

          {isCanAgree ? (
            <div className="flex items-start gap-2 pt-8">
              <div style={{ width: 23 }} onClick={onClickReadAgree}>
                <CustomImage
                  className="cursor-pointer"
                  src={
                    readAgree ? Images.checkIconAqua : Images.uncheckIconWhite
                  }
                  imageStyle={{ width: 23 }}
                />
              </div>
              <CustomText textClassName="text-sm text-justify leading-4">
                I,{" "}
                <span className="text-primary">{`${tenantName} ${tenantIc}`}</span>
                , hereby acknowledge and confirm that I have read, understood
                and agree to the terms and conditions of the agreement appearing
                and irrevocably agree to be bound by the terms and conditions
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
                buttonClassName="btn-primary-outline"
                onClick={onClickGoBack}
              />
              <CustomButton
                buttonText={isCanAgree ? "Agree" : isCanSign ? "Sign" : "View"}
                buttonClassName="btn-primary"
                onClick={() => onClickHandlePdf("desktop")}
              />
            </div>
          )}
        </div>

        <DesktopPinNumberInfoModal
          onClickToSetPinNumber={onClickToSetPinNumber}
          onClickCloseModal={onClickClosePinNumberInfoModal}
        />

        <DesktopPinModal
          onClickSubmitSignature={handleSignAgreement}
          onClickClosePinModal={onClickClosePinModal}
          pinNumberValue={pinNumberValue}
          onChangePinNumberValue={onChangePinNumberValue}
          errorMessage={errorMessage}
        />

        <DesktopCanvasModel
          onClickReadSign={onClickReadSign}
          readSign={readSign}
          onClickCloseSignatureModal={onClickCloseSignatureModal}
          onClickSubmitSignature={onClickSubmitSignature}
          handleDesktopSignatureRef={handleDesktopSignatureRef}
          onClickResetCanvas={onClickResetCanvas}
          signatureEmptyMessage={signatureEmptyMessage}
        />
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(ViewAgreement));
