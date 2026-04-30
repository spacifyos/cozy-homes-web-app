const baseProps = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  xmlns: "http://www.w3.org/2000/svg",
});

const makeIcon = (paths) => {
  const Icon = ({ size = 24, className = "text-primary", style }) => (
    <svg {...baseProps(size)} className={className} style={style}>
      {paths}
    </svg>
  );
  return Icon;
};

const colorFor = (name) => {
  if (/White$/.test(name)) return "text-white";
  if (/Disable$/.test(name)) return "text-disable";
  if (/Black$/.test(name)) return "text-black";
  if (/Aqua$/.test(name)) return "text-aqua";
  if (/Green$/.test(name)) return "text-available";
  return "text-primary";
};

const withDefaultColor = (BaseIcon, color) => {
  const Wrapped = ({ size, className, style }) => (
    <BaseIcon size={size} className={className ?? color} style={style} />
  );
  return Wrapped;
};

// Base SVG components — one per visual concept
export const HomeIcon = makeIcon(
  <>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
  </>,
);

export const HomeFillIcon = makeIcon(
  <path
    d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6h-4v6H6a1 1 0 0 1-1-1V11z"
    fill="currentColor"
  />,
);

export const AccountIcon = makeIcon(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </>,
);

export const AccountFillIcon = makeIcon(
  <>
    <circle cx="12" cy="8" r="4" fill="currentColor" />
    <path
      d="M4 21c0-4 4-6 8-6s8 2 8 6"
      fill="currentColor"
      stroke="currentColor"
    />
  </>,
);

export const InvoiceIcon = makeIcon(
  <>
    <path d="M6 3h9l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v6h6" />
    <path d="M9 13h7" />
    <path d="M9 17h7" />
  </>,
);

export const AgreementIcon = makeIcon(
  <>
    <path d="M6 3h9l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v6h6" />
    <path d="M9 15c1.5-1.5 3-3 4.5-3s1 2 2.5 2 1.5-1 2-1" />
  </>,
);

export const MeterIcon = makeIcon(
  <>
    <path d="M4 14a8 8 0 0 1 16 0" />
    <path d="M4 14h16" />
    <path d="M12 14l4-4" />
    <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
  </>,
);

export const ReportIcon = makeIcon(
  <>
    <path d="M4 20V8" />
    <path d="M10 20V4" />
    <path d="M16 20v-9" />
    <path d="M22 20v-6" />
    <path d="M3 20h20" />
  </>,
);

export const LockIcon = makeIcon(
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
  </>,
);

export const ListIcon = makeIcon(
  <>
    <path d="M8 6h12" />
    <path d="M8 12h12" />
    <path d="M8 18h12" />
    <circle cx="4" cy="6" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="4" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="4" cy="18" r="1.2" fill="currentColor" stroke="none" />
  </>,
);

export const LogoutIcon = makeIcon(
  <>
    <path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" />
    <path d="M10 8l-4 4 4 4" />
    <path d="M6 12h10" />
  </>,
);

export const ChevronRightIcon = makeIcon(<path d="M9 6l6 6-6 6" />);
export const ChevronLeftIcon = makeIcon(<path d="M15 6l-6 6 6 6" />);
export const ChevronUpIcon = makeIcon(<path d="M6 15l6-6 6 6" />);
export const ChevronDownIcon = makeIcon(<path d="M6 9l6 6 6-6" />);

export const HelpCenterIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
    <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
  </>,
);

export const QrIcon = makeIcon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3z" />
    <path d="M20 14v3" />
    <path d="M14 20h3" />
    <path d="M20 20h1" />
  </>,
);

export const SmartLockIcon = makeIcon(
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    <path d="M10 16h4" />
    <path d="M12 14v4" />
  </>,
);

export const TopUpIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10" />
    <path d="M7 12h10" />
  </>,
);

export const PlusIcon = TopUpIcon;

export const ClearIcon = makeIcon(
  <>
    <path d="M5 7h14" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    <path d="M7 7l1 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-12" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </>,
);

export const DeleteIcon = ClearIcon;

export const UsageIcon = makeIcon(
  <>
    <path d="M3 17l5-6 4 4 4-6 5 7" />
    <path d="M3 21h18" />
  </>,
);

