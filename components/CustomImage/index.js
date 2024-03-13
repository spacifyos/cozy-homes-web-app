const CustomImage = ({
  className,
  src,
  width = 50,
  height = 50,
  imageStyle,
}) => {
  return (
    <img
      className={`object-contain ${className}`}
      src={src}
      width={width}
      height={height}
      style={{ ...imageStyle }}
    />
  );
};

export default CustomImage;
