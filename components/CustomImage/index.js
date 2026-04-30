import Image from "next/image";

const CustomImage = ({
  className = "",
  src,
  imageStyle,
  onClick = () => {},
  props,
}) => {
  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=100%&q=${quality || 75}`;
  };

  if (typeof src === "function") {
    const IconComponent = src;
    const sizeFromStyle = imageStyle?.width ?? imageStyle?.height;
    const size = typeof sizeFromStyle === "number" ? sizeFromStyle : undefined;
    return (
      <div
        className={className}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...imageStyle,
        }}
        onClick={onClick}
      >
        <IconComponent size={size} />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        ...imageStyle,
      }}
      onClick={onClick}
    >
      <Image
        loader={imageLoader}
        alt={"image"}
        src={src}
        width={0}
        height={0}
        style={{ objectFit: "contain", width: "100%" }}
        {...props}
      />
    </div>
  );
};

export default CustomImage;
