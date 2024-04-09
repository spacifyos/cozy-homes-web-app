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
import _ from "lodash";
import SignatureCanvas from "react-signature-canvas";
import CustomInput from "@/components/CustomInput";

export { getServerSideProps };

const ViewAgreement = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const targetRef = useRef();
  let canvasRef;

  const [readAgree, setReadAgree] = useState(false);
  const [readSign, setReadSign] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [dimensions, setDimensions] = useState(0);

  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef]);

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

  const onClickResetCanvas = () => {
    canvasRef.clear();
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

        {/*<div className="">*/}
        {/*  <CustomText textClassName="font-bold">Please Sign Below</CustomText>*/}
        {/*  <div*/}
        {/*    className="flex justify-end cursor-pointer"*/}
        {/*    onClick={onClickResetCanvas}*/}
        {/*  >*/}
        {/*    <CustomText textClassName="primary-text">Reset</CustomText>*/}
        {/*  </div>*/}
        {/*  <div*/}
        {/*    className="primaryWhite-bg-color global-border-radius "*/}
        {/*    ref={targetRef}*/}
        {/*  >*/}
        {/*    <SignatureCanvas*/}
        {/*      ref={(ref) => (canvasRef = ref)}*/}
        {/*      backgroundColor="rgba(255,255,255,255)"*/}
        {/*      canvasProps={{*/}
        {/*        width: dimensions,*/}
        {/*        height: 200,*/}
        {/*        backgroundColor: "white",*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </div>*/}

          {/*<div className="flex items-start gap-2 pt-5 py-10">*/}
          {/*  <CustomImage*/}
          {/*    src={readSign ? Images.checkGreenIcon : Images.uncheckIcon}*/}
          {/*    height={23}*/}
          {/*    width={23}*/}
          {/*    onClick={onClickReadSign}*/}
          {/*  />*/}
          {/*  <CustomText textClassName="font-size-small text-justify leading-4">*/}
          {/*    The parties agreed that this agreement may be electronically*/}
          {/*    signed. The parties agree that the electronic signatures appearing*/}
          {/*    on this agreement are the same as handwritten signature for the*/}
          {/*    purpose of validity, enforceability and admissibility.*/}
          {/*  </CustomText>*/}
          {/*</div>*/}

          {/*<div className="grid grid-cols-2 gap-2">*/}
          {/*  <CustomButton*/}
          {/*    buttonText="Reject"*/}
          {/*    buttonClassName="default-btn-outline"*/}
          {/*  />*/}
          {/*  <CustomButton*/}
          {/*    buttonText="Submit Signature"*/}
          {/*    buttonClassName="primary-btn"*/}
          {/*  />*/}
          {/*</div>*/}
        {/*</div>*/}

        {/*<div className="">*/}
        {/*  <CustomText textClassName="font-bold pb-5">Insert Pin Number</CustomText>*/}

        {/*  <CustomInput label="Pin Number" required labelClassName="font-bold" placeholder="Enter the 6-digit pin number" />*/}

        {/*  <div className="grid grid-cols-2 gap-2 pt-10">*/}
        {/*    <CustomButton*/}
        {/*        buttonText="Cancel"*/}
        {/*        buttonClassName="default-btn-outline"*/}
        {/*    />*/}
        {/*    <CustomButton*/}
        {/*        buttonText="Submit"*/}
        {/*        buttonClassName="primary-btn"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(ViewAgreement);