export const DisconnectIcon = makeIcon(
  <>
    <path d="M9 4v4" />
    <path d="M15 4v4" />
    <path d="M7 8h10v3a5 5 0 0 1-10 0z" />
    <path d="M12 16v4" />
    <path d="M8 20h8" />
  </>,
);

export const WhatsappIcon = makeIcon(
  <>
    <path d="M20 12a8 8 0 1 1-3.2-6.4L20 4l-1.4 3.4A8 8 0 0 1 20 12z" />
    <path d="M9 9c0 4 2 6 6 6l1.5-1.5-2-1-1 1c-1 0-2-1-2-2l1-1-1-2L10 7C9.5 7.5 9 8 9 9z" />
  </>,
);

export const ChatIcon = makeIcon(
  <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z" />,
);

export const TermIcon = makeIcon(
  <>
    <path d="M6 3h12a1 1 0 0 1 1 1v17l-3-2-2 2-2-2-2 2-2-2-3 2V4a1 1 0 0 1 1-1z" />
    <path d="M9 8h6" />
    <path d="M9 12h6" />
    <path d="M9 16h4" />
  </>,
);

export const RenoExpertIcon = makeIcon(
  <>
    <path d="M14 3l7 7-3 3-7-7z" />
    <path d="M11 6l-7 7v5h5l7-7" />
  </>,
);

export const PlusCircleIcon = TopUpIcon;
export const AddIcon = makeIcon(
  <>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </>,
);

export const EditIcon = makeIcon(
  <>
    <path d="M16 3l5 5-12 12H4v-5z" />
    <path d="M14 5l5 5" />
  </>,
);

export const CalendarIcon = makeIcon(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
  </>,
);

export const ClockIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);

export const CloseIcon = makeIcon(
  <>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </>,
);

export const CheckIcon = makeIcon(<path d="M5 12l5 5 9-11" />);

export const UncheckIcon = makeIcon(<circle cx="12" cy="12" r="9" />);

export const InfoIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h0" />
    <path d="M12 11v6" />
  </>,
);

export const AlertIcon = makeIcon(
  <>
    <path d="M12 3l10 17H2z" />
    <path d="M12 10v4" />
    <path d="M12 17h0" />
  </>,
);

export const DangerIcon = AlertIcon;

export const QuestionMarkIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
    <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
  </>,
);

export const SearchIcon = makeIcon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
  </>,
);

export const FilterIcon = makeIcon(
  <path d="M4 5h16l-6 8v6l-4 2v-8z" />,
);

export const RefreshIcon = makeIcon(
  <>
    <path d="M4 12a8 8 0 0 1 14-5l3-3v6h-6" />
    <path d="M20 12a8 8 0 0 1-14 5l-3 3v-6h6" />
  </>,
);

export const DownloadIcon = makeIcon(
  <>
    <path d="M12 4v12" />
    <path d="M7 11l5 5 5-5" />
    <path d="M5 20h14" />
  </>,
);

export const UploadIcon = makeIcon(
  <>
    <path d="M12 20V8" />
    <path d="M7 13l5-5 5 5" />
    <path d="M5 4h14" />
  </>,
);

export const ShareIcon = makeIcon(
  <>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M8 11l8-4" />
    <path d="M8 13l8 4" />
  </>,
);

export const MoreIcon = makeIcon(
  <>
    <circle cx="6" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="18" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </>,
);

export const BedIcon = makeIcon(
  <>
    <path d="M3 19V8" />
    <path d="M21 19v-6a3 3 0 0 0-3-3H10v6" />
    <path d="M3 13h18" />
    <path d="M3 19h18" />
    <circle cx="7" cy="11" r="1.5" />
  </>,
);

export const BathroomIcon = makeIcon(
  <>
    <path d="M4 11h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M6 11V6a2 2 0 0 1 4 0" />
    <path d="M6 18v2" />
    <path d="M18 18v2" />
  </>,
);

export const BuildingIcon = makeIcon(
  <>
    <path d="M4 21V6a1 1 0 0 1 1-1h6v16" />
    <path d="M11 21V10h8a1 1 0 0 1 1 1v10" />
    <path d="M7 9h0" />
    <path d="M7 13h0" />
    <path d="M7 17h0" />
    <path d="M15 14h0" />
    <path d="M15 18h0" />
  </>,
);

