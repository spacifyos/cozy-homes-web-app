import CustomModal from "@/components/CustomModal";
import CustomText from "@/components/CustomText";
import SignatureCanvas from "react-signature-canvas";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import { useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash";

const CanvasModal = ({
  onClickReadSign,
  readSign,
  t,
  onClickCloseSignatureModal,
  onClickSubmitSignature,
  onClickResetCanvas,
  handleSignatureRef,
  signatureEmptyMessage,
}) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState(0);

  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef]);

  return (
    <CustomModal id="mobile_signature_modal" disableClose>
      <CustomText textClassName="font-bold text-base pb-5">
        {t("viewAgreement.pleaseSignBelow")}
      </CustomText>
      <div
        className="flex justify-end cursor-pointer"
        onClick={onClickResetCanvas}
      >
        <CustomText textClassName="text-primary text-sm pb-2">
          {t("viewAgreement.reset")}
        </CustomText>
      </div>
      <div
        className="bg-white global-border-radius global-box-shadow"
        ref={targetRef}
      >
        <SignatureCanvas
          ref={handleSignatureRef}
          backgroundColor="rgba(255,255,255,255)"
          canvasProps={{
            width: dimensions,
            height: 200,
            backgroundColor: "white",
          }}
        />
      </div>

      {!isEmpty(signatureEmptyMessage) ? (
        <CustomText textClassName="error-message pt-2">
          * {signatureEmptyMessage}
        </CustomText>
      ) : (
        false
      )}

      <div className="flex items-start gap-2 pt-5 py-10">
        <div style={{ width: 23 }} onClick={onClickReadSign}>
          <CustomImage
            className="cursor-pointer"
            src={readSign ? Images.checkGreenIcon : Images.uncheckIcon}
            imageStyle={{ width: 23 }}
          />
        </div>

        <CustomText textClassName="text-sm text-justify leading-4">
          The parties agreed that this agreement may be electronically signed.
          The parties agree that the electronic signatures appearing on this
          agreement are the same as handwritten signature for the purpose of
          validity, enforceability and admissibility.
        </CustomText>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <CustomButton
          buttonText={"Cancel"}
          buttonClassName="btn-primary-outline"
          onClick={() => onClickCloseSignatureModal("mobile")}
        />
        <CustomButton
          buttonText={t("viewAgreement.sign")}
          buttonClassName="btn-primary"
          onClick={() => onClickSubmitSignature("mobile")}
        />
      </div>
    </CustomModal>
  );
};

export default CanvasModal;
