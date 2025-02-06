import CustomText from "@/components/CustomText";
import SignatureCanvas from "react-signature-canvas";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import { useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash";
import DesktopModal from "@/components/DesktopModal";

const DesktopCanvasModal = ({
  onClickReadSign,
  readSign,
  onClickCloseSignatureModal,
  onClickSubmitSignature,
  onClickResetCanvas,
  handleDesktopSignatureRef,
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
    <DesktopModal id="desktop_signature_modal" disableClose>
      <div className="p-6">
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center text-base font-bold">
            Please Sign Below
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
              <CustomImage
                className="xl:w-4 lg:w-4 md:w-4 sm:w-3 w-3"
                src={Images.cancelIcon}
              />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <div
          className="flex justify-end cursor-pointer"
          onClick={onClickResetCanvas}
        >
          <CustomText textClassName="text-primary text-sm pb-2">
            Reset
          </CustomText>
        </div>
        <div
          className="bg-primary-background global-border-radius global-box-shadow"
          ref={targetRef}
        >
          <SignatureCanvas
            ref={handleDesktopSignatureRef}
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
            onClick={() => onClickCloseSignatureModal("desktop")}
          />
          <CustomButton
            buttonText="Sign"
            buttonClassName="btn-primary"
            onClick={() => onClickSubmitSignature("desktop")}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopCanvasModal;
