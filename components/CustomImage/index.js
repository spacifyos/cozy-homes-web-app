import Image from "next/image";

const CustomImage = ({
  className = "",
  src,
  imageStyle,
  onClick = () => {},
  props,
}) => {
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
      <Image
        loader={() => src}
        loading="eager"
        layout="responsive"
        alt={"image"}
        src={src}
        width={0}
        height={0}
        objectFit="cover"
        {...props}
      />
    </div>
  );
};

export default CustomImage;
