import Image from "next/image";

const CustomImage = ({
  className = "",
  src,
  width = 50,
  height = 50,
  imageStyle,
  onClick = () => {},
  ...props
}) => {
  return (
    <Image
      onClick={onClick}
      unoptimized={true}
      className={`object-contain ${className}`}
      alt={"image"}
      src={src}
      width={width}
      height={height}
      style={{ ...imageStyle }}
      {...props}
    />
  );
};

export default CustomImage;