export const WindowIcon = makeIcon(
  <>
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <path d="M12 4v16" />
    <path d="M4 12h16" />
  </>,
);

export const FemaleUnitIcon = makeIcon(
  <>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v8" />
    <path d="M9 19h6" />
  </>,
);

export const RoomIcon = makeIcon(
  <>
    <rect x="4" y="6" width="16" height="13" rx="1" />
    <path d="M4 10h16" />
  </>,
);

export const CarIcon = makeIcon(
  <>
    <path d="M3 16v-3l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v3" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M5 16h14" />
  </>,
);

export const ParkingIcon = makeIcon(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 8v8" />
    <path d="M9 8h3a2 2 0 0 1 0 4H9" />
  </>,
);

export const BookingIcon = makeIcon(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
    <path d="M9 14l2 2 4-4" />
  </>,
);

export const AppointmentIcon = BookingIcon;

export const RingIcon = makeIcon(
  <>
    <path d="M6 16V11a6 6 0 0 1 12 0v5" />
    <path d="M4 16h16" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </>,
);

export const EmailIcon = makeIcon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3 7l9 7 9-7" />
  </>,
);

export const PhoneIcon = makeIcon(
  <path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
);

export const CameraIcon = makeIcon(
  <>
    <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13" r="4" />
  </>,
);

export const AlbumIcon = makeIcon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="9" r="1.5" />
    <path d="M3 17l5-5 4 4 4-3 5 4" />
  </>,
);

export const ImageIcon = AlbumIcon;

export const PlayIcon = makeIcon(
  <path d="M7 5l11 7-11 7z" fill="currentColor" />,
);

export const RightIcon = ChevronRightIcon;
export const LeftIcon = ChevronLeftIcon;
export const UpIcon = ChevronUpIcon;
export const DownIcon = ChevronDownIcon;

export const MaintenanceIcon = makeIcon(
  <>
    <path d="M14 6l4-4 3 3-4 4-3-3z" />
    <path d="M14 6L4 16v4h4L18 10" />
  </>,
);

export const ElectricalIcon = makeIcon(
  <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
);

export const PlumbingIcon = makeIcon(
  <>
    <path d="M5 5h6v4H5z" />
    <path d="M8 9v6a3 3 0 0 0 3 3h5" />
    <path d="M16 14h4v6h-4z" />
  </>,
);

export const CleaningIcon = makeIcon(
  <>
    <path d="M14 4l6 6-9 9-6-6z" />
    <path d="M3 21l4-1" />
    <path d="M9 8l5 5" />
  </>,
);

export const WashingMachineIcon = makeIcon(
  <>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <circle cx="12" cy="13" r="5" />
    <circle cx="8" cy="6" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="12" cy="6" r="0.8" fill="currentColor" stroke="none" />
  </>,
);

export const PowerIcon = makeIcon(
  <>
    <path d="M12 3v9" />
    <path d="M7 7a7 7 0 1 0 10 0" />
  </>,
);

export const BankIcon = makeIcon(
  <>
    <path d="M3 10l9-6 9 6" />
    <path d="M5 10v8" />
    <path d="M9 10v8" />
    <path d="M15 10v8" />
    <path d="M19 10v8" />
    <path d="M3 21h18" />
  </>,
);

export const CoinIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10" />
    <path d="M14 9.5c-1-1-3-1-4 0s0 2 2 2.5 3 1.5 2 2.5-3 1-4 0" />
  </>,
);

export const PaidIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12l3 3 5-6" />
  </>,
);

export const RefundIcon = makeIcon(
  <>
    <path d="M3 12a9 9 0 1 0 3-7" />
    <path d="M3 4v5h5" />
  </>,
);

export const WithdrawIcon = makeIcon(
  <>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M6 9h0" />
    <path d="M18 15h0" />
  </>,
);

export const IncomeIcon = makeIcon(
  <>
    <path d="M4 17l6-6 4 4 6-8" />
    <path d="M14 7h6v6" />
  </>,
);

