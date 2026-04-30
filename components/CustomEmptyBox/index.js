import CustomText from "@/components/CustomText";
import {
  EmptyBoxIllustration,
  EmptyHouseIllustration,
  EmptyReceiptIllustration,
  EmptyChatIllustration,
  EmptyTicketIllustration,
  EmptyMeterIllustration,
} from "@/components/Icons";

const VARIANT_MAP = {
  default: EmptyBoxIllustration,
  house: EmptyHouseIllustration,
  property: EmptyHouseIllustration,
  room: EmptyHouseIllustration,
  receipt: EmptyReceiptIllustration,
  statement: EmptyReceiptIllustration,
  invoice: EmptyReceiptIllustration,
  transaction: EmptyReceiptIllustration,
  chat: EmptyChatIllustration,
  comment: EmptyChatIllustration,
  ticket: EmptyTicketIllustration,
  meter: EmptyMeterIllustration,
};

const CustomEmptyBox = ({
  textColor,
  emptyImage,
  emptyTitle = "Nothing here yet",
  emptyDesc = "Check back soon — we'll let you know when something turns up.",
  variant = "default",
}) => {
  const VariantIllustration = VARIANT_MAP[variant] || EmptyBoxIllustration;
  const Illustration = emptyImage || VariantIllustration;
  const isWhite = textColor === "#FFFFFF" || textColor === "#ffffff";
  const colorClass = isWhite ? "text-white" : "text-primary";
  const titleClass = isWhite ? "text-white" : "text-black";
  const descClass = isWhite ? "text-white opacity-80" : "text-disable";

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
      <div
        className={`flex items-center justify-center rounded-full mb-4 ${
          isWhite ? "bg-white/10" : "bg-primary-background"
        }`}
        style={{ width: 96, height: 96 }}
      >
        {typeof Illustration === "function" ? (
          <Illustration size={56} className={colorClass} />
        ) : (
          Illustration
        )}
      </div>

      <CustomText
        textClassName={`xl:text-base lg:text-base md:text-base sm:text-sm text-sm font-bold pb-1 ${titleClass}`}
        styles={textColor ? { color: textColor } : undefined}
      >
        {emptyTitle}
      </CustomText>

      <CustomText
        textClassName={`xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs leading-relaxed max-w-xs ${descClass}`}
        styles={textColor ? { color: textColor } : undefined}
      >
        {emptyDesc}
      </CustomText>
    </div>
  );
};

export default CustomEmptyBox;
