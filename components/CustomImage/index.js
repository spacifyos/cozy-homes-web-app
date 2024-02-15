const CustomImage = ({ src, width = "100%", height = "auto", imageStyle }) => {
  return (
    <img src={src} width={width} height={height} style={{ ...imageStyle }} />
  );
};

export default CustomImage;
