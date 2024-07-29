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
    <img
      className={`object-contain ${className}`}
      alt={"image"}
      src={src}
      width={width}
      height={height}
      style={{ ...imageStyle }}
      onClick={onClick}
      {...props}
    />
  );
};

export default CustomImage;