export const RentalInIcon = makeIcon(
  <>
    <path d="M4 12h12" />
    <path d="M11 7l5 5-5 5" />
    <path d="M20 4v16" />
  </>,
);

export const RentalOutIcon = makeIcon(
  <>
    <path d="M20 12H8" />
    <path d="M13 7L8 12l5 5" />
    <path d="M4 4v16" />
  </>,
);

export const FeedbackIcon = makeIcon(
  <>
    <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z" />
    <path d="M9 11h6" />
  </>,
);

export const EnquiryIcon = FeedbackIcon;

export const SpaceIcon = makeIcon(
  <>
    <path d="M3 9l9-6 9 6v12H3z" />
    <path d="M9 21v-6h6v6" />
  </>,
);

export const OccupancyIcon = makeIcon(
  <>
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
    <path d="M14 14c2 0 5 1.5 5 5" />
  </>,
);

export const PromotionIcon = makeIcon(
  <>
    <path d="M3 10h6L20 3v18l-11-7H3z" />
    <path d="M14 9v6" />
  </>,
);

export const RecommendIcon = makeIcon(
  <path d="M12 3l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1z" />,
);

export const CircleIcon = makeIcon(
  <circle cx="12" cy="12" r="9" />,
);

export const EllipseIcon = makeIcon(
  <ellipse cx="12" cy="12" rx="9" ry="6" />,
);

export const SquareIcon = makeIcon(
  <rect x="4" y="4" width="16" height="16" rx="1" />,
);

export const StarOutlineIcon = makeIcon(
  <path d="M12 3l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1z" />,
);

export const StepIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12h6" />
  </>,
);

export const StepCompletedIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" fill="currentColor" />
    <path d="M8 12l3 3 5-6" stroke="white" />
  </>,
);

export const ZoomInIcon = makeIcon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
    <path d="M11 8v6" />
    <path d="M8 11h6" />
  </>,
);

export const ZoomOutIcon = makeIcon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
    <path d="M8 11h6" />
  </>,
);

export const CarParkOccupancyIcon = ParkingIcon;

