const getFontSize = (size = "normal") => {
  switch (size) {
    case "xxsmall":
      return "10px";
    case "xsmall":
      return "11px";
    case "small":
      return "12px";
    case "normal":
      return "14px";
    case "large":
      return "15px";
    case "xlarge":
      return "16px";
    case "xxlarge":
      return "18px";
    case "xxxlarge":
      return "24px";
    default:
      return "14px";
  }
};

const getFontWeight = (fontWeight = "normal") => {
  switch (fontWeight) {
    case "light":
      return 300;
    case "normal":
      return 400;
    case "medium":
      return 500;
    case "semiBold":
      return 600;
    case "bold":
      return 700;
    default:
      return 400;
  }
};

const getLineClamp = (lineClamp) => {
  switch (lineClamp) {
    case 1:
      return "line-clamp-1";
    case 2:
      return "line-clamp-2";
    case 3:
      return "line-clamp-3";
    case 4:
      return "line-clamp-4";
    default:
      return 0;
  }
};

export default { getFontSize, getFontWeight, getLineClamp };

export const GLOBAL_PADDING = 10;
export const GLOBAL_SEPARATE = 15;
export const GLOBAL_BORDER_RADIUS = 15;