export const EmptyBoxIllustration = ({ size = 96, className = "text-primary", style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <ellipse cx="60" cy="104" rx="38" ry="5" fill="currentColor" opacity="0.08" />
    <path
      d="M30 54l8-22a4 4 0 0 1 4-3h36a4 4 0 0 1 4 3l8 22"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.06"
    />
    <path
      d="M30 54h22l3 6h10l3-6h22v34a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4V54z"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path
      d="M30 54h22l3 6h10l3-6h22"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M50 38h20"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M54 46h12"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

export const EmptyHouseIllustration = ({ size = 56, className = "text-primary", style }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="104" rx="36" ry="4.5" fill="currentColor" opacity="0.08" />
    <path d="M22 58l38-32 38 32" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M30 54v40a4 4 0 0 0 4 4h52a4 4 0 0 0 4-4V54" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
    <rect x="50" y="68" width="20" height="30" stroke="currentColor" strokeWidth="2.4" fill="currentColor" fillOpacity="0.15" />
    <circle cx="65" cy="83" r="1.4" fill="currentColor" />
  </svg>
);

export const EmptyReceiptIllustration = ({ size = 56, className = "text-primary", style }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="106" rx="32" ry="4" fill="currentColor" opacity="0.08" />
    <path d="M34 18h44a3 3 0 0 1 3 3v78l-8-5-8 5-8-5-8 5-8-5-8 5V21a3 3 0 0 1 3-3z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    <path d="M44 38h24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
    <path d="M44 50h24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
    <path d="M44 62h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const EmptyChatIllustration = ({ size = 56, className = "text-primary", style }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="104" rx="34" ry="4.5" fill="currentColor" opacity="0.08" />
    <path d="M24 32a4 4 0 0 1 4-4h64a4 4 0 0 1 4 4v44a4 4 0 0 1-4 4H46l-14 12V32z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
    <circle cx="46" cy="54" r="2.2" fill="currentColor" />
    <circle cx="60" cy="54" r="2.2" fill="currentColor" />
    <circle cx="74" cy="54" r="2.2" fill="currentColor" />
  </svg>
);

export const EmptyTicketIllustration = ({ size = 56, className = "text-primary", style }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="106" rx="34" ry="4" fill="currentColor" opacity="0.08" />
    <path d="M16 46a6 6 0 0 0 0 12v18a4 4 0 0 0 4 4h80a4 4 0 0 0 4-4V58a6 6 0 0 0 0-12V28a4 4 0 0 0-4-4H20a4 4 0 0 0-4 4v18z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
    <path d="M58 32v8M58 50v8M58 68v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const NotFoundIllustration = ({ size = 240, className = "text-primary", style }) => (
  <svg width={size} height={size} viewBox="0 0 240 200" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="120" cy="180" rx="90" ry="8" fill="currentColor" opacity="0.1" />
    <path d="M60 70l60-46 60 46v90a4 4 0 0 1-4 4H64a4 4 0 0 1-4-4V70z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="currentColor" fillOpacity="0.06" />
    <path d="M50 76l70-54 70 54" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M104 164v-40h32v40" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
    <circle cx="120" cy="106" r="22" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.1" />
    <path d="M112 102l16 12M128 102l-16 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 110c4-2 8-2 12 0M198 110c4-2 8-2 12 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    <text x="50%" y="68" textAnchor="middle" fontSize="28" fontWeight="700" fill="currentColor" opacity="0.85">404</text>
  </svg>
);

export const TenantIllustration = ({ size = 80, className = "text-primary", style }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="108" rx="36" ry="4" fill="currentColor" opacity="0.12" />
    <path d="M22 64l38-30 38 30v36a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V64z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    <path d="M22 64l38-30 38 30" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
    <circle cx="60" cy="68" r="7" stroke="currentColor" strokeWidth="2.4" fill="currentColor" fillOpacity="0.18" />
    <path d="M48 92c0-7 5-12 12-12s12 5 12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="currentColor" fillOpacity="0.18" />
  </svg>
);

export const OwnerIllustration = ({ size = 80, className = "text-secondary", style }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="108" rx="38" ry="4" fill="currentColor" opacity="0.12" />
    <rect x="22" y="40" width="36" height="60" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    <rect x="58" y="22" width="42" height="78" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.16" />
    <path d="M30 54h6M44 54h6M30 70h6M44 70h6M30 86h6M44 86h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M68 36h8M84 36h8M68 50h8M84 50h8M68 64h8M84 64h8M68 78h8M84 78h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="76" cy="92" r="3" stroke="currentColor" strokeWidth="2" fill="currentColor" />
  </svg>
);

export const EyeOpenIcon = ({ size = 20, className = "text-disable", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = ({ size = 20, className = "text-disable", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.01-2.86 2.92-5.1 5.24-6.52" />
    <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 9.27 3.11 11 8a12.18 12.18 0 0 1-4.06 5.15" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const EmptyMeterIllustration = ({ size = 56, className = "text-primary", style }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="104" rx="34" ry="4.5" fill="currentColor" opacity="0.08" />
    <circle cx="60" cy="58" r="34" stroke="currentColor" strokeWidth="2.6" fill="currentColor" fillOpacity="0.08" />
    <path d="M60 58l16-12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="60" cy="58" r="3" fill="currentColor" />
    <path d="M30 64a30 30 0 0 1 60 0" stroke="currentColor" strokeWidth="2.4" opacity="0.5" />
  </svg>
);

// Mapping from existing Image keys to SVG components with appropriate default colors
export const Icons = {
  // Account / User
  accountIconActive: withDefaultColor(AccountIcon, "text-primary"),
  accountIconDisable: withDefaultColor(AccountIcon, "text-disable"),
  accountIconFillActive: withDefaultColor(AccountFillIcon, "text-primary"),
  userIcon: withDefaultColor(AccountIcon, "text-black"),
  userIconActive: withDefaultColor(AccountIcon, "text-primary"),

  // Home / Building
  homeIconActive: withDefaultColor(HomeIcon, "text-primary"),
  homeIconDisable: withDefaultColor(HomeIcon, "text-disable"),
  homeIconFillActive: withDefaultColor(HomeFillIcon, "text-primary"),
  buildingIcon: withDefaultColor(BuildingIcon, "text-black"),
  buildingIconActive: withDefaultColor(BuildingIcon, "text-primary"),
  buildingIconWhite: withDefaultColor(BuildingIcon, "text-white"),
  bedIconActive: withDefaultColor(BedIcon, "text-primary"),
  bedIconDisable: withDefaultColor(BedIcon, "text-disable"),
  bathroomIconActive: withDefaultColor(BathroomIcon, "text-primary"),
  bathroomIconDisable: withDefaultColor(BathroomIcon, "text-disable"),
  windowIcon: withDefaultColor(WindowIcon, "text-black"),
  windowIconActive: withDefaultColor(WindowIcon, "text-primary"),
  windowIconWhite: withDefaultColor(WindowIcon, "text-white"),
  femaleUnitIcon: withDefaultColor(FemaleUnitIcon, "text-primary"),
  roomAvailableIcon: withDefaultColor(RoomIcon, "text-available"),
  roomDisableIcon: withDefaultColor(RoomIcon, "text-disable"),
  roomOccupiedIcon: withDefaultColor(RoomIcon, "text-warning"),

  // Documents / Statements / Agreement
  invoiceIconActive: withDefaultColor(InvoiceIcon, "text-primary"),
  invoiceIconWhite: withDefaultColor(InvoiceIcon, "text-white"),
  agreementIconActive: withDefaultColor(AgreementIcon, "text-primary"),
  agreementIconWhite: withDefaultColor(AgreementIcon, "text-white"),
  termIconActive: withDefaultColor(TermIcon, "text-primary"),
  primaryTermAndConditionIcon: withDefaultColor(TermIcon, "text-primary"),

  // Meter / Power
  meterIcon: withDefaultColor(MeterIcon, "text-primary"),
  meterIconActive: withDefaultColor(MeterIcon, "text-primary"),
  meterIconWhite: withDefaultColor(MeterIcon, "text-white"),
  powerIconAqua: withDefaultColor(PowerIcon, "text-aqua"),
  powerIconDisable: withDefaultColor(PowerIcon, "text-disable"),
  electricalIconActive: withDefaultColor(ElectricalIcon, "text-primary"),
  electricalIconWhite: withDefaultColor(ElectricalIcon, "text-white"),

  // Reports / Charts / Income
  reportIconActive: withDefaultColor(ReportIcon, "text-primary"),
  incomeIconActive: withDefaultColor(IncomeIcon, "text-primary"),
  rentalInIcon: withDefaultColor(RentalInIcon, "text-primary"),
  rentalOutIcon: withDefaultColor(RentalOutIcon, "text-primary"),

  // Locks / Security
  lockIcon: withDefaultColor(LockIcon, "text-primary"),
  lockIconActive: withDefaultColor(LockIcon, "text-primary"),

  // Lists
  listIconActive: withDefaultColor(ListIcon, "text-primary"),

  // Logout / Sign up
  signUpIconActive: withDefaultColor(LogoutIcon, "text-primary"),

  // Help / Info / Question / Alert
  helpCenterIconActive: withDefaultColor(HelpCenterIcon, "text-primary"),
  questionMarkIconDisable: withDefaultColor(QuestionMarkIcon, "text-disable"),
  questionMarkIconWhite: withDefaultColor(QuestionMarkIcon, "text-white"),
  infoIcon: withDefaultColor(InfoIcon, "text-primary"),
  infoIconActive: withDefaultColor(InfoIcon, "text-primary"),
  infoIconBlack: withDefaultColor(InfoIcon, "text-black"),
  alertIconActive: withDefaultColor(AlertIcon, "text-primary"),
  dangerIcon: withDefaultColor(DangerIcon, "text-error"),

  // QR / Smart Lock
  qrIcon: withDefaultColor(QrIcon, "text-primary"),
  qrIconActive: withDefaultColor(QrIcon, "text-primary"),
  // Note: smart lock is handled via SmartLockIcon export

  // Meter feature actions
  topUpIcon: withDefaultColor(TopUpIcon, "text-primary"),
  clearIcon: withDefaultColor(ClearIcon, "text-primary"),
  usageIcon: withDefaultColor(UsageIcon, "text-primary"),
  disconnect: withDefaultColor(DisconnectIcon, "text-primary"),

  // Communication
  chatIconActive: withDefaultColor(ChatIcon, "text-primary"),
  chatIconDisable: withDefaultColor(ChatIcon, "text-disable"),
  ringIcon: withDefaultColor(RingIcon, "text-primary"),
  emailIconBlack: withDefaultColor(EmailIcon, "text-black"),
  phoneIconBlack: withDefaultColor(PhoneIcon, "text-black"),
  whatsappIcon: withDefaultColor(WhatsappIcon, "text-primary"),
  beliveWhatsappIcon: withDefaultColor(WhatsappIcon, "text-primary"),
  beliveWhatsAppIcon: withDefaultColor(WhatsappIcon, "text-primary"),

  // Add / Edit / Delete
  addIcon: withDefaultColor(AddIcon, "text-primary"),
  addIconBlack: withDefaultColor(AddIcon, "text-black"),
  editIcon: withDefaultColor(EditIcon, "text-primary"),
  editIconDisable: withDefaultColor(EditIcon, "text-disable"),
  editIconWhite: withDefaultColor(EditIcon, "text-white"),
  deleteIcon: withDefaultColor(DeleteIcon, "text-error"),

  // Navigation arrows
  leftIconBlack: withDefaultColor(ChevronLeftIcon, "text-black"),
  leftIconWhite: withDefaultColor(ChevronLeftIcon, "text-white"),
  rightIconBlack: withDefaultColor(ChevronRightIcon, "text-black"),
  rightIconWhite: withDefaultColor(ChevronRightIcon, "text-white"),
  downIconBlack: withDefaultColor(ChevronDownIcon, "text-black"),
  upIconBlack: withDefaultColor(ChevronUpIcon, "text-black"),

  // Calendar / Time
  calendarIcon: withDefaultColor(CalendarIcon, "text-primary"),
  calenderIconBlack: withDefaultColor(CalendarIcon, "text-black"),
  clockIcon: withDefaultColor(ClockIcon, "text-primary"),
  clockIconBlack: withDefaultColor(ClockIcon, "text-black"),

  // Status / Check
  closeIconBlack: withDefaultColor(CloseIcon, "text-black"),
  closeIconWhite: withDefaultColor(CloseIcon, "text-white"),
  checkIcon: withDefaultColor(CheckIcon, "text-primary"),
  checkIconAqua: withDefaultColor(CheckIcon, "text-aqua"),
  checkIconDisable: withDefaultColor(CheckIcon, "text-disable"),
  checkGreenIcon: withDefaultColor(CheckIcon, "text-available"),
  uncheckIcon: withDefaultColor(UncheckIcon, "text-disable"),
  uncheckIconWhite: withDefaultColor(UncheckIcon, "text-white"),

  // Search / Filter / Refresh
  searchIconActive: withDefaultColor(SearchIcon, "text-primary"),
  searchIconDisable: withDefaultColor(SearchIcon, "text-disable"),
  searchIconFillActive: withDefaultColor(SearchIcon, "text-primary"),
  filterIconBlack: withDefaultColor(FilterIcon, "text-black"),
  refreshIcon: withDefaultColor(RefreshIcon, "text-primary"),
  refreshIconActive: withDefaultColor(RefreshIcon, "text-primary"),

  // Download / Upload / Share / More
  downloadIconBlack: withDefaultColor(DownloadIcon, "text-black"),
  uploadIconActive: withDefaultColor(UploadIcon, "text-primary"),
  shareIconActive: withDefaultColor(ShareIcon, "text-primary"),
  shareIconDisable: withDefaultColor(ShareIcon, "text-disable"),
  moreIcon: withDefaultColor(MoreIcon, "text-primary"),

  // Image / Camera / Album
  cameraIcon: withDefaultColor(CameraIcon, "text-primary"),
  albumIcon: withDefaultColor(AlbumIcon, "text-primary"),
  imageIconDisable: withDefaultColor(ImageIcon, "text-disable"),
  playIcon: withDefaultColor(PlayIcon, "text-primary"),

  // Maintenance / Service
  maintenanceRequestIconActive: withDefaultColor(MaintenanceIcon, "text-primary"),
  maintenanceRequestIconWhite: withDefaultColor(MaintenanceIcon, "text-white"),
  plumbingIconActive: withDefaultColor(PlumbingIcon, "text-primary"),
  plumbimgIconWhite: withDefaultColor(PlumbingIcon, "text-white"),
  cleaningIconActive: withDefaultColor(CleaningIcon, "text-primary"),
  cleaningIconWhite: withDefaultColor(CleaningIcon, "text-white"),
  washingMachineIconActive: withDefaultColor(WashingMachineIcon, "text-primary"),
  washingMachineIconWhite: withDefaultColor(WashingMachineIcon, "text-white"),

  // Bank / Coins / Money
  bankIconWhite: withDefaultColor(BankIcon, "text-white"),
  coinIconDisable: withDefaultColor(CoinIcon, "text-disable"),
  paidIcon: withDefaultColor(PaidIcon, "text-available"),
  refundIcon: withDefaultColor(RefundIcon, "text-primary"),
  withdrawIcon: withDefaultColor(WithdrawIcon, "text-primary"),
  withdrawIconWhite: withDefaultColor(WithdrawIcon, "text-white"),

  // Vehicle / Parking
  carAvailableIcon: withDefaultColor(CarIcon, "text-available"),
  carDisableIcon: withDefaultColor(CarIcon, "text-disable"),
  carOccupiedIcon: withDefaultColor(CarIcon, "text-warning"),
  carParkIconActive: withDefaultColor(ParkingIcon, "text-primary"),
  carParkOccupancyIconActive: withDefaultColor(CarParkOccupancyIcon, "text-primary"),

  // Booking / Appointment
  bookingIcon: withDefaultColor(BookingIcon, "text-primary"),
  bookingIconActive: withDefaultColor(BookingIcon, "text-primary"),
  appointmentIconWhite: withDefaultColor(AppointmentIcon, "text-white"),

  // Enquiry / Feedback / Help
  enquiryIconActive: withDefaultColor(EnquiryIcon, "text-primary"),
  enquiryIconWhite: withDefaultColor(EnquiryIcon, "text-white"),
  generalEnquiryIconActive: withDefaultColor(EnquiryIcon, "text-primary"),
  generalEnquiryIconWhite: withDefaultColor(EnquiryIcon, "text-white"),
  feedbackIconActive: withDefaultColor(FeedbackIcon, "text-primary"),
  feedbackIconWhite: withDefaultColor(FeedbackIcon, "text-white"),

  // Space / Occupancy / Promotion
  spaceIconActive: withDefaultColor(SpaceIcon, "text-primary"),
  occupancyIconActive: withDefaultColor(OccupancyIcon, "text-primary"),
  promotionIconWhite: withDefaultColor(PromotionIcon, "text-white"),

  // Reno
  renoExpertIconActive: withDefaultColor(RenoExpertIcon, "text-primary"),

  // Shapes / Indicators
  circleIconActive: withDefaultColor(CircleIcon, "text-primary"),
  circleIconAqua: withDefaultColor(CircleIcon, "text-aqua"),
  ellipseGreenIcon: withDefaultColor(EllipseIcon, "text-available"),
  squareIcon: withDefaultColor(SquareIcon, "text-primary"),
  outlineStartIcon: withDefaultColor(StarOutlineIcon, "text-warning"),

  // Steps
  step2Icon: withDefaultColor(StepIcon, "text-primary"),
  step3Icon: withDefaultColor(StepIcon, "text-primary"),
  stepCompleteIcon: withDefaultColor(StepCompletedIcon, "text-primary"),
  stepCompletedIcon: withDefaultColor(StepCompletedIcon, "text-primary"),

  // Zoom
  zoomInIcon: withDefaultColor(ZoomInIcon, "text-black"),
  zoomOutIcon: withDefaultColor(ZoomOutIcon, "text-black"),

  // Recommend / Nearby
  recommendIcon: withDefaultColor(RecommendIcon, "text-primary"),
  nearbyIcon: withDefaultColor(SpaceIcon, "text-primary"),
  klccIcon: withDefaultColor(BuildingIcon, "text-primary"),
  collegeIcon: withDefaultColor(BuildingIcon, "text-primary"),
};

export default Icons;
